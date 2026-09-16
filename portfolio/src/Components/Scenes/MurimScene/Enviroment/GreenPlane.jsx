import * as THREE from "three";

const GreenPlane = ({ position = [0, -0.1, 0], size = 300 }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color="#4a5c2a" />
    </mesh>
  );
};

export default GreenPlane;
