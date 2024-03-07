import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";
import { EffectComposer, GodRays, Bloom } from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

const Star = ({ starPosition, colour }) => {
  const sphereRef = useRef();

  useFrame(() => {
    // Axis rotation
    if (sphereRef.current) {
      sphereRef.current.rotation.y -= 0.3;
    }
  });

  return (
    <>
      <EffectComposer>
        <Bloom
          kernelSize={2}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.6}
          intensity={1}
        />
      </EffectComposer>
      <Sphere ref={sphereRef} position={starPosition} args={[1, 32, 32]}>
        <meshPhongMaterial
          color={colour}
          // eslint-disable-next-line react/no-unknown-property
          emissive={colour}
          // eslint-disable-next-line react/no-unknown-property
          emissiveIntensity={1}
        />
        <pointLight />
      </Sphere>
      <Effects sphereRef={sphereRef} />
    </>
  );
};

Star.propTypes = {
  starPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  colour: PropTypes.string.isRequired,
};

const Effects = ({ sphereRef }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (sphereRef.current) {
      setIsReady(true);
    }
  }, [sphereRef]);
  return (
    <>
      {isReady && (
        <EffectComposer multisampling={0}>
          <GodRays
            sun={sphereRef.current}
            blendFunction={BlendFunction.Screen}
            samples={60}
            density={0.97}
            decay={0.96}
            weight={0.6}
            exposure={0.1}
            clampMax={1}
            width={Resizer.AUTO_SIZE}
            height={Resizer.AUTO_SIZE}
            kernelSize={KernelSize.SMALL}
            blur={true}
          />
        </EffectComposer>
      )}
    </>
  );
};

Effects.propTypes = {
  sphereRef: PropTypes.shape({
    current: PropTypes.instanceOf(THREE.Mesh),
  }).isRequired,
};

export default Star;
