import { useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

// Floor
import Floor from "../../Floor";

// Main Scene
import Star from "../MainScene/Star";

//House Objects
import House from "./House/House";

// Character
import Character from "../../Character/Character";
import { Vector3 } from "three";

const ProjectsScene = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const { camera } = useThree();
	const [isFocused, setIsFocused] = useState(false);
	const [insideHitbox, setInsideHitbox] = useState(false); // Track if the character is inside the hitbox
	const [hideCharacter, setHideCharacter] = useState(false); // Track character visibility
	const [disableMovement, setDisableMovement] = useState(false); // Disable movement
	const [characterPosition, setCharacterPosition] = useState(
		new Vector3(-6, 1.8, 2)
	);

	// Define positions as Vector3 objects
	const initialCameraPosition = new Vector3(-0.1, 3.6, 7.8);
	const initialLookAtPosition = new Vector3(0, 3.3, 0);
	const bookshelfPosition = new Vector3(-5.7, 2.5, -4.1);
	const bookshelfCamPosition = new Vector3(-5.7, 2.8, -1);

	const handleLoadComplete = () => {
		setIsLoaded(true);
	};

	// Function to toggle focus on click (only if inside hitbox)
	const handleKeyDown = (event) => {
		if (
			insideHitbox &&
			(event.key === " " || event.key === "e" || event.key === "f")
		) {
			setIsFocused((prev) => {
				const newFocusState = !prev;

				// Set character POS for bookshelf zoom out
				setCharacterPosition(new Vector3(-5.7, 2.7, -1)); // (Temp placement)

				// Hide character and disable movement when zoomed in
				setHideCharacter(newFocusState);
				setDisableMovement(newFocusState);

				return newFocusState;
			});
		}
	};

	// Effect to listen for clicks
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [insideHitbox]);

	useFrame(() => {
		if (isFocused) {
			// Smooth transition to bookshelf view
			camera.position.lerp(bookshelfCamPosition, 0.03);
			camera.lookAt(bookshelfPosition);
		} else {
			// Smooth transition back to the original position
			camera.position.lerp(initialCameraPosition, 0.03);
			camera.lookAt(initialLookAtPosition);
		}
	});

	const adjustCam = () => {
		setIsFocused(true);
		if (isFocused) {
			camera.position.lerp(-5.7, 2.8, -1, 0.05); // Smooth transition to bookshelf view
			camera.lookAt(-5.7, 2.5, -4.1); // Focus on bookshelf
		} else {
			// Smooth transition back to the original position
			camera.position.lerp(initialCameraPosition, 0.05);
			camera.lookAt(initialLookAtPosition);
		}
	};

	// Toggle focus state
	const toggleFocus = () => {
		setIsFocused((prev) => !prev); // Toggle focus
	};

	return (
		<>
			<Physics gravity={[0, -9.81, 0]} debug>
				<Floor />
				<House isFocused={isFocused} />
				{!hideCharacter && (
					<Character
						characterPOS={characterPosition.toArray()}
						sceneName="projectsScene"
						disableMovement={disableMovement}
					/>
				)}

				<CuboidCollider
					args={[1, 1, 1]}
					position={bookshelfPosition}
					onCollisionEnter={() => setInsideHitbox(true)}
					onCollisionExit={() => setInsideHitbox(false)}
				/>

				<Star
					starPosition={[21, 9, -10]}
					colour={"yellow"}
					text={""}
					godrays={true}
					portal={false}
				/>
			</Physics>
		</>
	);
};

//-7.5, 1.5, 2
export default ProjectsScene;
