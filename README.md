# Rooster Generator

Small React + Vite character builder for making a customizable rooster.

## Features

- Live rooster preview
- Part customization for body, tail, wings, feather pattern, comb shape, head, chest fluff, feet, and headwear
- Color customization for body, wings, comb, beak/feet, and headwear
- Optional preview animation toggle
- Saved customization with `localStorage`
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

- `src/App.tsx` - app state, persistence, preview controls
- `src/components/ControlPanel.tsx` - dropdown UI
- `src/components/RoosterAvatar.tsx` - rooster SVG rendering and animation
- `src/data/roosterOptions.ts` - customization options and defaults
- `src/types/avatar.ts` - selection and option types

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
