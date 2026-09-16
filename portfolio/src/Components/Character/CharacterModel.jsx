import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

useGLTF.preload("/Models/Character/Character.glb");

/** Animation array
 * {"NlaTrack" : "Walk",
 * "NlaTrack.001" : "Sitting",
 * "NlaTrack.002" : "Idle",
 * "NlaTrack.003" : "no clue but could be jump",
 * "NlaTrack.004" : "Run",
 * "NlaTrack.005" : "Idle 2, Look around",
 * "NlaTrack.006" : "Turn, a bit janky looking" }
 */

// All idle clips
const IDLE_CLIPS = ["NlaTrack.002", "NlaTrack.005"];

// How long (in seconds) before the idle switches
const COOLDOWN_MIN = 6;
const COOLDOWN_MAX = 14;

const randomCooldown = () => Math.random() * (COOLDOWN_MAX - COOLDOWN_MIN) + COOLDOWN_MIN;

const CharacterModel = ({ isMoving, directionRef }) => {
  const group = useRef();

  // useGLTF handles loading, caching, and cleanup automatically
  const { scene, animations } = useGLTF("/Models/Character/Character.glb");

  // useAnimations wires up the AnimationMixer for you
  const { actions } = useAnimations(animations, group);

  // --- Rotation state ---
  const targetYRotation = useRef(0);

  // --- Idle cycling state (all refs — no re-renders) ---
  const currentClip = useRef(null); // name of what's currently playing
  const idleIndex = useRef(0); // which idle we're on
  const idleTimer = useRef(randomCooldown()); // countdown in seconds

  // Plays a new animation with crossfade, skips if already playing
  const playClip = (clipName) => {
    if (!actions[clipName] || currentClip.current === clipName) return;

    // Fade out everything else
    Object.values(actions).forEach((a) => a.fadeOut(0.25));

    // Fade in the new clip
    actions[clipName].reset().fadeIn(0.25).play();
    currentClip.current = clipName;
  };

  useFrame((_, delta) => {
    if (!group.current) return;

    // -------------------------------------------------------
    // 1. FACING DIRECTION
    // -------------------------------------------------------
    if (isMoving && directionRef?.current) {
      const { x, z } = directionRef.current;

      if (Math.abs(x) > 0.01 || Math.abs(z) > 0.01) {
        targetYRotation.current = Math.atan2(x, z) + -Math.PI / 2;
      }
    }

    // Smooth rotation with wrap-around handled correctly
    let angleDiff = targetYRotation.current - group.current.rotation.y;
    // Clamp to [-PI, PI] so it always takes the shortest arc
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    group.current.rotation.y += angleDiff * 0.12; // 0.12 = turn speed, tune this

    // -------------------------------------------------------
    // 2. ANIMATION STATE MACHINE
    // -------------------------------------------------------
    // if (isJumping) {
    //   playClip("NlaTrack.003");
    //   return;
    // }

    if (isMoving) {
      // Reset idle timer so we get a full cooldown after stopping
      idleTimer.current = randomCooldown();
      playClip("NlaTrack.004"); // Run
      return;
    }

    // -------------------------------------------------------
    // 3. IDLE CYCLING WITH COOLDOWN
    // -------------------------------------------------------
    idleTimer.current -= delta; // delta is in seconds

    if (idleTimer.current <= 0) {
      // Advance to next idle clip, wrapping around
      idleIndex.current = (idleIndex.current + 1) % IDLE_CLIPS.length;
      idleTimer.current = randomCooldown(); // fresh cooldown
    }

    playClip(IDLE_CLIPS[idleIndex.current]);
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={3} position={[0, -1, 0]} offset={[0, 0, 0]} />
    </group>
  );
};

export default CharacterModel;
