import dialogueData from "./statueDialogue.json";

export const STATUES = [
  {
    id: "architect",
    position: [23, 1, 58],
    hitboxPosition: [21, 1, 58.4],
    texturePath: "/Textures/statue1.png",
    spriteWidth: 2,
    spriteHeight: 3,
    dialogue: dialogueData.architect,
  },
  {
    id: "chronicler",
    position: [-22, 1, 58.4],
    hitboxPosition: [-21, 1, 58.4],
    texturePath: "/Textures/statue2.png",
    spriteWidth: 2.5,
    spriteHeight: 4,
    dialogue: dialogueData.chronicler,
  },
  {
    id: "seeker",
    position: [23, 1, 34.6],
    hitboxPosition: [21, 1, 34.6],
    texturePath: "/Textures/statue1.png",
    spriteWidth: 2,
    spriteHeight: 3,
    dialogue: dialogueData.seeker,
  },
  {
    id: "duelist",
    position: [-22.5, 1, 34.6],
    hitboxPosition: [-21, 1, 34.6],
    texturePath: "/Textures/statue3.png",
    spriteWidth: 1.5,
    spriteHeight: 2,
    dialogue: dialogueData.duelist,
  },
  {
    id: "dreamsmith",
    position: [23, 1, 10.5],
    hitboxPosition: [21, 1, 10.5],
    texturePath: "/Textures/statue2.png",
    spriteWidth: 2,
    spriteHeight: 3,
    dialogue: dialogueData.dreamsmith,
  },
  {
    id: "pathfinder",
    position: [-22.5, 1, 10.5],
    hitboxPosition: [-21, 1, 10.5],
    texturePath: "/Textures/statue3.png",
    spriteWidth: 2,
    spriteHeight: 3,
    dialogue: dialogueData.pathfinder,
  },
];

// Shared collider size for the standard 6 statues
export const STATUE_ARGS = [1.5, 1, 1.5];
export const HITBOX_ARGS = [1.5, 2, 1.5];

// The final statue is visually distinct
export const END_STATUE = {
  position: [0, 1, 0],
  args: [1.5, 2, 1.5],
  texturePath: "/Textures/statue4.png",
  spriteWidth: 2,
  spriteHeight: 3,
};
