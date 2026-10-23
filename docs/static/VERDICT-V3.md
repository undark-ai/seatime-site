# VERDICT V3: every live sea-time.co.il page, designed into the home page

Backups of v2: `index-v2.html`, `css-v2/`, `js-v2/`. `data/` used to be a symlink into `sea-time-redesign/`. It is now a real folder, so nothing is written there; the page never read the old `data/` files.

## Inventory (`data/site-pages.json`)
**43 entries: 37 page links, 3 legal pages, 3 social links. All 43 return HTTP 200** (curl, redirects followed, 2026-10-22). Sources:
- Yoast `sitemap_index.xml` → the page, post, category, lessons, lessons_tax, our_team, testimonials, bwg_gallery and elementor-hf sitemaps (37 + 23 + 6 + 11 + 4 + 6 + 2 + 15 + 1 URLs)
- Header menu, mobile menu and footer (server-rendered, so a plain fetch was enough and no browser was needed)
- Hub pages: /sailing-courses/, /abrod_homepage/, /annual_program/, /israel-cruise/, /yacht-club/, /our-yachts/, /sailing-blog/

Each entry has `title, url, group, groupId, subgroup, inMenu (header|footer|none), alsoInFooter, note`. Titles are their menu labels where the page appears in a menu; otherwise the page's own title or H1. URLs are canonical, so redirect aliases are replaced by their targets: /sailing-30-course/ → /sailing-courses/skipper-sailing-30/, /iyt_sailing_course/ → /sailing-courses/iyt-sailing/, /aboutus/ → /our-story/, and so on.

**Groups.** Their header is flat: קורס סקיפרים · ללמוד להפליג · מועדון שייט · השכרת יאכטות · הפלגות בעולם · הסיפור של Sea Time · צרו קשר. The mobile menu adds תחזית מזג אוויר, להכיר את Sea Time and הזמנה והרשמה להפלגות. I used those labels as the groups and took each group's children from the hub page that menu item opens:
1. **ללמוד להפליג** (8): משיט 30, יוון, IYT, 7 מטר, GMDSS and כל הקורסים, plus the two exam simulators (their footer lists them)
2. **מועדון שייט** (5): מועדון שייט, היאכטות של סי טיים, יאכטות 7 מטר, תחזית מזג אוויר, and הזמנה והרשמה להפלגות (their Salesforce portal)
3. **השכרת יאכטות** (10): השכרת יאכטות בתל אביב, the 4 rental yachts (טוויקס, קיט קט, אננדה, רוזי ומריאן), and the events and gifts pages (הפלגה רומנטית, הפלגת כיף לקבוצות, ימי גיבוש, יום הולדת על יאכטה, גיפט קארד)
4. **הפלגות בעולם** (10): the 2027 programme and its three dated trips (קטמרן 1.5.27, לפקדה 21.8.27, מתקדם 9.10.27), plus הפלגות בעולם, קפריסין, השטה עצמית, חופשה על יאכטה, סוגי היאכטות and findayacht.sea-time.co.il
5. **להכיר את Sea Time** (4): הסיפור של Sea Time, בלוג, צרו קשר, דף הבית
Plus the legal pages (תקנון האתר, הצהרת נגישות, תקנון חבילות חו"ל) and the social links (Facebook, YouTube, Instagram) from their footer.

**Broken (not linked):**
- `/yacht_kalimera/` returns 404. Their /yacht-club/ page links to it.
- All 10 `/lessons/*` training-material pages fail: 5 return HTTP 500, 4 redirect to `seatime.schoolyland.co.il` and get 403, and `/lessons/intro/` redirects to wp-login.
- `/llms.txt/` returns 404 (a stray link in their HTML).

**Skipped on purpose:**
- Redirect aliases (≈15 URLs)
- `/en/*` and `/category/*` archives (they redirect to the home page or the courses page)
- `lessons_tax`, `our_team`, `testimonials`, `bwg_gallery` and `elementor-hf` items (utility and template content)
- `/i-frame/` and `/iframe_page/` (embed utility pages)
- Expired trips: `/flotilla1/` (Rhodes, 5/2026), `/flotilla1-3/` (Seychelles, 4–5/2026) and `/advanced-skipper-course-2/` (5/2025). They still return 200, but their own /annual_program/ no longer links to them.
- 16 blog articles. They are reachable through "בלוג", per the brief. Two exceptions are linked because they are event offerings, not articles: יום הולדת על יאכטה and ימי גיבוש.
- No privacy-policy page exists: /privacy-policy/ and /מדיניות-פרטיות/ return 404, and the site has no privacy link.

## Where the links appear
- **Header:** 5 group dropdowns plus a צרו קשר link. On desktop (≥1121px) each is a white card under the transparent-over-video header, with sub-group columns, the 2027 dates as small notes, and hover, click and keyboard support (Enter opens, Esc closes and returns focus, `aria-expanded`, closes on blur or outside click). Below 1121px it becomes a full-screen navy RTL menu: accordion groups list every page, page scroll is locked, and a call button and the booking portal sit at the bottom. The hamburger turns into ✕. The transparent header and the call button are unchanged.
- **In context:**
  - Each course card has "לכל הפרטים על הקורס" linking to its real page, followed by "קורסים נוספים" chips (IYT, GMDSS, קטמרן, מתקדם, כל הקורסים).
  - Process section: course-page link, and the משיט 30 exam simulator inside step 2.
  - Greece panel: "לכל הפרטים על הקורס ביוון" plus 5 abroad chips.
  - Club section: the three feature rows link to the club, the booking portal and the yachts pages; "הסיפור המלא" links to /our-story/; 7 rental and event chips.
  - FAQ: a "חומרי תרגול" box with both simulators, weather and the blog. These replace the training-materials pages, which are broken.
  - Contact section: a link to /contactus/.
- **New "כל מה שיש ב-Sea Time" section** (before contact): 5 cards, each with one of their real photos, the group title, a page count, a short line, sub-group headings and the link list. Desktop is a 3-column grid; הפלגות בעולם spans two columns, and the about card is navy with a call button. Phones show tap-to-expand accordion rows with a photo thumbnail.
- **Mega-footer:** brand and contact details, social links, all 5 groups in full, and a legal row.
- Every link is an absolute live URL and opens in the same tab. The only non-page hrefs are `#main`, `#top`, `#courses`, `tel:`, `mailto:` and the Google Maps address link.

## Verified
Playwright + Chrome at 390×844, 360×640 and 1440×900:
- Horizontal overflow is 0 at load, with the menu or dropdown open, and at the end of the page.
- No console errors and no failed requests.
- Desktop: keyboard Enter opens a dropdown and Esc closes it, and all 5 dropdowns stay inside the viewport.
- Phones: the menu sits at top=64 and fills the screen, with 5 groups and 40 links; Esc closes it.
- The links section has 5 cards and 38 links.
- 169 hrefs on the page: **0 not in site-pages.json, and 0 site-pages.json entries left unlinked**. All 43 unique URLs return 200.

The live tailnet URL serves the new version. The markup is generated: `python3 -I tools/build-links.py` rebuilds the nav, the links section and the footer from `tools/pages_src.py`. The check script is `tools/shoot-v3.mjs`, and its report is `screenshots/v3-report.json`.

## Open
- The booking portal URL lands on a page titled "Welcome to LWC Communities" (200). It is their own link, but the landing title is generic.
- Their /yacht-club/ links to a dead קלימרה page (404), and their /lessons/ training area is down. Worth telling Sea Time.
