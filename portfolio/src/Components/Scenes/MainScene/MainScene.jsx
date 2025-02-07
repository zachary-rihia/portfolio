import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

// Floor
import Floor from "../../Floor";

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
      {/* <Background /> */}
      <Physics gravity={[0, -9.81, 0]} debug>
        <Floor />
        <Character characterPOS={[0, 6, -33]} sceneName="mainScene" disableMovement={false}/>
        <Star
          starPosition={[24, 12, -30]}
          colour={"#F3F673"}
          text={"About me"}
          godrays={false}
          portal={true}
        />
        <Star
          starPosition={[-27, 12, -24]}
          colour={"#E8A5F9"}
          text={"Credits"}
          godrays={false}
          portal={true}
        />
        <Star
          starPosition={[0, 12, -18]}
          colour={"#F0FFF4"}
          text={"Projects"}
          godrays={false}
          portal={true}
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
