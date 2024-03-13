import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Sphere } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

// Effects
// import StarLight from "../Effects/StarLight";

import StarSigns from "../Signs/StarSigns";

const Star = ({ starPosition, colour, text }) => {
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
          kernelSize={5}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.6}
          intensity={1}
        />
      </EffectComposer>
      <group>
        <RigidBody>
          <Sphere ref={sphereRef} position={starPosition} args={[4.5, 45, 45]}>
            <meshPhongMaterial
              color={colour}
              // eslint-disable-next-line react/no-unknown-property
              emissive={colour}
              // eslint-disable-next-line react/no-unknown-property
              emissiveIntensity={3}
            />
            <pointLight />
          </Sphere>
        </RigidBody>
        <StarSigns
          position={[starPosition[0], 0.3, starPosition[2] + 6]}
          text={text}
        />
        {/* <StarLight sphereRef={sphereRef}/> */}
      </group>
    </>
  );
};

Star.propTypes = {
  starPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  colour: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Star;
