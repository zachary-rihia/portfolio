import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

import Portal from "../../../Portal";

const HouseFrames = () => {
  const doorRef = useRef();

  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y -= 0.005; // Slowly rotate the door for effect
    }
  });
  
  return (
    <>
      <EffectComposer> 
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={1}
          intensity={3}
        />
      </EffectComposer>
      <group>
        {/* Floor */}
        <RigidBody type="fixed">
          <Box args={[15, 0.1, 15]} position={[0, 0.3, 3]}>
            <meshStandardMaterial color="#777EB6" />
          </Box>
        </RigidBody>

        {/* Ceiling */}
        <RigidBody type="fixed">
          <Box args={[15, 0.1, 15]} position={[0, 9.2, 3]}>
            <meshStandardMaterial color="white" />
          </Box>
        </RigidBody>

        {/* Back Wall */}
        <RigidBody type="fixed">
          <Box args={[15, 9, 0.1]} position={[0, 4.7, -4.5]}>
            <meshStandardMaterial color="#F5F5F7" />
          </Box>
        </RigidBody>

        {/* Left Wall */}
        <RigidBody type="fixed">
          <Box args={[0.1, 9, 15]} position={[-7.5, 4.7, 3]}>
            <meshStandardMaterial color="#F5F5F7" />
          </Box>
        </RigidBody>

        {/* Right Wall with window hole */}
        <RigidBody type="fixed">
          {/* Top part of the wall above the window */}
          <Box args={[0.1, 1.8, 12]} position={[7.5, 8.4, 1.5]} >
            <meshStandardMaterial color="#F5F5F7" />
          </Box>
          
          {/* Bottom part of the wall below the window */}
          <Box args={[0.1, 6, 9]} position={[7.5, 3, 2.7]} >
            <meshStandardMaterial color="#F5F5F7" />
          </Box>
          
          {/* Left side of the window */}
          <Box args={[0.1, 8, 2.7]} position={[7.5, 3.6, -3.2]} >
            <meshStandardMaterial color="#F5F5F7" />
          </Box>
          
          {/* Right side of the window */}
          <Box args={[0.1, 9, 5]} position={[7.5, 3, 3.3]} >
            <meshStandardMaterial color="#F5F5F7" />
          </Box>
        </RigidBody>

        {/* Window Material */}
        <RigidBody type="fixed">
          <Box args={[0.1, 6, 9]} position={[7.5, 3, 2.7]}>
            <meshStandardMaterial color="white" transparent opacity={0.1} />  {/* Adjust transparency */}
          </Box>
        </RigidBody>
          
        {/* Invisible Wall where the camera is */}
        <RigidBody type="fixed">/
          <Box args={[14, 8, 0.1]} position={[0, 4.7, 4.5]}>
            <meshStandardMaterial color="white" transparent opacity={0} />
          </Box>
        </RigidBody>

        {/* Door */}
        <Portal 
          args={[0.02, 1.8, 0.72 ]}
          position={[-7.4, 2.2, 2]}
          portalName={"Main"}
        />
      </group>
    </>
  );
};

export default HouseFrames;
