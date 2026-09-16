import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Floor
import Floor from "../../Flooring/Floor";
import NebulaFloor from "../../Effects/NebualFloor";
import ControlsSign from "../../Signs/ControlsSign";

// Main Scene
import Background from "./Background";
import Star from "./Star";

// Character
import Character from "../../Character/Character";

const MainScene = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight />

      {/* Single EffectComposer for the whole scene */}
      <EffectComposer>
        <Bloom kernelSize={5} luminanceThreshold={0.4} luminanceSmoothing={0.6} intensity={1} />
      </EffectComposer>

      <Background />
      {/* <NebulaFloor />  */}
      <ControlsSign position={[-10, 0, -47]} />

      <Physics gravity={[0, -9.81, 0]}>
        <Floor />
        <Character characterPOS={[0, 1.5, -33]} sceneName="Main" disableMovement={false} />

        <Star
          starPosition={[40, 12, 3]}
          colour="#F3F673"
          text="About me"
          portalName={"AboutMePortal"}
        />
        {/* <Star
          starPosition={[-60, 12, -24]}
          colour="#E8A5F9"
          text="Credits"
          portalName={"CreditsPortal"}
        /> */}
        <Star
          starPosition={[-20, 12, 3]}
          colour="#F0FFF4"
          text="Projects"
          portalName={"ProjectsPortal"}
        />
      </Physics>
    </>
  );
};

export default MainScene;

// #E8A5F9 Purple
// #6FC4F5 Blue
// #F3F673 yellow
// #F0FFF4 white
