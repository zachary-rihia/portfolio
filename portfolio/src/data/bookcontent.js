export const BOOKSHELF_BOOKS = [
  {
    title: "Photogrammetry Application",
    colour: "#8B3A3A",
    pages: [
      {
        title: "Photogrammetry Application",
        details: [
          {
            label: "Languages & Tools",
            value: "TypeScript, Node.js, Next.js, SASS, Three.js, React, Docker",
          },
          { label: "Workflow", value: "Agile" },
          { label: "Team size", value: "3" },
          { label: "Position", value: "Internship" },
          { label: "Role", value: "Full Stack Developer" },
        ],
        image: null,
      },
      {
        text: "Reconstructing 3D geometry from photos or video is normally locked behind expensive desktop software. This project brought that pipeline into the browser; users could upload either photos or video, with video footage automatically broken down into individual frames ready for processing into a 3D model. I was part of the project from its start through the full year-long internship, contributing across the stack as it grew.\n\nMy focus was the real-time and backend infrastructure. I built the video-to-frames pipeline, integrated WebSockets so users could track processing progress live, and added a front-end view so users could see which images already belonged to a project before processing began.\n\nBeyond the core pipeline, I added Firebase authentication so each user got their own private project directory, wrote middleware to restrict project access to authorized users only, and secured the WebSocket connection itself so it required an authenticated session to use. I also converted the app into a PWA and documented the WebSocket setup and authorization flow for the rest of the team.",
        image: null,
      },
    ],
  },
  {
    title: "This Portfolio",
    colour: "#6B7FD7", // periwinkle
    pages: [
      {
        title: "This Portfolio",
        details: [
          {
            label: "Languages & Tools",
            value:
              "React, Three.js, React Three Fiber, React Three Drei, React Three Rapier, Vite, Zustand",
          },
          { label: "Backend", value: "Firebase (Firestore + Cloud Functions)" },
          { label: "Physics", value: "Rapier3D" },
          { label: "Workflow", value: "Solo" },
          { label: "Position", value: "Personal Project" },
          { label: "Role", value: "Solo Developer" },
        ],
        image: null,
      },
      {
        text: "Most portfolios are a scrolling page of text and screenshots. I wanted mine to actually be explorable; inspired by 3D portfolios I'd seen from other developers, combined with things I already love: gaming and reading.\n\nThe result is a small 3D world built with React Three Fiber and Rapier physics. Visitors walk a character between glowing portals, each leading to a different scene, and my projects live as physical books on a shelf inside one of them; click a book and it opens to show the project's details and description, just like flipping through a real book.\n\nThe bookshelf format was a deliberate choice beyond just looking nice: it scales naturally. Every new project is just another book added to the shelf, rather than another section bolted onto a growing page.\n\nBuilding this also meant solving problems outside typical web development; camera-relative character movement, physics colliders that match visual models, canvas-generated page textures for the books, and layered particle/lighting effects to make the world feel alive rather than static.",
        image: null,
      },
    ],
  },
  {
    title: "Dungeon Crawler Game Jam",
    colour: "#7A4A2B",
    pages: [
      {
        title: "Dungeon Crawler Game Jam",
        details: [
          { label: "Language", value: "C#" },
          { label: "Engine", value: "Unity" },
          { label: "Genre", value: "Dungeon Crawler / Roguelike" },
          { label: "Team size", value: "3" },
          { label: "Time limit", value: "48 hours" },
          { label: "Position", value: "Game Jam" },
          { label: "Role", value: "Gameplay Programmer" },
        ],
        image: null,
      },
      {
        text: "This was my first real introduction to game development, built during a 48-hour game jam with a small team creating a dungeon crawler roguelike.\n\nStill learning Unity at the time, I focused on core gameplay systems: enemy pathfinding so zombies could chase the player, line-of-sight detection so enemies only reacted once they could actually see the player, and the attack logic when they caught up. I also built the player HUD, the death screen, the main menu, and the boss encounter.\n\nWorking under a hard 48-hour deadline while still learning the engine meant prioritizing ruthlessly; getting core loops functional came before anything else, polish came last if there was time left at all. It was a strong first lesson in scoping a project around a real constraint rather than an open-ended timeline.",
        image: null,
      },
    ],
  },
  {
    title: "Dating Sim - Arts Collaboration",
    colour: "#B85C8A",
    pages: [
      {
        title: "Dating Sim - Arts Collaboration",
        details: [
          { label: "Language", value: "C#" },
          { label: "Engine", value: "Unity" },
          { label: "Genre", value: "Dating Sim" },
          { label: "Dev team size", value: "4" },
          { label: "Art team size", value: "4" },
          { label: "Collaboration", value: "University Arts Department" },
          { label: "Position", value: "University Project" },
          { label: "Role", value: "Gameplay Programmer" },
        ],
        image: null,
      },
      {
        text: "A dating sim built as a cross-department collaboration between game development and the university's arts department, where the goal was romancing characters, each with their own mini-game acting as a 'date.'\n\nMy contributions were the menu system, the save/load system, and one of the mini-games; a DDR-style rhythm game as one of the dates. Working alongside 4 art students meant translating character designs and narrative beats made by non-programmers into working systems, a different kind of collaboration than an all-programmer team of 4.\n\nThe save/load system was the most difficult part by far. From what I remember, it had issues interacting with the pause menu; the game kept running in the background rather than actually pausing state, which caused inconsistent behaviour with what got saved. It's been a while since I worked on it, so I don't recall the exact root cause, but it was a good early lesson in how much more complex state management becomes once systems like pausing, saving, and UI all need to agree on the same game state.",
        image: null,
      },
    ],
  },
];
