import { Physics } from "@react-three/rapier";

import Background from "../MainScene/Background";

const ProjectsScene = () => {
  console.log("Projects Scene");
  return (
    <>
      <Physics>
        <Background />
      </Physics>
    </>
  );
};

export default ProjectsScene;
