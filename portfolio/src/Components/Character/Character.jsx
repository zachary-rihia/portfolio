import { useContext, useRef, useEffect } from "react";
import * as THREE from "three";
import { Capsule } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import PropTypes from "prop-types";

import { usePlayerControls } from "../../Hooks/usePlayerControls";
import CharacterPositionContext from "../../Context/CharacterPositionContext";

const MOVE_SPEED = 21;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

const Character = ({ characterPOS, sceneName, disableMovement }) => {
	const playerRef = useRef();
	const { camera } = useThree();
	const { forward, backward, left, right, jump } = usePlayerControls();
	const { setPosition } = useContext(CharacterPositionContext);

	useEffect(() => {
		// const handleWheel = (event) => {
		//   // Adjust the camera's FOV based on the scroll direction
		//   camera.fov = Math.min(Math.max(camera.fov - event.deltaY * 0.05, 15), 75);
		//   camera.updateProjectionMatrix();
		// };

		// // Add the wheel event listener to the window
		// window.addEventListener("wheel", handleWheel);

		// // Clean up the event listener when the component unmounts
		// return () => {
		//   window.removeEventListener("wheel", handleWheel);
		// };

		const handleKeyDown = (event) => {
			if (disableMovement) {
				event.preventDefault(); // Block movement inputs
			}
		};
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [disableMovement]);

	// The hook is called on each frame of the animation. Inside this hook, the player's position and linear velocity are updated.
	useFrame(() => {
		if (!playerRef.current || disableMovement) return;

		// Ensure the character's position is a THREE.Vector3 object
		const characterPosition = new THREE.Vector3(
			playerRef.current.translation().x,
			playerRef.current.translation().y,
			playerRef.current.translation().z
		);

		// Update the camera's position to follow the character on About me scene
		// Cam should be top down view, like in an 8bit game
		if (sceneName === "About me") {
			camera.position.set(
				characterPosition.x,
				characterPosition.y + 24, // Offset in the y-axis
				characterPosition.z + 6 // Offset in the z-axis
			);
			
			// Make the camera look at the character
			camera.lookAt(characterPosition);
		}

		// Update the camera's position to follow the character on Main scene
		if (sceneName === "Main") {
			camera.position.set(
				characterPosition.x + 9, // Offset in the x-axis
				characterPosition.y + 18, // Offset in the y-axis
				characterPosition.z + 12 // Offset in the z-axis
			);

			// Make the camera look at the character
			camera.lookAt(characterPosition);
		}

		// Get the current linear velocity of the player.
		const velocity = playerRef.current.linvel();

		// Set the forward/backward motion vector based on the pressed buttons.
		frontVector.set(0, 0, backward - forward);

		// Set the left/right movement vector.
		sideVector.set(left - right, 0, 0);

		/* Calculate the final vector of player movement by subtracting the movement vectors, 
    normalising the result (so that the vector length is 1) and multiplying by the movement speed constant. */
		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(MOVE_SPEED);

		/* "Wakes up" the player object to make sure it reacts to changes. 
    If you don't use this method, after some time the object will "sleep" and will not react to position changes. */
		playerRef.current.wakeUp();

		/* Set the player's new linear velocity based on the calculated direction of movement 
    and keep the current vertical velocity (so as not to affect jumps or falls). */
		const playerPOS = playerRef.current.setLinvel({
			x: direction.x,
			y: velocity.y,
			z: direction.z,
		});

		setPosition(playerPOS);
	});

	return (
		<group visible={!disableMovement}>
			<RigidBody ref={playerRef} position={characterPOS}>
				<CapsuleCollider args={[0.8, 0.4]} />
				<Capsule></Capsule>
			</RigidBody>
		</group>
	);
};

Character.propTypes = {
	characterPOS: PropTypes.arrayOf(PropTypes.number).isRequired,
	sceneName: PropTypes.string.isRequired,
	disableMovement: PropTypes.bool,
};

export default Character;
