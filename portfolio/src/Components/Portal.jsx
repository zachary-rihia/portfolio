import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Box } from "@react-three/drei";

import { SceneContext } from "../Context/SceneProviderContext";

const Portal = ({args, position, portalName }) => {
  const { setCurrentScene } = useContext(SceneContext);
  const [insideHitbox, setInsideHitbox] = useState(false); 

    // Function to toggle focus on click (only if inside hitbox)
    const handleKeyDown = (event) => {
      if (insideHitbox && (event.key === " " || event.key === "e" || event.key === "f")) {
        setCurrentScene(portalName)
      }
    };
  
    // Effect to listen for clicks
    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [insideHitbox]);
  
    // Function to update hitbox status
    const handleEnterHitbox = () => {
      setInsideHitbox(true);
    };
  
    const handleExitHitbox = () => {
      setInsideHitbox(false);
    };
  

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
          onCollisionEnter={handleEnterHitbox}
					onCollisionExit={handleExitHitbox}
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
