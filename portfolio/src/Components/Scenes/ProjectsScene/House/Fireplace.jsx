import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

useGLTF.preload("/Models/House/fireplace.glb");

const Fireplace = () => {
  const { scene } = useGLTF("/Models/House/fireplace.glb");

  return (
    <>
      <group>
        <RigidBody type="fixed" colliders="cuboid">
          <primitive object={scene} scale={3.3} position={[0, 2.1, -3.9]} rotation={[0, 4.7, 0]} />
        </RigidBody>
      </group>
    </>
  );
};

export default Fireplace;
