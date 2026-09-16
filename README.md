# Portfolio

*(Alpha stage)*

An interactive 3D portfolio built with React Three Fiber — instead of scrolling through a traditional resume site, visitors walk a character through a small explorable world. Projects live as physical books on a shelf, statues share a bit about me through dialogue, and portals connect different scenes together.

> 🔗 **Live demo:** _add your deployed Railway URL here_

---

## Concept

Most developer portfolios are a scrolling page of text and screenshots. This one is a small 3D world instead:

- Walk a character between glowing **portals**, each leading to a different scene
- **Projects** are represented as books on a shelf — click one to open it and read through project details, description, and screenshots
- An **About Me** area, styled as a top-down pixel RPG (inspired by Pokémon/Undertale), where statues share pieces of who I am through dialogue
- A physics-driven world built with Rapier, so movement and collisions feel real rather than scripted

The goal was to make a portfolio that's more memorable and interactive than a static page, while still clearly showcasing real project work.

---

## Tech Stack

- **[React](https://react.dev/)** + **[Vite](https://vitejs.dev/)**
- **[Three.js](https://threejs.org/)** via **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)**
- **[@react-three/drei](https://github.com/pmndrs/drei)** — helpers and abstractions for R3F
- **[@react-three/rapier](https://github.com/pmndrs/react-three-rapier)** — physics (movement, collisions, sensors)
- **[@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)** — bloom and visual effects
- **Zustand** — lightweight state management

---

## Features

- Camera-relative character movement and physics-based collision
- Portal system connecting multiple scenes, each with its own frame model and destination
- Interactive bookshelf — books open to a page-spread view with project details, generated dynamically via canvas textures
- Dialogue system for NPC-style statue interactions
- Pixel-art styled scene with sprite-based character animation (idle/walk/run, 4-directional)
- Procedurally generated forest boundary and cosmic nebula background/floor effects
- Loading screen driven by asset load progress

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/zachary-rihia/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run the dev server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Other scripts

```bash
npm run build          # Production build
npm run preview        # Preview the production build locally
npm run lint            # Run ESLint
npm run format           # Format with Prettier
npm run format:check     # Check formatting without writing changes
```

---

### `sRGBEncoding` import error in `@react-three/postprocessing`

If you install dependencies fresh, you may run into this error:

![sRGBEncoding error](https://github.com/zachary-rihia/portfolio/assets/83677402/21265044-bb1b-47af-826f-517cca236fae)

**Fix:**

1. Open `node_modules/@react-three/postprocessing/dist/effects/Texture.js`
2. Delete the `sRGBEncoding` import:

   ![Remove import](https://github.com/zachary-rihia/portfolio/assets/83677402/6c0c1d03-f744-4f90-a519-aff987bb4fb7)

3. Replace its usage with `THREE.sRGBEncoding`:

   ![Replace usage](https://github.com/zachary-rihia/portfolio/assets/83677402/09545131-d8fd-4a26-b1ac-9065a9b5a20c)

This is a version-mismatch issue between `@react-three/postprocessing` and the installed version of `three` — the package still references an older Three.js constant that's since moved.

### `ShaderPass` and `RenderPass` don't exist in `@react-three/postprocessing`

These aren't exported from this package — if you need them directly, they should be imported from `three/examples/jsm/postprocessing/` instead.

---

## Assets

- Pixel art tileset and environment assets: [Cainos — Pixel Art Top Down Basic](https://cainos.itch.io/pixel-art-top-down-basic)

---

## Deployment

This project deploys via [Railway](https://railway.com/) using a multi-stage Docker build — the app is built with Vite and served as static files through Caddy.

---

## License

_This is personal/portfolio work not intended for reuse._
