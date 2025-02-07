import { Box } from "@react-three/drei";
import { useState } from "react";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { RigidBody } from "@react-three/rapier";


const Book = ({ position }) => {
	const [hovered, setHovered] = useState(false);
	const [selected, setSelected] = useState(false);
	const { camera } = useThree();

	// Zoom in on the book when selected
	const handleClick = () => {
		// setSelected(true);
		// const zoomPosition = new Vector3(position[0], position[1], position[2] + 1);
		// camera.position.lerp(zoomPosition, 0.2);
	};

	return (
		<RigidBody type="fixed" colliders="cuboid">
			<Box
				args={[0.15, 0.6, 0.4]} // Book dimensions
				position={position}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				onClick={handleClick}
			>
				<meshStandardMaterial color={hovered ? "lightblue" : "darkblue"} />
			</Box>
		</RigidBody>
	);
};

export default Book;
