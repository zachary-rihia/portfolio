import { Box, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

useGLTF.preload("/Models/House/bookshelf.glb");

const BookshelfFrame = ({ position }) => {
  const { scene } = useGLTF("/Models/House/bookshelf.glb");
  return (
    <>
      <group>
        <RigidBody type="fixed" colliders="cuboid">
          <primitive object={scene} scale={5} position={position} rotation={[0, 4.7, 0]} />
        </RigidBody>
      </group>
    </>
  );
};

export default BookshelfFrame;
