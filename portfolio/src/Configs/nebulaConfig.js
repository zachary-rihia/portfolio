// ── Nebula cloud definitions ──────────────────────────────────────────────────
// x/y are positions on the equirectangular texture map (0–2048, 0–1024)
// radius controls how far the cloud spreads
// alpha controls opacity — keep between 0.05 and 0.15 for a subtle look
//
// Colors are intentionally shared with portalConfig and sceneConfig so the
// sky, floor mist, and star glows all feel like they belong to the same space

export const NEBULA_CLOUDS = [
  { x: 300, y: 250, radius: 450, color: "#E8A5F9", alpha: 0.12 }, // purple
  { x: 1400, y: 180, radius: 380, color: "#6FC4F5", alpha: 0.1 }, // blue
  { x: 800, y: 700, radius: 520, color: "#F3F673", alpha: 0.07 }, // yellow
  { x: 1700, y: 550, radius: 300, color: "#E8A5F9", alpha: 0.08 }, // purple
  { x: 100, y: 800, radius: 350, color: "#6FC4F5", alpha: 0.06 }, // blue
  { x: 1100, y: 380, radius: 420, color: "#FFB3D9", alpha: 0.07 }, // pink
  { x: 580, y: 100, radius: 280, color: "#B3FFE6", alpha: 0.08 }, // teal
  { x: 1850, y: 900, radius: 400, color: "#F3F673", alpha: 0.05 }, // yellow
];

// ── Star field settings ───────────────────────────────────────────────────────
// Kept here so the whole background look can be tuned from one place

export const STAR_FIELD = {
  radius: 350,
  depth: 80,
  count: 7000,
  factor: 2.5,
  saturation: 0.3,
  speed: 0.1,
};

// ── Texture canvas dimensions ─────────────────────────────────────────────────
export const NEBULA_TEXTURE = {
  width: 2048,
  height: 1024,
  baseColor: "#00000D", // deep space background tint
  speckleCount: 300, // distant star cluster dots
  speckleOpacity: 0.6,
  speckleMaxRadius: 1.2,
};
