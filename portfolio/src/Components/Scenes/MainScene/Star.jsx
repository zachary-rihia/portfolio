import { useRef, useEffect, useMemo, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

// Effects
import StarLight from "../../Effects/StarLight";

import StarSigns from "../../Signs/StarSigns";
import Portal from "../../Portal/Portal";

useGLTF.preload("/Models/Star/Star.glb");

const Star = forwardRef(({ starPosition, colour, text, portalName }, ref) => {
  const groupRef = useRef();

  // Clone the cached scene so multiple Star instances don't share one object
  const { scene: originalScene } = useGLTF("/Models/Star/Star.glb");
  const scene = useMemo(() => originalScene.clone(true), [originalScene]);

  // Walk every mesh in the model and apply the emissive colour
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhongMaterial({
          color: colour,
          emissive: colour,
          emissiveIntensity: 1,
        });
        // Ensures bloom picks up the emissive
        child.material.toneMapped = false;
      }
    });
  }, [scene, colour, ref]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <>
      <group>
        <RigidBody position={starPosition} type="fixed" colliders="hull">
          {/* ref lives on this inner group so rotation doesn't fight the RigidBody */}
          <group ref={groupRef}>
            <primitive object={scene} scale={24} />
            <pointLight color={colour} intensity={2} distance={30} />
          </group>
        </RigidBody>

        <group position={starPosition}>
          <StarLight colour={colour} />
        </group>

        <StarSigns position={[starPosition[0], 0.3, starPosition[2] + 24]} text={text} />

        <Portal
          args={[2.1, 2.9, 0]}
          position={[starPosition[0], 3, starPosition[2] + 15]}
          portalName={portalName}
        />
      </group>
    </>
  );
});

Star.displayName = "Star";

Star.propTypes = {
  starPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  colour: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  portalName: PropTypes.string.isRequired,
};

export default Star;
