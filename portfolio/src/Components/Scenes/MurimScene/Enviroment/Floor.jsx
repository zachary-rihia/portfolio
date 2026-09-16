import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const Floor = ({
  texturePath,
  position = [0, 0, 0],
  worldWidth = 40,
  worldDepth = 30,
  flipZ = false,
}) => {
  const texture = useTexture(texturePath);

  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  if (flipZ) {
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.y = -1;
    texture.offset.y = 1;
    texture.needsUpdate = true;
  }

  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
        <planeGeometry args={[worldWidth, worldDepth]} />
        <meshStandardMaterial map={texture} roughness={1} metalness={0} />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
