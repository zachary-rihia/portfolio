import { useTexture, Billboard } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import PropTypes from "prop-types";
import * as THREE from "three";

const Statue = ({ statueArgs, position, texturePath, spriteWidth = 1.5, spriteHeight = 2 }) => {
  const texture = useTexture(texturePath);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  const groundedY = position[1] + spriteHeight / 2; // sits on ground, not half-buried

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={statueArgs} />
      </RigidBody>

      <Billboard position={[0, groundedY - position[1], 0]} follow={true}>
        <mesh>
          <planeGeometry args={[spriteWidth, spriteHeight]} />
          <meshBasicMaterial map={texture} transparent alphaTest={0.5} side={THREE.DoubleSide} />
        </mesh>
      </Billboard>
    </group>
  );
};

Statue.propTypes = {
  statueArgs: PropTypes.arrayOf(PropTypes.number).isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  texturePath: PropTypes.string.isRequired,
  spriteWidth: PropTypes.number,
  spriteHeight: PropTypes.number,
};

export default Statue;
