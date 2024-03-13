import "./App.css";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

// Character
import Character from "./Components/Character/Character";

// Main Scene
import Background from "./Components/MainScene/Background";
import Star from "./Components/MainScene/Star";

// Floor
import Floor from "./Components/Floor";

const App = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <Background />
      <Physics gravity={[0, -20, 0]}>
        <Floor />
        <Character />
        <Star
          starPosition={[24, 6, -30]}
          colour={"#F3F673"}
          text={"About me"}
        />
        <Star
          starPosition={[-27, 6, -24]}
          colour={"#E8A5F9"}
          text={"Credits"}
        />
        <Star starPosition={[0, 6, -18]} colour={"#F0FFF4"} text={"Projects"} />
      </Physics>
    </>
  );
};

export default App;

// #E8A5F9 Purple
// #6FC4F5 Blue
// #F3F673 yellow
// #F0FFF4 white
