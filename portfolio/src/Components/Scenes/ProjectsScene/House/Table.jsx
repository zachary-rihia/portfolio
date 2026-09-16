import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

useGLTF.preload("/Models/House/table.glb");

const Table = () => {
  const { scene } = useGLTF("/Models/House/table.glb");
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        <primitive object={scene} scale={2} position={[1.7, 1.2, 1]} rotation={[0, 6.6, 0]} />
      </RigidBody>
    </group>
  );
};

export default Table;
