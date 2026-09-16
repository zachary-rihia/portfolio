import { Box } from "@react-three/drei";

import useRepeatingTexture from "../../../../Hooks/texture";

const Window = () => {
  const skirtTexure = useRepeatingTexture("/Textures/wood_skirt.jpg", 1, 1);

  return (
    <group>
      {/* Window frame top */}
      <Box args={[0.2, 0.2, 3.3]} position={[7.4, 7.1, 0]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame bottom */}
      <Box args={[0.2, 0.2, 3.3]} position={[7.4, 2.5, 0]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame mid */}
      <Box args={[0.2, 4.6, 0.2]} position={[7.4, 4.7, 0]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame left */}
      <Box args={[0.2, 4.7, 0.1]} position={[7.4, 4.8, -1.6]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame right */}
      <Box args={[0.2, 4.7, 0.1]} position={[7.4, 4.8, 1.6]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame */}
      <Box args={[0.2, 0.2, 3.3]} position={[7.4, 6.6, 0]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame */}
      <Box args={[0.2, 0.2, 3.3]} position={[7.4, 6, 0]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame */}
      <Box args={[0.2, 0.2, 3.3]} position={[7.4, 5.4, 0]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame */}
      <Box args={[0.2, 0.2, 3.3]} position={[7.4, 4.8, 0]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame */}
      <Box args={[0.2, 0.2, 3.3]} position={[7.4, 4.2, 0]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame */}
      <Box args={[0.2, 0.2, 3.3]} position={[7.4, 3.6, 0]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window frame */}
      <Box args={[0.2, 0.2, 3.3]} position={[7.4, 3, 0]}>
        <meshStandardMaterial map={skirtTexure} />
      </Box>
      {/* Window */}
      <Box args={[0.1, 4.5, 3]} position={[7.4, 4.7, 0]}>
        <meshStandardMaterial
          color="#e5a862"
          emissive="#e5a862"
          emissiveIntensity={1.5}
          transparent
          opacity={1}
        />
      </Box>
    </group>
  );
};

export default Window;
