# BUILD REPORT: Sea Time × scroll-craft

Skill `scroll-craft` v0.3.1 (`/tmp/t-v5/skills/scroll-craft`). Engine copied **unmodified**.
Local only: `serve.mjs --root . --port 4523` on 127.0.0.1 (no `--lan`). Nothing deployed,
pushed or submitted. No form on the live site was touched. No paid APIs, no generation.
Brief: `BRIEF.md` (self-authored under explicit creative delegation; not interviewed).

## Content and assets (real only)
- Copy, prices, course facts, phone, email and address all come from the live site, crawled
  2026-10-22 (`crawl/`). The comparison ledger is the live table, nearly verbatim.
- Photos: Sea Time's own uploads (`src-dl/` originals, `assets/` web copies). Logo: their
  `logo.svg`. Excluded: `ChatGPT-Image-Feb-16-2026…` (AI-generated per its file name).
- Chart coastline: Natural Earth 1:50m land (public domain), projected and inlined.
- Fonts: Rubik (display) and Assistant (text), self-hosted woff2 (Hebrew + Latin subsets).
- **Not verified / not used:** a WhatsApp number (the live site has none, only a phone button);
  the 90% pass rate (self-reported, so no counter); the location of the "Greece" photos
  (`20250706_132411`, `IMG-20251016-WA0070`): they read as Greek islands but the site never
  says where they were taken, so their alt text names no place. Age for משיט 30 is "18" in the
  table but "17.5" in the FAQ; the table value is used.

## Grammar: Gallery / catalog (§2.6)
The live home page already asks the visitor's real question, *"which track fits me"*, and
answers with a comparison table. That makes it a range, so the courses become objects in a
collection, each carrying the **same label schema** (Sea Time's own table fields: הסמכה, איפה
מפליגים, משך, תנאי קבלה). Why the other seven lost: filmic needs footage and has no index;
chaptered editorial suits a story, not a choice; live surface has no product; continuous world
needs generated flights; typographic poster wastes their good photography; split stage has two
sides and this has three; rhythmic cutlist is the wrong energy for a licence purchase.
Bans honoured: no kinetic headlines, no spotlight, no magnet, no scrub.

**Nav:** the index is the chart card (desktop: bottom-left corner card; phone: bottom dock),
4 entries that jump to each object at the moment its label is open. Logo sits in a paper
"cartouche" (chart title block) so it reads on sky, sea and paper.

## Signature move: the range chart
A small real sea chart of the Eastern Mediterranean that **lights exactly the waters each
licence allows** as you walk past each course: a thin Tel Aviv strip for 7m ("בישראל בלבד"),
a 12-nautical-mile band along every coast for משיט 30 (drawn at true scale: stroke = 22 km),
and every coast **except Israel's** for the IYT/ICC Greece course, with Israel's coast struck
through. The viewBox eases between states (zooms out as the licence grows). The course you
linger on (1.2 s) is pre-selected in the closing plate and written into the email subject.
The 7m band width is illustrative (the site gives no distance); noted in the markup.

Tell-someone: *it's the site where a little sea chart shows you which waters each licence lets
you sail, and redraws as you scroll past each course.*

## Journey, feeling curve, score
| # | Act | Feeling | Device | Span |
|---|---|---|---|---|
| 1 | 7 מטר (hero, object one) | Invitation | pin + layered planes (photo push-in, title sliding behind the mainsail, near-water plane rising) | 2.0 |
| 2 | משיט 30 | Commitment | pan, page-local RTL driver, 5 real course steps + price | 2.7 |
| 3 | The ledger | Clarity (authored quiet) | flow + in | flow |
| 4 | Greece (**PEAK**) | Awe | pin + iris reveal, photo settles from 1.2× | **3.4** |
| 5 | המועדון | Belonging | flow + in + tilt + count (130 Google reviews) | flow |
| 6 | תיאום הפלגת ניסיון | Resolve | pin, hold cues, plate + footer in stage | 1.3 |

Families: pin, pan, flow/in, reveal, parallax planes, tilt, count. Never the same twice in a
row. 6 acts, 12.0 vh desktop (outside the banned 13.6–13.8 band). Peak has the largest span
and the quiet ledger in front of it.

**Hero depth (honest limit):** the boat was cut out with macOS Vision (subject lift via JXA,
because the local Swift toolchain is broken) but the cutout loses the rigging wires and there
is no clean plate behind the hull. Rather than invent background, the boat stays registered
to its own photo. Depth comes from occlusion and differential motion around it: the title sits
between plate and boat and slides behind the mainsail, the near-water plane rises over the
waterline at its own rate, the scene pushes in. It meets "type between planes", not "subject
moving independently of background". On the phone the title sits in an extended sky above the
photo band instead (art-directed, not shrunk).

## Fingerprint gate
Registry: `../scroll-craft-test/.scrollcraft/FINGERPRINTS.md` (pointed to by `.scrollcraft.json`).
Against the only row (undark-split) it differs on **6/6**: grammar (gallery vs split stage),
nav (chart index vs divider), hero (layered photo vs brand fields), sequence, close (title-block
plate vs collapse), signature. Row appended.

## Verifier (`shoot.mjs`), findings and fixes
| Run | Finding | Fix |
|---|---|---|
| probe 1 (eye) | Hero title under the logo cartouche; title barely moved (the push-in scale cancelled its travel) | Lowered title, travel -175% of its width, cue held to 0.8: it now passes behind the mainsail |
| probe 1 (eye) | Greece display title wrapped to 5 lines over the label | Width-bound, smaller |
| probe 1 (eye) | Text-only rail cards read as empty navy boxes | Big step numeral at top |
| phone probe (eye) | Ledger rows broke apart: `IYT + ICC` and `4-6` became separate grid cells | Cells no longer grid; label column is an absolutely placed `::before` |
| run 1 desktop | THIN 4.34:1 on "ספינת הדגל של Sea Time" (large display, passes 3:1) | Accepted for display type |
| run 1 reduced | **FAIL 1.15:1** "ואז, שבוע אחד ביוון." (no iris under reduced motion, so the photo sat under the line) | Photo + scrim wrapped in a cue that opens after the line leaves |
| run 1 (eye) | Navy sky scrim visible on blank paper before the photo opened | Scrim moved inside the fading photo layer |
| run 1 phone (eye) | Phone hero title touching the cartouche | Lowered |
| run 1 all | No dead scroll on desktop, 390×844, 360×640, reduced; no console errors or failed requests; horizontal overflow 0; rail overflow 1598 px desktop / 1868 px phone | — |

Final results: see `lab/final/*` and the section "Final run" appended below.

## RTL: engine assumptions and workarounds
1. **`pan` translates negative X** (`-(over)*p`), which in RTL moves the rail the wrong way.
   Replaced with a page-local driver on `#rail` (positive X from the act's `--sc-p`), and
   `data-sc-verify-state` so the harness still sees rail motion. Under reduced motion the
   engine's scroll-region fallback works natively in RTL.
2. **`.sc-copy--lead/--trail` use physical `left`/`right`** and the phone rule forces
   `text-align: left`. Not used; all positioning is logical (`inset-inline-*`).
3. **Reveal directions `left`/`right` are physical** (`inset()`); only `iris` is used.
4. **Kinetic line splitting** not used (banned by the grammar anyway), so its LTR word
   measurement was never exercised.
5. **Engine focus handling** scrolls pinned controls to the act start (cue dark). Page-local
   `data-park` handlers park the act where the label is open; the rail handler scrolls the act
   until a focused card is in view (RTL offset maths).
6. Bidi: phone number, email, price range, `4-6`, `IYT + ICC`, year use `.ltr` isolates;
   Hebrew quotes use ״ and ׳; the English Google review is `lang="en" dir="ltr"`. No
   punctuation flips seen on the sheets after the ledger fix.
7. `shoot.mjs` worked unmodified on an RTL page (scroll sampling is vertical).

## Feel check (written cold, before re-reading the curve)
Hero: *pulled in*. Rail: *walking through steps*. Ledger: *reading, calm*. Greece: *opening up*.
Club: *warm*. Close: *settled*. Diff: matches 1, 3, 4, 5, 6. Act 2 reads as *orderly* more than
*commitment*: the price card at the end of the rail carries the weight, and that is fine but
softer than intended. The peak is the largest visual change on the sheet and holds the most
scroll. The end resolves on the plate with content (not a fade).

## Not verified
- No real phone (iOS Safari, touch, Low Power Mode). There are no video clips, which removes
  the skill's main phone risk.
- The chart's legal reading is a simplification of the site's own table ("עד 12 מייל מהחוף"
  for משיט 30, "בכל העולם חוץ מישראל" for IYT/ICC). The owner should confirm the drawing.
- Image weights are not optimised (no WebP encoder in this ffmpeg; boat cutout is a 1.3 MB PNG).

## Final run (`lab/final/`, after all fixes above)
| Viewport | Length | Dead scroll | Contrast |
|---|---|---|---|
| 1440×900 | 12.0 vh | none | THIN 4.34:1 on the 4.4rem Greece display line (passes 3:1 large-text) |
| 390×844 | 13.8 vh | none | all cues ≥ 4.5:1 |
| 360×640 | 15.3 vh | none | THIN 4.18:1, same display line |
| reduced motion | 12.0 vh | none | THIN 4.4:1, same display line |

Console errors 0, failed requests 0, horizontal overflow 0. Two post-run fixes, checked by
targeted frames rather than a full rerun: the reduced-motion chart now jumps to each state's
zoom (`screenshots/peak-reduced-motion.png`), and the Greece sky scrim moved inside the iris
clip so it no longer tints the paper (`screenshots/peak-iris-opening.png`).

## Update 2 (Yotam, 11:56): Sea Time's own video
Downloaded from their YouTube channel (local mock only, `src-video/`, not shipped):
`y5JGoZng7QE` "בית הספר לשייט ויאכטות - Sea Time" (1080p60, 47s) and `aTpAWUfQSUI`
"הפלגה ברוחות השונות" (1080p25, 195s). Almost every shot in both carries burned-in Hebrew
subtitles, diagram overlays or the logo, so only two windows are clean:

| Segment | Source + timecode | Used | Notes |
|---|---|---|---|
| `assets/video/marina.mp4` (desktop, 1920×700→1080p strip, gop 8, crf 20, 8.5 MB) | y5JGoZng7QE 0:00.0–0:04.3 | Act 6 close, `scrub`, span 2.0, dwell 0.3 | Drone pushing in on Tel Aviv marina. Cropped to the top 700 px to drop the Sea Time logo that fades in bottom-left at ~0:01 |
| `assets/video/marina-m.mp4` (phone, 608×1080 portrait crop at x=1100, 720p, gop 4, crf 24, 1.4 MB) | same | same act, phone | Portrait crop on the breakwater tip, clear of the logo |
| not used | aTpAWUfQSUI 0:05.0–0:08.6 | — | Drone pull-back over a sailboat off the skyline, but grey/flat and only 3.6 s before overlays start. Not better than the layered hero photo |

Encoded with the skill's `scripts/encode.sh` (audio stripped, dense GOP). Posters are frame 0.
The close is now `scrub` (Gallery allows one scrub). The peak (3.4 vh) is still the largest act.
No Greece footage exists without subtitles, so the peak stays on the photo.
The owner should supply raw originals (no subtitles or logo) for production. The hero and peak
would both gain from clean drone footage.

The verifier wasn't rerun in full after this change. Targeted frames (desktop 1440×900 and
phone 390×844 at close p=0/0.5/1) show no console errors and no failed requests. The plate and
footer sit on opaque paper, so contrast is unchanged.

## Generated assets
None. One request was made (openai/gpt-image-2, edit of `src-dl/32-img.jpg`): "Edit this photograph
into a clean background plate. Remove the sailboat entirely... continue the coastline and skyline
where the sails covered it... no new boats, no people, no text, no logos." It failed with HTTP 429
`insufficient_quota` (the OpenAI API account has no credits). Image generation goes through the
paid API, not the ChatGPT subscription. Not retried, and no other provider used. `assets/generated/`
is empty, and every image on the page is Sea Time's own photo or video.

## Round 2 (2026-10-22, 13:00): hero rebuild
Yotam's verdict on the live phone view: *"the hero is not good, the image is not impressive"*. The
headline was cut off and collided with the CTA pill and logo, there was a grey haze band over the top
third, the photo was soft and the cutout had lost the rigging. Round 1 is kept untouched as
`index-r1.html` (its assets are still in `assets/` for that file; `index.html` no longer loads them).

**New hero:** a full-bleed, muted, looping clip of their own boat heeling off the Tel Aviv skyline,
graded deep blue. Planes, back to front: film (slow push-in on scroll), shade (top tint plus a corner
scrim behind the copy), type, and a soft haze plane in front that rises as the copy leaves. The copy
is one headline (`h1` שער הכניסה לעולם השייט), one subline and one CTA (תיאום הפלגת ניסיון,
`#trial`). The bar's duplicate CTA pill hides while the hero CTA is on screen.
- **Phone:** the film fills the top of the stage and fades into navy. The copy sits in its own clear
  band under the hull and above the chart dock, with nothing over the title. Measured: logo cartouche
  ends at y=64, h1 starts at y=539 (390×844) and y=362 (360×640). Horizontal overflow 0.
- **Desktop:** across the loop the boat moves through the centre-right of the frame, so the copy sits
  bottom-left over open water. The chart card hides during the opening (it holds the 7 מטר state
  anyway) and returns with the 7 מטר label at p≈0.36. The second beat (7 מטר label) is unchanged
  apart from a darkening plane that fades in under it.
- Reduced motion: the clip is never fetched. The graded poster (frame 0 of the loop) holds and the
  copy still cues.
- Why autoplay rather than scrub: the first screen has to move on load ("wow" before any scroll),
  and the gallery grammar's one scrub stays on the close. Scroll still drives the push-in and the
  planes.

### Round 2 assets
| File | Source | Treatment |
|---|---|---|
| `assets/video/hero.mp4` (1920×800, 5.8 s loop, 3.7 MB) | Sea Time YouTube `y5JGoZng7QE` (channel @seatime2011), **0:24.70–0:28.50**: a drone orbit of a sailboat heeling off the Tel Aviv skyline. Shot cut detected at 0:28.57 | Cropped to rows 0–800 to remove the burned-in Hebrew subtitles (they start at y≈820). Graded with `eq contrast 1.12 / sat 1.22 / gamma 0.96`, `colorbalance` with teal shadows and warm highlights, light unsharp. Slowed to 0.6× (60 fps source → 30 fps), 0.5 s crossfade loop seam, muted. Encoded with encode.sh's flags (libx264 high, slow, faststart) but GOP 60 / CRF 23 instead of the scrub GOP 8, because it plays rather than scrubs. Native 800p, no upscale |
| `assets/video/hero-m.mp4` (504×720 portrait, 1.1 MB) | same timecode | Portrait crop x 980–1540 (boat centred), same grade, same loop, GOP 60 / CRF 24 |
| `assets/video/hero-poster.webp` / `.jpg`, `hero-m-poster.webp` | frame 0 of each loop (source ≈ 0:25.5) | WebP q80 (148 KB / 46 KB), JPEG fallback |
| `assets/p16.webp` | their photo (rail step 5, the washed-out dock line) | Graded (contrast 1.2, saturation 1.3, brightness −0.05) |
| all other page photos (`p13 p17 p14 p43 p08 peak-wide peak-tall`, marina posters) | unchanged content | Re-encoded JPEG → WebP q80 with `cwebp` |
| `aTpAWUfQSUI` | reviewed in full (2 s contact sheet) | Not used: grey top-down drone with wind diagrams and the logo burned in on almost every frame |

The 1.3 MB `hero-boat.png` cutout, `hero-plate.jpg` and `hero-near.jpg` are no longer loaded by
`index.html`.

**AI layers: none on the page.** One request was made: `openai/gpt-image-2`, 2048×1152, transparent
PNG. Prompt: "A transparent-background atmospheric foreground layer for compositing over sailing
footage: soft, fine sea spray and thin sunlit marine haze drifting across the lower third of the
frame, a few delicate wind-blown droplets catching warm golden-hour light, very subtle and airy,
mostly empty transparent space in the upper two thirds. No boats, no water surface, no land, no
people, no text, no logos. Photographic, realistic, soft focus, white-to-warm-cream tones only."
It failed with HTTP 429 `insufficient_quota` / `credit_balance_exhausted`: the OpenAI API account has
no credits (same as round 1). Not retried (1 of 8 allowed
generations used). `assets/generated/` is empty. The front haze plane is CSS (two soft radial
gradients, blurred). No sky replacement was needed: the chosen shot has a clear blue sky and only a
thin band of it.

### Round 2 verifier (`shoot.mjs`, final files)
| Viewport | Length | Dead scroll | Contrast | Errors / failed |
|---|---|---|---|---|
| 1440×900 | 12.7 vh | none | THIN 4.34:1 Greece display line (round 1, large type) | 0 / 0 |
| 390×844 | 14.5 vh | none | all cues ≥ 4.5:1 | 0 / 0 |
| 360×640 | 16.0 vh | none | THIN 4.18:1, same Greece line | 0 / 0 |
| reduced motion | 12.7 vh | none | THIN 4.41:1, same Greece line | 0 / 0 |

Findings fixed during the round: (1) the desktop chart card covered the copy, so the copy moved and
the chart now hides during the opening. (2) A 1.2:1 hero contrast FAIL, because the right-placed copy
sat over the white sail in the loop's first frames (worst visible on the reduced-motion poster); the
copy moved to the clear left side. (3) The poster rendered at its natural 800 px height because a
selector missed `.film__inner`, leaving a navy band. (4) A 0.9 s loop crossfade showed two boats, so
it is now 0.5 s. (5) A Latin-first subline caused a bidi glitch, so "Sea Time" was dropped from it
(the logo carries it). The last desktop change (narrower copy block) came after the final desktop
verifier run and was checked by a targeted shot only. It only shrinks the box.
Sheets: `screenshots/r2-sheet-{desk,390,360,red}.png`.

### Not verified (round 2)
- No real phone. iOS autoplay of a muted inline loop normally works, but Low Power Mode blocks it,
  and then the graded poster stays up (the page retries `play()` on touch/scroll).
- A 0.5 s dissolve at the loop seam can still show a faint double boat for a moment.
- The desktop video is 800 px tall, shown at 900 px (1.125×), so it is slightly soft on large screens.
  A raw original without subtitles would fix this and give a taller frame.
