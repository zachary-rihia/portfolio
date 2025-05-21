import { useContext, useEffect } from "react";
import { SceneContext } from "../../Context/SceneProviderContext";

import MainScene from "./MainScene/MainScene";
import ProjectsScene from "./ProjectsScene/ProjectsScene";
import AboutMe from "./MurimScene/AboutMeScene";

const SceneHandler = () => {
  const { currentScene } = useContext(SceneContext);

  useEffect(() => {
    console.log(`Current scene: ${currentScene}`);
  }, [currentScene]);

  return (
    <>
      {currentScene === "Main" && <MainScene />}
      {currentScene === "Projects" && <ProjectsScene />}
      {currentScene === "About me" && <AboutMe />}
    </>
  );
};


export default SceneHandler;
