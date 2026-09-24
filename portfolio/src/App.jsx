import "./App.css";
import { useState } from "react";
import { Suspense } from "react";
import { CharacterPositionProvider } from "./Context/CharacterPositionContext";
import { SceneProvider } from "./Context/SceneProviderContext";

import SceneHandler from "./Components/Scenes/SceneHandler";
import { OrbitControls } from "@react-three/drei";

const App = () => {
  return (
    <Suspense fallback={null}>
      <SceneProvider>
        <CharacterPositionProvider>
          <perspectiveCamera makeDefault position={[0, 0, 5]} fov={75} near={0.1} far={1000} />
          {/* <OrbitControls /> */}
          <SceneHandler />
        </CharacterPositionProvider>
      </SceneProvider>
    </Suspense>
  );
};

export default App;
