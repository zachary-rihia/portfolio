import "./App.css";
import { useState } from "react";
import CharacterPositionContext from "./Context/CharacterPositionContext";
import { SceneProvider } from "./Context/SceneProviderContext";

import SceneHandler from "./Components/Scenes/SceneHandler";

const App = () => {
  const [position, setPosition] = useState([0, 6, -33]); // Initial Character position

  return (
    <SceneProvider>
      <CharacterPositionContext.Provider value={{ position, setPosition }}>
        <SceneHandler />
      </CharacterPositionContext.Provider>
    </SceneProvider>
  );
};

export default App;
