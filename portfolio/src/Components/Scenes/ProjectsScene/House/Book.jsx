import { Box } from "@react-three/drei";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { RigidBody } from "@react-three/rapier";

const Book = ({ position, isSelected, onSelect, camera }) => {
	const [hovered, setHovered] = useState(false);
	const [currentPosition, setCurrentPosition] = useState(new Vector3(...position));

	useFrame(() => {
		const targetPosition = isSelected
			? new Vector3(camera.position.x, camera.position.y - 0.15, camera.position.z - 1) // Center in view
			: new Vector3(...position); // Return to original position

		setCurrentPosition((prev) => prev.lerp(targetPosition, 0.1));
	});

	// Determine book size
	const bookSize = isSelected ? [, 0.6, 0.6] : [0.15, 0.6, 0.4];

	return (
		<RigidBody type="fixed" colliders="cuboid">
			<Box
				args={bookSize}
				position={currentPosition.toArray()}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				onClick={onSelect}
			>
				<meshStandardMaterial color={hovered ? "lightblue" : "darkblue"} />
			</Box>
		</RigidBody>
	);
};

export default Book;
