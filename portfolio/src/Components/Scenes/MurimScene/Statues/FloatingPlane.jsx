import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";
import PropTypes from "prop-types";
import useInteract from "../../../../Hooks/useInteract";

const REST_Y_OFFSET = 0;
const RAISED_Y_OFFSET = 1.5;

const FloatingPlane = ({
  position,
  texturePath,
  url,
  download = false,
  width = 1.5,
  height = 2,
}) => {
  const groupRef = useRef();
  const materialRef = useRef();
  const [isNear, setIsNear] = useState(false);

  const texture = useTexture(texturePath);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;

  const handleClick = () => {
    if (!isNear) return; // guard — only clickable once actually raised/near

    if (download) {
      const link = document.createElement("a");
      link.href = url;
      link.download = "";
      link.click();
    } else {
      window.open(url, "_blank");
    }
  };

  useInteract(() => {
    {
      handleClick();
    }
  }, isNear);

  // Smoothly animate toward whatever isNear currently says, every frame
  useFrame(() => {
    if (!groupRef.current) return;

    const targetY = isNear ? RAISED_Y_OFFSET : REST_Y_OFFSET;
    const targetOpacity = isNear ? 1 : 0.15;

    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);

    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        targetOpacity,
        0.08
      );
    }
  });

  return (
    <group position={position}>
      {/* Solid body — always blocks the player, regardless of proximity state */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[width / 2, height / 2, 0.1]} />
      </RigidBody>

      {/* Sensor — wider than the solid body, purely for proximity detection */}
      <CuboidCollider
        args={[1.5, 2, 3]}
        sensor={true}
        onIntersectionEnter={() => setIsNear(true)}
        onIntersectionExit={() => setIsNear(false)}
      />

      {/* Visual plane — floats/fades based on isNear, click only works when near */}
      <group ref={groupRef} onClick={handleClick}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            ref={materialRef}
            map={texture}
            transparent
            opacity={0.15}
            alphaTest={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};

FloatingPlane.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  texturePath: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  download: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default FloatingPlane;
