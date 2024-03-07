import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Main Scene
import Background from "./Components/MainScene/Background";
import Star from "./Components/MainScene/Star";

// Floor
import Floor from "./Components/Floor";

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [0, -1.5, 3] }}>
      <OrbitControls />
      <ambientLight />
      <Floor />
      <Background />
      <Star starPosition={[18, 27, 1]} colour={"#F3F673"} />
      <Star starPosition={[-21, 24, 1]} colour={"#E8A5F9"} />
      <Star starPosition={[0, 18, 1]} colour={"#F0FFF4"} />
    </Canvas>
  );
};

export default App;

// #E8A5F9 Purple
// #6FC4F5 Blue
// #F3F673 yellow
// #F0FFF4 white
