import { Box, Cylinder, Torus } from "@react-three/drei";
import { RigidBody } from '@react-three/rapier';

const Fireplace = () => {
	return (
		<>
			<group>
                <RigidBody type="fixed" colliders="cuboid">
                    {/* Recessed Wall (backing) */}
                    <Box args={[3, 3, 0.2]} position={[0, 1.9, -4.4]}>
                        <meshStandardMaterial color="#808080" />
                    </Box>

                    {/* Main frame of the fireplace */}
                    <Box args={[2, 0.3, 0.4]} position={[0, 0.6, -4.2]}>
                        <meshStandardMaterial color="white" />
                    </Box>

                    {/* Columns */}
                    <Cylinder args={[0.1, 0.1, 2, 32]} position={[-0.9, 1.4, -4.2]}>
                        <meshStandardMaterial color="white" />
                    </Cylinder>
                    <Cylinder args={[0.1, 0.1, 2, 32]} position={[0.9, 1.4, -4.2]}>
                        <meshStandardMaterial color="white" />
                    </Cylinder>

                    {/* Fireplace arch */}
                    <Torus
                        args={[0.7, 0.05, 16, 100, Math.PI]}
                        position={[0, 1.4, -4.2]}
                        rotation={[Math.PI, 0, 0]}
                    >
                        <meshStandardMaterial color="white" />
                    </Torus>

                    {/* Mantelpiece */}
                    <Box args={[2, 0.2, 0.4]} position={[0, 2.4, -4.2]}>
                        <meshStandardMaterial color="white" />
                    </Box>
                </RigidBody>
			</group>
		</>
	);
};

export default Fireplace;
