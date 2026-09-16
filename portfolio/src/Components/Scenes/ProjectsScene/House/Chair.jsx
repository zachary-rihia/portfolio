import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

useGLTF.preload("/Models/House/chair.glb");

const Chair = () => {
  const { scene } = useGLTF("/Models/House/chair.glb");
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        <primitive object={scene} scale={2.7} position={[3.6, 2, 1.5]} rotation={[0, 2, 0]} />
      </RigidBody>
    </group>
  );
};

export default Chair;
