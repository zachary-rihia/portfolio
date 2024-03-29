/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const [currentScene, setCurrentScene] = useState("Main");

  return (
    <SceneContext.Provider value={{ currentScene, setCurrentScene }}>
      {children}
    </SceneContext.Provider>
  );
};
