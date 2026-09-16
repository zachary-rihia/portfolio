import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import PropTypes from "prop-types";

const GroundSprite = ({ texturePath, position, width, height, flip = false }) => {
  const texture = useTexture(texturePath);

  // Critical for pixel art crispness
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]} // 👈 lies flat if ground-level (grass), or...
      scale={[flip ? -1 : 1, 1, 1]} // mirror horizontally for variety
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
};

GroundSprite.propTypes = {
  texturePath: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  flip: PropTypes.bool,
};

export default GroundSprite;
