import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Each layer: [radius, opacity] — innermost to outermost
const GLOW_LAYERS = [
  [5, 0.2], // tight inner glow
  [9, 0.1], // mid halo
  [15, 0.05], // outer aura
  [25, 0.02], // distant visibility layer
];

const StarLight = ({ colour }) => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Gentle breathing pulse — feels alive without being distracting
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.2) * 0.04;
    groupRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef}>
      {GLOW_LAYERS.map(([radius, opacity], i) => (
        <mesh key={i}>
          <sphereGeometry args={[radius, 24, 24]} />
          <meshBasicMaterial
            color={colour}
            transparent
            opacity={opacity}
            side={THREE.FrontSide} // render outer surface only
            depthWrite={false} // don't occlude anything behind it
            blending={THREE.AdditiveBlending} // adds light, never darkens
          />
        </mesh>
      ))}
    </group>
  );
};

export default StarLight;
