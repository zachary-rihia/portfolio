import { useContext, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Capsule } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import PropTypes from "prop-types";

import { usePlayerControls } from "../../Hooks/usePlayerControls";
import CharacterPositionContext from "../../Context/CharacterPositionContext";
import CharacterModel from "../Character/CharacterModel";
import PixelCharacterModel from "./PixelCharacterModel";

const MOVE_SPEED = 21;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const cameraForward = new THREE.Vector3();
const cameraRight = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);

const ABOUT_ME_BOUNDS = {
  halfWidth: 24, // tune — should be a bit less than half your corridor width (50/2 = 25)
  minZ: -3, // tune to match your corridor's actual start/end in world space
  maxZ: 85,
};

const Character = ({ characterPOS, sceneName, disableMovement }) => {
  const playerRef = useRef();
  const directionRef = useRef({ x: 0, z: 0 });
  const { camera } = useThree();
  const { forward, backward, left, right } = usePlayerControls();
  const { setPosition } = useContext(CharacterPositionContext);
  const [isMoving, setIsMoving] = useState(false);

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
    if (sceneName === "About me") {
      camera.fov = 50; // narrower than default 75 — tighter framing
      camera.updateProjectionMatrix();
    }

    const handleKeyDown = (event) => {
      if (disableMovement) {
        event.preventDefault(); // Block movement inputs
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disableMovement, sceneName, camera]);

  // The hook is called on each frame of the animation. Inside this hook, the player's position and linear velocity are updated.
  useFrame(() => {
    if (!playerRef.current || disableMovement) return;

    // Ensure the character's position is a THREE.Vector3 object
    const characterPosition = new THREE.Vector3(
      playerRef.current.translation().x,
      playerRef.current.translation().y,
      playerRef.current.translation().z
    );

    if (sceneName === "About me") {
      const clampedX = THREE.MathUtils.clamp(
        characterPosition.x,
        -ABOUT_ME_BOUNDS.halfWidth,
        ABOUT_ME_BOUNDS.halfWidth
      );
      const clampedZ = THREE.MathUtils.clamp(
        characterPosition.z,
        ABOUT_ME_BOUNDS.minZ,
        ABOUT_ME_BOUNDS.maxZ
      );

      camera.position.set(clampedX, characterPosition.y + 18, clampedZ + 4);
      camera.lookAt(characterPosition); // still looks AT the real player position, just camera itself is clamped
    }

    // Update the camera's position to follow the character on Main scene
    if (sceneName === "Main") {
      camera.fov = 75;
      camera.updateProjectionMatrix();
      camera.position.set(
        characterPosition.x + 9, // Offset in the x-axis
        characterPosition.y + 18, // Offset in the y-axis
        characterPosition.z + 12 // Offset in the z-axis
      );

      // Make the camera look at the character
      camera.lookAt(characterPosition);
    }

    // ── Camera-relative movement ──────────────────────────────────────────
    // Step 1: Get the direction the camera is facing, flattened to ground plane
    camera.getWorldDirection(cameraForward);
    cameraForward.y = 0;
    cameraForward.normalize();

    // Step 2: Derive right vector — perpendicular to forward on the XZ plane
    cameraRight.crossVectors(cameraForward, UP).normalize();

    // Step 3: Build the movement vector from inputs using camera axes
    // 		   (not world axes — this is what was missing before)
    direction.set(0, 0, 0);
    if (forward) direction.add(cameraForward);
    if (backward) direction.sub(cameraForward);
    if (right) direction.add(cameraRight);
    if (left) direction.sub(cameraRight);
    // ─────────────────────────────────────────────────────────────────────

    const isActuallyMoving = direction.lengthSq() > 0;
    setIsMoving(isActuallyMoving);

    if (isActuallyMoving) {
      direction.normalize().multiplyScalar(MOVE_SPEED);
      // Only update facing direction when actually moving
      directionRef.current = { x: direction.x, z: direction.z };
    }

    const velocity = playerRef.current.linvel();
    playerRef.current.wakeUp();

    const playerPOS = playerRef.current.setLinvel({
      x: direction.x,
      y: velocity.y,
      z: direction.z,
    });

    setPosition(playerPOS);
  });

  return (
    <group>
      <RigidBody ref={playerRef} position={characterPOS} colliders={false} lockRotations>
        <CapsuleCollider args={[0.8, 0.5]} position={[0, 0.25, 0]} />

        {sceneName === "About me" ? (
          <PixelCharacterModel isMoving={isMoving} directionRef={directionRef} />
        ) : (
          <CharacterModel isMoving={isMoving} directionRef={directionRef} />
        )}
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
