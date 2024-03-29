// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const Background = () => {
  return (
    <Stars
      radius={300}
      depth={50}
      count={900}
      factor={2}
      saturation={0}
      fade
      speed={1}
    />
  );
};

export default Background;
