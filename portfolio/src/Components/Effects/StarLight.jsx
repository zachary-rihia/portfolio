// Effects.js
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";
import PropTypes from "prop-types";
import * as THREE from "three"

const StarLight = ({ sphereRef }) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    if (sphereRef.current) {
      const composer = new EffectComposer(gl);
      composer.addPass(
        new GodRays(camera, sphereRef.current, {
          blendFunction: BlendFunction.Screen,
          samples: 60,
          density: 0.97,
          decay: 0.96,
          weight: 0.6,
          exposure: 0.1,
          clampMax: 1,
          width: Resizer.AUTO_SIZE,
          height: Resizer.AUTO_SIZE,
          kernelSize: KernelSize.SMALL,
          blur: true,
        })
      );

      // Cleanup
      return () => {
        composer.dispose();
      };
    }
  }, [gl, scene, camera, sphereRef]);

  return null;
};

StarLight.propTypes = {
  sphereRef: PropTypes.shape({
    current: PropTypes.instanceOf(THREE.Mesh),
  }).isRequired,
};

export default StarLight;
