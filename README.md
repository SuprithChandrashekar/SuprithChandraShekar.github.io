# suprithchandrashekar.github.io

A 3D scroll run through my work. A cel-shaded sprinter mech, drawn like a frame of colour manga, runs a 540 m runway and the page content sits along it: card stacks for builds, HUD gates for numbers, metal dials for method, glass panels for the career route. The dust in the air gathers into the last line at the finish.

Plain static files. Three.js loaded as a native ES module through an import map. No build step.

## Run it locally

ES modules do not load from `file://`, so serve the folder:

```sh
py -m http.server 8080        # Windows
python3 -m http.server 8080   # macOS, Linux
```

Then open http://localhost:8080.

## Change the words

Every word on the site is in `js/content.js`: hero title, tagline, the six builds, the numbers, the four dials, the route and the finale line. The 3D cards, the INFO sheet and the finale letters are all drawn from that file, so one edit updates all three.

Two things to know when editing:

- `sectors[].at` is the scroll position (0 to 1) a nav button jumps to. `from` is where that sector starts lighting up in the bar.
- `method[].set` is where each dial stops, 0 to 1 between its two poles.

## Files

```
index.html              page shell, navbar, INFO dialog, import map
css/site.css            all styling
js/content.js           all copy and data
js/main.js              boot, scroll, render loop
js/mech.js              the runner: cel shader, ink outlines, eight-drawing sprint cycle
js/fx.js                focus lines and dust puffs
js/world.js             runway, dust, finale letters, the four stations
js/rig.js               camera path, keyed to scroll position
js/textures.js          canvas painters for cards, HUD plates, dial plates, glass
js/halftone.js          halftone type sampler, hero title painter
js/ui.js                navbar, start lights, INFO sheet, colour picker, telemetry
vendor/                 three.js r187, one minified ES module (MIT)
fonts/                  Archivo in three widths (SIL OFL 1.1)
projects/, assets/      the existing case-study pages, unchanged
```

## Deploy

Copy everything into the root of the `suprithchandrashekar.github.io` repo, commit and push to `main`. GitHub Pages serves it as is. `.nojekyll` tells Pages to skip the Jekyll build.

The old home page was `index.html` plus `assets/portfolio.jsx`. This replaces `index.html`. The case-study pages under `projects/` keep working and their back links (`#work`, `#arc`, `#how`, `#contact`) land on the matching sector here.

## Before the first commit

The repo's pre-commit hook runs `scripts/redact-pii.mjs`. If your private pattern file includes a generic phone-number pattern, it will flag `vendor/three.module.min.js`, because a 3D library is full of long numeric constants. Do not run `--redact` on it. That would corrupt the library. Add `'vendor/'` to `SKIP_PATHS` near the top of the script instead.

## Links and switches

- `#builds`, `#numbers`, `#method`, `#route`, `#finish` open the page at that sector.
- `?p=0.5` opens at any scroll position between 0 and 1.
- `?lite` forces the low-memory path used on phones (smaller textures, simpler glass).
- `?still` turns off easing and the start lights, which helps with screenshots.
- Double-click the BG COLOR label to go back to `#2260d9`. The chosen colour is kept in `localStorage`.

## Behaviour worth knowing

- The page needs WebGL 2. Without it, the title stays as a first screen and the INFO content is laid out below it as a normal page.
- With "reduce motion" set in the OS, the start lights are skipped, scroll is not eased and the runner only moves its legs when you scroll.
- On a pale background the interface ink flips to black. The runner keeps its own colours.
- The runner is an original design built in code from superellipsoids. It has no external model file.
- Its look is set in `js/mech.js`: flat colour with a hard light and shadow split, screentone dots in the shadow, solid ink in the deepest shadow, an outline that thickens away from the light, and a light paper grain. The palette block near the top of `createMech` holds every colour.
- The sprint is eight drawings held at twelve a second, the way cel animation is shot on twos. Scrolling harder raises the rate.
- Focus lines crowd in from the frame edges on a hard scroll and at the start. Dust kicks up at each foot strike. Both are off under "reduce motion".

## Credits

Three.js, MIT licence, in `vendor/`. Archivo by Omnibus-Type, SIL Open Font License 1.1, in `fonts/`. The expanded and condensed files are fixed-width instances cut from the variable font so canvas text renders the same in every browser.
