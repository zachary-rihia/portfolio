import { useContext } from "react";
import PropTypes from "prop-types";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Box } from "@react-three/drei";

import { SceneContext } from "../Context/SceneProviderContext";

const Portal = ({args, position, portalName }) => {
  const { setCurrentScene } = useContext(SceneContext);

  return (
    <group>
      <EffectComposer> 
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={1}
          intensity={2}
        />
      </EffectComposer>

      <Box args={args.map(arg => arg * 2)} position={position}>
        <meshStandardMaterial color="#5EBCFF" emissive="#5EBCFF" emissiveIntensity={3} />
      </Box>

      <RigidBody type="fixed">
        <CuboidCollider
          args={args}
          position={position}
          onCollisionEnter={() => {
            setCurrentScene(portalName);
          }}
        />
      </RigidBody>
    </group>
  );
};

Portal.propTypes = {
  args: PropTypes.arrayOf(PropTypes.number).isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  portalName: PropTypes.string.isRequired,
};

export default Portal;
