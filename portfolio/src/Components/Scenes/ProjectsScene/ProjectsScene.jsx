import React, { useState } from "react";
import { Physics } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";

// Floor
import Floor from "../../Floor";

// Main Scene
import Background from "../MainScene/Background";
import Star from "../MainScene/Star";

//House Objects
import HouseFrames from "./House/HouseFrames";

// Character
import Character from "../../Character/Character";

const ProjectsScene = () => {
  console.log("Projects Scene");
  const [isLoaded, setIsLoaded] = useState(false);
  const { camera } = useThree();

  const handleLoadComplete = () => {
    setIsLoaded(true);
  };
  
  camera.position.set( -0.1, 3.6, 7.8 );
  camera.lookAt( 0, 3.3, 0 );

  return (
    <>
      <Physics gravity={[0, -9.81, 0]} debug>
        <Background />
        <Floor />
        <HouseFrames />
        <Character characterPOS={[-6, 1.8, 2]} sceneName="projectsScene"/>
        <Star
          starPosition={[21, 9, -10]}
          colour={"yellow"}
          text={""}
          godrays={true}
          portal={false}
        />
      </Physics>
    </>
  );
};

//-7.5, 1.5, 2
export default ProjectsScene;
