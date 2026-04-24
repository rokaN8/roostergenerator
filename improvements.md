# Rooster Generator — Improvements & Ideas

A brain-dump of improvements across code quality, features, UX, and product direction. Nothing here is prescriptive — treat it as a prioritised backlog to draw from.

---

## Code Quality / Developer Experience

### Simplify selection updates
`App.tsx` has ten nearly-identical updater functions (`updateBody`, `updateTail`, etc.) and `ControlPanel` receives fifteen individual `onChange` props. A single generic updater and a unified callback would eliminate the boilerplate:

```ts
// App.tsx
const updatePart = <K extends RoosterPartKey>(key: K, value: RoosterSelection[K]) =>
  setSelection(current => ({ ...current, [key]: value }));

const updateColor = <K extends RoosterColorKey>(key: K, value: string) =>
  setSelection(current => ({ ...current, colors: { ...current.colors, [key]: value } }));
```

`ControlPanel` could then receive `onPartChange(key, value)` and `onColorChange(key, value)` instead of ten separate callbacks.

### Replace index-based option access with named lookups
`RoosterStressTest.tsx` accesses `roosterPartSections[0]`, `roosterPartSections[1]`, etc. If the order of sections ever changes, this silently breaks. Index into a keyed map instead, or export individual section constants from `roosterOptions.ts`.

### Add a linter and formatter
No ESLint or Prettier config exists. Adding them (even minimal `@typescript-eslint` + `eslint-plugin-react-hooks`) will catch bugs at edit time rather than review time.

Suggested baseline:
```
npm install -D eslint @typescript-eslint/eslint-plugin eslint-plugin-react-hooks prettier
```

### Add a test layer
No tests exist. Even a small Vitest suite covering `loadStoredSelection` (migration logic, malformed JSON, unknown option values) and the `migrateHeadwearValue` helper would give a meaningful safety net before expanding the model further.

### Formalise the migration system
`migrateHeadwearValue` is a one-off function that handles a single renamed option. As more renames happen, this pattern gets messy. A versioned migration table (stored value version → transform function) would scale better.

---

## Feature Ideas

### Share a rooster via URL
Encode the current selection as query params or a base64 blob in the URL. Anyone opening the link gets the exact same rooster without needing an account or server. Pairs well with a "Copy link" button.

```
https://example.github.io/roostergenerator/?body=plump&tail=sickle&...
```

### Export rooster as an image
Add a "Download PNG" button that uses the Canvas API (or a library like `dom-to-image`) to rasterise the SVG preview. Useful for sharing on social or embedding in documents.

### Randomise button in builder mode
A single "Surprise me!" button that generates a random selection — same logic already exists in `createRandomSelection` inside `RoosterStressTest`. Extract it to a shared util and wire it into the builder.

### Saved presets / rooster collection
Let users save multiple named roosters to `localStorage` and switch between them. A simple list of saved configs with a name input covers the basic case without a backend.

### Custom colour picker
The current colour sections offer eight curated swatches per part. Adding an `<input type="color">` escape hatch alongside the swatches lets users go fully custom without needing to manage an infinite palette.

### Name your rooster
A small text field that persists the rooster's name in `localStorage` alongside the selection. Displayed under the preview. Low effort, adds personality.

### Wattle colour as a separate section
Currently wattle shares the comb colour. Separating beak/feet from wattle, and comb from wattle, would give finer colour control — three new colour axes without adding a single new part variant.

### More part variants
Obvious expansion vectors for each part:
- **Body**: bantam, silkie, ornamental
- **Tail**: majestic, stubby, peacock
- **Comb**: walnut, V-shaped, cushion
- **Eyes**: monocle, heart eyes, star eyes
- **Headwear**: crown, top hat, party hat, cowboy hat
- **Tattoo**: star, flame, anchor, flower

### Rooster comparison view
Side-by-side panel showing two saved or random roosters. Handy for demo presentations comparing two configurations.

### Crowing / emote animation
An optional triggered animation (click the rooster) that plays a crowing pose or a wing-flap burst, then returns to idle. SVG keyframe or a short GSAP sequence.

---

## UX / Accessibility

### Mobile layout improvements
The control panel grid squashes on narrow screens. Consider a scrollable horizontal tab strip per category on mobile, or a drawer that slides up from the bottom to surface the dropdowns.

### Keyboard navigation for the builder
The avatar parts could be navigable with arrow keys — select a category, then cycle through options without touching a dropdown. Especially useful for demo contexts where a mouse isn't ideal.

### Visual thumbnails in dropdowns
Replace plain text options with small icon swatches or mini SVG previews so users can see the shape/pattern before selecting it. A tooltip on hover for desktop; a preview strip below the select for mobile.

### Accessible label for the FPS counter
The FPS counter in stress test is an unlabelled number. Wrapping it in `<output aria-live="polite">` with a visible label would make it screen-reader friendly.

### Dark mode
A `prefers-color-scheme` media query variant for the warm cream palette. The barn aesthetic could translate well to a night-time barn scene with cooler, darker tones.

### Transition when switching rooster parts
A brief cross-fade or morph on the SVG when a part changes would make the builder feel more alive. CSS `transition` on opacity or a small scale pulse on the changed element.

---

## Product / Roadmap Direction

### Expand to more farm animals
The README already hints at this. A `hen`, `pig`, or `duck` avatar using the same architecture (part sections + colour sections + SVG renderer) would reuse most of the existing infrastructure. The main work is producing the SVG variants.

Consider a shared `AvatarBuilder<T>` abstraction that is animal-agnostic at the component level, so `ControlPanel` and `App` do not need to be rewritten per animal.

### Flock builder mode
Instead of the random stress test, a deliberate flock composer: users pick a number of roosters, customise each one individually, and arrange them in a scene. Could export as a group SVG or PNG.

### Social sharing card
Generate an Open Graph image (server-side or via a Vercel/Cloudflare edge function) from the URL-encoded selection, so sharing a rooster link produces a preview card in Slack, Twitter/X, Discord, etc.

### Progressive Web App (PWA)
Add a `manifest.json` and a minimal service worker so the builder installs to the home screen and works offline. The entire state is local, so there is no offline blocker.

### Embed mode
A `?embed=true` query flag that strips the header and controls, leaving only the animated avatar SVG. Useful for dropping the rooster into other pages or presentations as a live widget.

### Internationalisation (i18n)
Externalize the label strings from `roosterOptions.ts` into message bundles. Low complexity for a small label set, opens the app to non-English audiences.

### Accessibility audit + WCAG AA compliance
Run the app through an automated audit (`axe`, `lighthouse`) and address colour contrast issues, missing ARIA labels, and focus management. A good baseline before promoting the tool publicly.

---

## Quick Wins (low effort, high impact)

| Idea | Effort | Impact |
|------|--------|--------|
| Randomise button in builder | Low | High |
| Share via URL params | Low–Med | High |
| Custom colour picker escape hatch | Low | Med |
| Name your rooster | Low | Med |
| Linter + formatter setup | Low | High (DX) |
| Vitest for `loadStoredSelection` | Low | Med (safety) |
| Simplify App.tsx updaters | Low | Med (DX) |
| Dark mode | Med | Med |
| PNG export | Med | High |
| Preset / saved roosters | Med | High |
