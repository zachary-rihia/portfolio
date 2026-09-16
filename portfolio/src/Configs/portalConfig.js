export const PORTAL_FRAMES = {
  // ── Main scene portals (lead to their named scene) ──────────────────
  AboutMePortal: {
    path: "/Models/PortalFrame/stoneArch.glb",
    destination: "About me",
    scale: 8.4,
    offset: [0, 0, 0],
    rotation: [0, 17.3, 0],
  },
  ProjectsPortal: {
    path: "/Models/PortalFrame/woodenArch.glb",
    destination: "Projects",
    scale: 7.5,
    offset: [0, -0.5, 0],
    rotation: [0, 17.3, 0],
  },
  CreditsPortal: {
    path: "/Models/PortalFrame/woodenArch.glb",
    destination: "Credits",
    scale: 7.5,
    offset: [0, -0.5, 0],
    rotation: [0, 17.3, 0],
  },
  // ── Return portals (different frames per scene, same destination) ────
  HousePortal: {
    path: "/Models/PortalFrame/victorianDoorWay.glb",
    destination: "Main",
    scale: 5.1,
    offset: [0.3, 0.6, 0.15],
    rotation: [0, 0, 0],
  },
  PixelPortal: {
    path: "/Models/PortalFrame/stoneArch.glb",
    destination: "Main",
    scale: 5,
    offset: [0, 0, 0],
    rotation: [0, 17.3, 0],
  },
};

// Convenience array for preloading — no need to touch PortalFrame.jsx
// when adding new entries, just update this file
export const PORTAL_FRAME_PATHS = Object.values(PORTAL_FRAMES).map(({ path }) => path);
