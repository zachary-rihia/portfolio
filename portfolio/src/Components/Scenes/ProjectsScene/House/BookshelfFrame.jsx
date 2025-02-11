import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const BookshelfFrame = ({ position }) => {
	return (
		<>
			<group position={ position }>
				<RigidBody type="fixed" colliders="cuboid">
					{/* Bookshelf Frame */}
					<Box args={[2.7, 4, 0.2]} position={[-6, 1.9, -4.4]}>
						<meshStandardMaterial color="saddlebrown" />
					</Box>

					{/* Left Side Panel */}
					<Box args={[0.1, 4, 0.5]} position={[-7.3, 1.9, -4.1]}>
						<meshStandardMaterial color="saddlebrown" />
					</Box>

					{/* Right Side Panel */}
					<Box args={[0.1, 4, 0.5]} position={[-4.7, 1.9, -4.1]}>
						<meshStandardMaterial color="saddlebrown" />
					</Box>

					{/* Top Panel */}
					<Box args={[2.7, 0.1, 0.5]} position={[-6, 3.9, -4.1]}>
						<meshStandardMaterial color="saddlebrown" />
					</Box>

					{/* Bottom Panel */}
					<Box args={[2.5, 0.1, 0.5]} position={[-6, 0.01, -4.1]}>
						<meshStandardMaterial color="black" />
					</Box>

					{/* Shelves */}
					<Box args={[2.5, 0.1, 0.5]} position={[-6, 3.2, -4.1]}>
						<meshStandardMaterial color="black" />
					</Box>
					<Box args={[2.5, 0.1, 0.5]} position={[-6, 2.4, -4.1]}>
						<meshStandardMaterial color="black" />
					</Box>
					<Box args={[2.5, 0.1, 0.5]} position={[-6, 1.6, -4.1]}>
						<meshStandardMaterial color="black" />
					</Box>
					<Box args={[2.5, 0.1, 0.5]} position={[-6, 0.8, -4.1]}>
						<meshStandardMaterial color="black" />
					</Box>
				</RigidBody>
			</group>
		</>
	);
}

export default BookshelfFrame;
