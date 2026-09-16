import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import Window from "./Window";
import Portal from "../../../Portal/Portal";
import useRepeatingTexture from "../../../../Hooks/texture";

const HouseFrames = () => {
  const doorRef = useRef();

  const floorTexture = useRepeatingTexture("/Textures/wood_floor_diff_1k.jpg", 6, 6);
  const ceilingTexture = useRepeatingTexture("/Textures/wood_ceiling.jpg", 21, 21);
  const wallTexture = useRepeatingTexture("/Textures/house_wallpaper.jpg", 15, 15);
  const skirtTexure = useRepeatingTexture("/Textures/wood_skirt.jpg", 1, 1);
  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y -= 0.005;
    }
  });

  return (
    <>
      <group>
        {/* Floor */}
        <RigidBody type="fixed">
          <mesh>
            <boxGeometry args={[15, 1, 9]} />
            <meshStandardMaterial map={floorTexture} />
          </mesh>
        </RigidBody>

        {/* Ceiling */}
        <RigidBody type="fixed">
          <Box args={[15, 0.1, 15]} position={[0, 9.2, 3]}>
            <meshStandardMaterial map={ceilingTexture} />
          </Box>
        </RigidBody>

        {/* Back Wall */}
        <RigidBody type="fixed">
          <group>
            {/* Bottom Skirting */}
            <Box args={[15, 1, 0.2]} position={[0, 0.5, -4.4]}>
              <meshStandardMaterial map={skirtTexure} />
            </Box>
            {/* Top Skirting */}
            <Box args={[15, 1, 0.2]} position={[0, 9, -4.4]}>
              <meshStandardMaterial map={skirtTexure} />
            </Box>
            {/* Wall */}
            <Box args={[15, 9, 0.1]} position={[0, 4.7, -4.5]}>
              <meshStandardMaterial map={wallTexture} />
            </Box>
          </group>
        </RigidBody>

        {/* Left Wall */}
        <RigidBody type="fixed">
          <group>
            {/* Bottom Skirting */}
            <Box args={[0.2, 1, 6]} position={[-7.4, 0.5, -2.4]}>
              <meshStandardMaterial map={skirtTexure} />
            </Box>
            {/* Top Skirting */}
            <Box args={[0.2, 1, 8]} position={[-7.4, 9, -1]}>
              <meshStandardMaterial map={skirtTexure} />
            </Box>
            {/* Wall */}
            <Box args={[0.1, 9, 15]} position={[-7.5, 4.7, 3]}>
              <meshStandardMaterial map={wallTexture} />
            </Box>
          </group>
        </RigidBody>

        {/* Right Wall */}
        <RigidBody type="fixed">
          <group>
            <Window />
            {/* Bottom Skirting */}
            <Box args={[0.2, 1, 8]} position={[7.4, 0.5, -1]}>
              <meshStandardMaterial map={skirtTexure} />
            </Box>
            {/* Top Skirting */}
            <Box args={[0.2, 1, 8]} position={[7.4, 9, -1]}>
              <meshStandardMaterial map={skirtTexure} />
            </Box>
            {/* Wall */}
            <Box args={[0.1, 9, 15]} position={[7.5, 4.7, 1.5]}>
              <meshStandardMaterial map={wallTexture} />
            </Box>
          </group>
        </RigidBody>

        {/* Invisible Wall where the camera is */}
        <RigidBody type="fixed">
          <Box args={[14, 8, 0.1]} position={[0, 4.7, 4.5]}>
            <meshStandardMaterial color="white" transparent opacity={0} />
          </Box>
        </RigidBody>

        {/* Door */}
        <Portal args={[0.02, 2, 1]} position={[-7.4, 2.2, 2]} portalName={"HousePortal"} />
      </group>
    </>
  );
};

export default HouseFrames;
