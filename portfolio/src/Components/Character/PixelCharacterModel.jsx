import { useRef, useMemo } from "react";
import { useTexture, Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FRAME_DURATION = 0.12;
const IDLE_FRAME_DURATION = 0.4;
const FRAME_COUNT = 6;

const DIRECTIONS = ["down", "left", "right", "up"];

// Now loads idle_down/left/right/up separately, instead of one generic idle set
const ALL_PATHS = [
  ...DIRECTIONS.flatMap((dir) =>
    Array.from({ length: FRAME_COUNT }, (_, i) => `/Textures/Character/idle_${dir}_${i + 1}.png`)
  ),
  ...DIRECTIONS.flatMap((dir) =>
    Array.from({ length: FRAME_COUNT }, (_, i) => `/Textures/Character/walk_${dir}_${i + 1}.png`)
  ),
];

const getDirection = (x, z) => {
  if (Math.abs(x) > Math.abs(z)) return x > 0 ? "right" : "left";
  return z > 0 ? "down" : "up";
};

const PixelCharacterModel = ({ isMoving, directionRef, width = 1.5, height = 1.5 }) => {
  const frameIndex = useRef(0);
  const frameTimer = useRef(0);
  // This persists across moving -> idle transitions since it's a ref,
  // not reset anywhere — it simply stops updating once movement stops,
  // which is exactly what "remember the last direction" needs
  const currentDirection = useRef("down");
  const meshRef = useRef();

  const loadedTextures = useTexture(ALL_PATHS);

  const textureMap = useMemo(() => {
    const map = {};
    ALL_PATHS.forEach((path, i) => {
      const tex = loadedTextures[i];
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      map[path] = tex;
    });
    return map;
  }, [loadedTextures]);

  useFrame((_, delta) => {
    // Only updates while actually moving — once movement stops, this simply
    // stops running, leaving currentDirection.current at whatever it last was
    if (isMoving && directionRef?.current) {
      const { x, z } = directionRef.current;
      if (Math.abs(x) > 0.01 || Math.abs(z) > 0.01) {
        currentDirection.current = getDirection(x, z);
      }
    }

    const duration = isMoving ? FRAME_DURATION : IDLE_FRAME_DURATION;
    frameTimer.current += delta;

    if (frameTimer.current >= duration) {
      frameTimer.current = 0;
      frameIndex.current = (frameIndex.current + 1) % FRAME_COUNT;
    }

    // Both branches now use currentDirection — idle picks up whatever
    // direction was last set while moving
    const path = isMoving
      ? `/Textures/Character/walk_${currentDirection.current}_${frameIndex.current + 1}.png`
      : `/Textures/Character/idle_${currentDirection.current}_${frameIndex.current + 1}.png`;

    if (meshRef.current) {
      meshRef.current.material.map = textureMap[path];
    }
  });

  return (
    <Billboard position={[0, height / 2, 0]} follow={true}>
      <mesh ref={meshRef}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={textureMap[ALL_PATHS[0]]}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </Billboard>
  );
};

export default PixelCharacterModel;
