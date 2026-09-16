import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useGLTF, Box } from "@react-three/drei";
import { SceneContext } from "../../Context/SceneProviderContext";

import { PORTAL_FRAMES, PORTAL_FRAME_PATHS } from "../../Configs/portalConfig";
import useInteract from "../../Hooks/useInteract";

PORTAL_FRAME_PATHS.forEach((path) => useGLTF.preload(path));

const PortalFrame = ({ args, position, portalName }) => {
  const config = PORTAL_FRAMES[portalName];

  const { scene } = useGLTF(config?.path);
  const { setCurrentScene } = useContext(SceneContext);
  const [insideHitbox, setInsideHitbox] = useState(false);

  useInteract(() => {
    if (insideHitbox) {
      setCurrentScene(config.destination);
    }
  }, insideHitbox);

  if (!config) {
    console.warn(`PortalFrame: no config for "${portalName}"`);
    return null;
  }

  return (
    <group position={position}>
      <Box args={args.map((arg) => arg * 2)}>
        <meshStandardMaterial
          color="#5EBCFF"
          emissive="#5EBCFF"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
        />
      </Box>

      {/* Each portal pulls its own transform values from the config above */}
      <primitive
        object={scene}
        scale={config.scale}
        position={config.offset}
        rotation={config.rotation}
      />

      <RigidBody type="fixed">
        <CuboidCollider
          args={args}
          onCollisionEnter={() => setInsideHitbox(true)}
          onCollisionExit={() => setInsideHitbox(false)}
        />
      </RigidBody>
    </group>
  );
};

PortalFrame.propTypes = {
  args: PropTypes.arrayOf(PropTypes.number).isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  portalName: PropTypes.string.isRequired,
};

export default PortalFrame;
