// Sea Time static page: navigation (dropdowns + phone menu), all-pages accordion, header state, hero video control + fade-out, Greece video, entry reveals.
// The only scroll reader is one rAF-throttled handler for the header state and the hero fade. No pinning, no scrubbing.
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Navigation: desktop dropdowns (click, keyboard, hover) and a full-screen phone/tablet menu whose groups are accordions.
  // The same trigger buttons drive both; aria-expanded is the single source of state.
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  const desk = window.matchMedia('(min-width: 1121px)');
  const hover = window.matchMedia('(hover: hover)');
  if (btn && nav) {
    const items = [...nav.querySelectorAll('.nav-item')].filter((li) => li.querySelector('.nav-trigger'));
    const setItem = (li, open) => {
      li.classList.toggle('open', open);
      li.querySelector('.nav-trigger').setAttribute('aria-expanded', String(open));
    };
    const closeItems = (except) => items.forEach((li) => { if (li !== except) setItem(li, false); });
    const closeMenu = () => {
      nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('menu-open');
    };
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('menu-open', open);
      if (!open) closeItems();
    });
    items.forEach((li) => {
      const trigger = li.querySelector('.nav-trigger');
      trigger.addEventListener('click', () => {
        if (desk.matches && hover.matches && Date.now() - (li._hoverAt || 0) < 400) return; // hover just opened it
        const open = !li.classList.contains('open');
        closeItems(li); setItem(li, open);
      });
      let t;
      li.addEventListener('mouseenter', () => { if (desk.matches && hover.matches) { clearTimeout(t); if (!li.classList.contains('open')) li._hoverAt = Date.now(); closeItems(li); setItem(li, true); } });
      li.addEventListener('mouseleave', () => { if (desk.matches && hover.matches) t = setTimeout(() => setItem(li, false), 180); });
      li.addEventListener('focusout', (e) => { if (desk.matches && !li.contains(e.relatedTarget)) setItem(li, false); });
    });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) { closeItems(); closeMenu(); } });
    document.addEventListener('click', (e) => { if (desk.matches && !nav.contains(e.target)) closeItems(); });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const openItem = items.find((li) => li.classList.contains('open'));
      if (openItem && (desk.matches || openItem.contains(document.activeElement))) {
        setItem(openItem, false); openItem.querySelector('.nav-trigger').focus();
      } else if (nav.classList.contains('open')) { closeMenu(); btn.focus(); }
    });
    desk.addEventListener('change', () => { closeItems(); closeMenu(); });
  }

  // "כל מה שיש ב-Sea Time": accordion cards on phones, every list open on wider screens
  const hubNarrow = window.matchMedia('(max-width: 899px)');
  const hubCards = [...document.querySelectorAll('.hub-card')];
  const setHub = () => hubCards.forEach((card) => {
    const tg = card.querySelector('.hub-toggle');
    if (hubNarrow.matches) { tg.removeAttribute('tabindex'); tg.setAttribute('aria-expanded', String(card.classList.contains('open'))); }
    else { tg.setAttribute('tabindex', '-1'); tg.setAttribute('aria-expanded', 'true'); }
  });
  hubCards.forEach((card) => card.querySelector('.hub-toggle').addEventListener('click', (e) => {
    if (!hubNarrow.matches) return;
    const open = card.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', String(open));
  }));
  setHub();
  hubNarrow.addEventListener('change', setHub);

  // Hero video: poster stays when motion is reduced or playback fails; pause toggle for WCAG 2.2.2
  const hero = document.querySelector('.hero');
  const video = document.querySelector('.hero-video');
  const toggle = document.querySelector('.video-toggle');
  if (video && hero) {
    const setPaused = (paused) => {
      if (!toggle) return;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.querySelector('.sr-only').textContent = paused ? 'הפעלת הסרטון' : 'השהיית הסרטון';
    };
    const stop = () => { video.pause(); video.removeAttribute('autoplay'); setPaused(true); };
    if (reduce.matches) {
      stop();
      video.style.visibility = 'hidden';
    } else {
      const p = video.play();
      if (p && p.catch) p.catch(() => setPaused(true));
    }
    video.addEventListener('error', () => hero.classList.add('no-video'), true);
    toggle && toggle.addEventListener('click', () => {
      if (video.paused) { video.style.visibility = ''; video.play().catch(() => {}); setPaused(false); }
      else { video.pause(); setPaused(true); }
    });
    // Save battery: pause while the hero is off screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        if (toggle && toggle.getAttribute('aria-pressed') === 'true') return;
        if (entry.isIntersecting) video.play().catch(() => {}); else video.pause();
      }).observe(hero);
    }
  }

  // Header is transparent over the hero; solid once the page scrolls. Hero video fades as the hero leaves.
  const header = document.querySelector('.site-header');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = window.scrollY;
    if (header) header.classList.toggle('is-top', y < 24);
    if (video && hero && !reduce.matches) {
      const h = hero.offsetHeight || 1;
      const t = Math.min(Math.max((y - h * 0.25) / (h * 0.6), 0), 1);
      video.style.opacity = String(1 - t * 0.7);
    }
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // Greece: desktop gets their own Aegean footage, loaded only when the section is near; phones keep the photo
  const gv = document.querySelector('.greece-video');
  const wide = window.matchMedia('(min-width: 761px)');
  if (gv && 'IntersectionObserver' in window) {
    let loaded = false;
    new IntersectionObserver(([entry]) => {
      if (!wide.matches || reduce.matches) return;
      if (entry.isIntersecting) {
        if (!loaded) {
          loaded = true;
          [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(([k, type]) => {
            const src = document.createElement('source'); src.src = gv.dataset[k]; src.type = type; gv.appendChild(src);
          });
          gv.addEventListener('playing', () => gv.classList.add('playing'), { once: true });
          gv.load();
        }
        gv.play().catch(() => {});
      } else if (loaded) gv.pause();
    }, { rootMargin: '200px 0px' }).observe(gv.closest('.greece'));
  }

  // Entry reveals: one-shot class toggle when an element first enters the viewport
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduce.matches) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el) => io.observe(el));
})();
