# Rooster Generator

Small React + Vite character builder for making a customizable rooster.

## Features

- Live rooster preview
- Part customization: body type (standard/bantam/silkie/ornamental), tail shape (standard/stubby/majestic/peacock), wings, feather pattern, comb shape, head, eyes, feet, and headwear
- Color customization for body, tail, wings, comb, beak/feet, and headwear
- Eye accessories: round glasses (single profile lens) and sunglasses
- "Surprise me!" randomiser button
- Optional preview animation toggle
- Saved customization with `localStorage`
- Stress test view — randomise a whole flock to check rendering performance
- GitHub Pages deployment workflow

## Local development

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Project structure

- `src/App.tsx` — app state, persistence, preview controls, "Surprise me!" randomiser
- `src/components/ControlPanel.tsx` — dropdown and colour picker UI
- `src/components/RoosterAvatar.tsx` — rooster SVG rendering and animation
- `src/components/RoosterStressTest.tsx` — flock stress test view
- `src/data/roosterOptions.ts` — customization options and defaults
- `src/types/avatar.ts` — selection and option types
- `src/utils/randomSelection.ts` — shared random selection utility (keyed lookup)

## GitHub Pages

This project is configured for GitHub Pages project-site deploys.

1. Push to `main` or `master`
2. In GitHub repo settings, set **Pages** source to **GitHub Actions**
3. Site publishes at:

```text
https://<owner>.github.io/<repo>/
```

Workflow file:

```text
.github/workflows/deploy-pages.yml
```
