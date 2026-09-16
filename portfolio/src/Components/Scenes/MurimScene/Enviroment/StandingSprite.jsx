import { useTexture, Billboard } from "@react-three/drei";
import * as THREE from "three";
import PropTypes from "prop-types";

const StandingSprite = ({ texturePath, position, width, height, flip = false }) => {
  const texture = useTexture(texturePath);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  // Push the sprite up so its bottom edge sits at y=0 (ground level)
  // instead of the plane's center sitting at y=0
  const groundedPosition = [position[0], position[1] + height / 2, position[2]];

  return (
    <Billboard position={groundedPosition} follow={true}>
      <mesh scale={[flip ? -1 : 1, 1, 1]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.5} side={THREE.DoubleSide} />
      </mesh>
    </Billboard>
  );
};

StandingSprite.propTypes = {
  texturePath: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  flip: PropTypes.bool,
};

export default StandingSprite;
