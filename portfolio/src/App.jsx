import "./App.css";
import { useState } from "react";
import { Suspense } from "react";
import CharacterPositionContext from "./Context/CharacterPositionContext";
import { SceneProvider } from "./Context/SceneProviderContext";
import { DialogueProvider } from "./Context/DialogueProviderContext";

import SceneHandler from "./Components/Scenes/SceneHandler";
import { OrbitControls } from "@react-three/drei";

const App = () => {
  const [position, setPosition] = useState([0, 6, -33]); // Initial Character position

  return (
    <Suspense fallback={null}>
      <SceneProvider>
        <CharacterPositionContext.Provider value={{ position, setPosition }}>
          <perspectiveCamera makeDefault position={[0, 0, 5]} fov={75} near={0.1} far={1000} />
          {/* <OrbitControls /> */}
          <SceneHandler />
        </CharacterPositionContext.Provider>
      </SceneProvider>
    </Suspense>
  );
};

export default App;
