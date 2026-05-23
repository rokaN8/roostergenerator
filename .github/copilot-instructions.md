# Copilot Instructions

## Build, test, and lint commands

| Task | Command | Notes |
| --- | --- | --- |
| Install dependencies | `npm install` | CI uses `npm ci` on Node 20 in `.github/workflows/deploy-pages.yml`. |
| Start local dev server | `npm run dev` | Runs Vite. |
| Build production bundle | `npm run build` | Runs `tsc -b && vite build`. |
| Preview production build | `npm run preview` | Serves the built `dist` output locally. |
| Run full test suite | Not available | No test framework or `test` script is configured in `package.json`. |
| Run a single test | Not available | No test runner is configured yet. |
| Run lint | Not available | No linter or `lint` script is configured in `package.json`. |

## High-level architecture

- This is a single-page React + Vite app. `src\App.tsx` is orchestration layer: it owns current animal (`rooster`, `hen`, or `pig`), per-animal selections, theme, builder vs. stress-test mode, and `localStorage` persistence.
- `src\types\avatar.ts` defines shared animal section/color keys plus animal-specific literal-union types. All animals use same control-surface keys (`body`, `tail`, `wings`, `featherPattern`, `tattoo`, `combShape`, `head`, `eyes`, `feet`, `headwear`) so `ControlPanel` can stay shared.
- `src\data\roosterOptions.ts`, `src\data\henOptions.ts`, and `src\data\pigOptions.ts` are canonical sources for each animal's part sections, color sections, and default selections.
- `src\components\ControlPanel.tsx` renders builder UI entirely from passed-in sections and current selection; it does not define animal options itself. `App.tsx` passes one callback per shared part/color axis and switches state updates by current animal.
- `src\components\RoosterAvatar.tsx`, `src\components\HenAvatar.tsx`, and `src\components\PigAvatar.tsx` are animal-specific SVG renderers. They share animation/backdrop CSS conventions, but each file owns its own silhouette and part rendering logic.
- `src\components\RoosterStressTest.tsx` now renders a mixed flock of roosters, hens, and pigs. It randomizes animal kind plus per-animal selection, clamps flock size to 1-100, and shows FPS.
- `src\utils\randomSelection.ts` keeps random generation keyed by section ID and exposes separate random builders for rooster, hen, and pig, all driven by option data instead of hard-coded lists.
- GitHub Pages deployment is already wired. `.github\workflows\deploy-pages.yml` installs dependencies with `npm ci`, runs `npm run build`, and deploys `dist` on pushes to `main` or `master`.

## Key conventions

- Treat animal configuration as cross-file contract. Adding or renaming a part/color for rooster, hen, or pig usually requires coordinated changes in `src\types\avatar.ts`, animal option file in `src\data\`, `src\App.tsx`, `src\components\ControlPanel.tsx`, and `src\utils\randomSelection.ts`.
- Preserve `localStorage` safety checks in `App.tsx`. Stored selections are validated against current option IDs/values before use, and renamed options should be migrated explicitly (for example, rooster `migrateRoosterHeadwearValue`) rather than accepted blindly.
- Keep all animals on shared section IDs. Builder switching depends on rooster, hen, and pig using same control axes even though variant IDs and labels differ by animal.
- Pig reuses shared ids semantically: `wings` means ears, `featherPattern` means body markings, `combShape` means snout, and `beak` colour means snout-and-hooves colour. Keep ids stable even when displayed labels differ.
- Keep random selection keyed by section ID. `randomSelection.ts` uses `.find((s) => s.id === sectionId)` lookups so array reordering in option files does not break randomization.
- All avatar renderers depend on fixed layering: tail -> feet -> body -> feather pattern/markings -> tattoo -> wing/ear layer -> head -> headwear. Tail stays behind body by design.
- Keep SVG outlines consistent. Parts use shared dark outline color (`#4f3922`) and explicit stroke widths; removing those strokes makes shapes blend together visually.
- Avatars are rendered in profile, not front-on. Eye accessories should stay single-lens/single-temple-arm designs for visible side of face.
