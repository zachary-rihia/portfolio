import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

function Bookshelf() {
	return (
		<>
			<group>
				<RigidBody type="fixed" colliders="cuboid">
					{/* Bookshelf Frame */}
					<Box args={[2, 3, 0.2]} position={[-6, 1.9, -4.4]}>
						<meshStandardMaterial color="saddlebrown" />
					</Box>

					{/* Left Side Panel */}
					<Box args={[0.1, 3, 0.5]} position={[-6.95, 1.9, -4.1]}>
						<meshStandardMaterial color="saddlebrown" />
					</Box>

					{/* Right Side Panel */}
					<Box args={[0.1, 3, 0.5]} position={[-5, 1.9, -4.1]}>
						<meshStandardMaterial color="saddlebrown" />
					</Box>

					{/* Top Panel */}
					<Box args={[2, 0.1, 0.5]} position={[-6, 3.4, -4.1]}>
						<meshStandardMaterial color="saddlebrown" />
					</Box>

					{/* Bottom Panel */}
					<Box args={[2, 0.1, 0.5]} position={[-6, 0.4, -4.1]}>
						<meshStandardMaterial color="black" />
					</Box>

					{/* Shelves */}
					<Box args={[1.9, 0.1, 0.5]} position={[-6, 2.7, -4.1]}>
						<meshStandardMaterial color="black" />
					</Box>
					<Box args={[1.9, 0.1, 0.5]} position={[-6, 1.9, -4.1]}>
						<meshStandardMaterial color="black" />
					</Box>
					<Box args={[1.9, 0.1, 0.5]} position={[-6, 1.1, -4.1]}>
						<meshStandardMaterial color="black" />
					</Box>
				</RigidBody>
			</group>
		</>
	);
}

export default Bookshelf;
