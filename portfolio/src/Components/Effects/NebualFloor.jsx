import { useRef, useMemo, useContext } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CharacterPositionContext from "../../Context/CharacterPositionContext";

const PARTICLE_COUNT = 2100;
const SPREAD = 270;
const HEIGHT_RANGE = 12;
const INTERACTION_RADIUS = 5;
const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
const PUSH_STRENGTH = 0.3;
const SPRING = 0.015; // how quickly particles drift back
const DAMPING = 3; // smooths out velocity so movement feels floaty

// Muted pastels — mix each colour with white so they read as mist, not lights
const NEBULA_COLORS = [
  new THREE.Color("#E8A5F9"),
  new THREE.Color("#6FC4F5"),
  new THREE.Color("#F3F673"),
  new THREE.Color("#F0FFF4"),
  new THREE.Color("#FFB3D9"),
  new THREE.Color("#B3FFE6"),
];

const NebulaFloor = () => {
  const pointsRef = useRef();
  const { position } = useContext(CharacterPositionContext);

  const particles = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const originalPos = new Float32Array(PARTICLE_COUNT * 3);
    const velX = new Float32Array(PARTICLE_COUNT);
    const velZ = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD;
      const y = Math.random() * HEIGHT_RANGE;
      const z = (Math.random() - 0.5) * SPREAD;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      originalPos[i * 3] = x;
      originalPos[i * 3 + 1] = y;
      originalPos[i * 3 + 2] = z;

      const base = NEBULA_COLORS[Math.floor(Math.random() * NEBULA_COLORS.length)];

      // Mix 50% toward white — turns vivid colours into soft pastels
      // This is what stops Bloom treating them as light sources
      colors[i * 3] = base.r * 0.5 + 0.5;
      colors[i * 3 + 1] = base.g * 0.5 + 0.5;
      colors[i * 3 + 2] = base.b * 0.5 + 0.5;

      phases[i] = Math.random() * Math.PI * 2;
    }

    return { pos, colors, originalPos, velX, velZ, phases };
  }, []);

  // Softer gradient — longer tail so the edge fully disappears
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.2, "rgba(255,255,255,0.6)");
    g.addColorStop(0.5, "rgba(255,255,255,0.2)");
    g.addColorStop(1, "rgba(255,255,255,0)"); // fully transparent edge
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const { pos, originalPos, velX, velZ, phases } = particles;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const time = clock.getElapsedTime();

    const playerX = position?.x ?? 0;
    const playerZ = position?.z ?? 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const dx = pos[idx] - playerX;
      const dz = pos[idx + 2] - playerZ;

      if (Math.abs(dx) < INTERACTION_RADIUS && Math.abs(dz) < INTERACTION_RADIUS) {
        const distSq = dx * dx + dz * dz;
        if (distSq < INTERACTION_RADIUS_SQ && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = ((INTERACTION_RADIUS - dist) / INTERACTION_RADIUS) * PUSH_STRENGTH;
          velX[i] += (dx / dist) * force;
          velZ[i] += (dz / dist) * force;
        }
      }

      velX[i] += (originalPos[idx] - pos[idx]) * SPRING;
      velZ[i] += (originalPos[idx + 2] - pos[idx + 2]) * SPRING;
      velX[i] *= DAMPING;
      velZ[i] *= DAMPING;

      pos[idx] += velX[i];
      pos[idx + 2] += velZ[i];

      // Very subtle Y bob — barely lifts off the floor
      pos[idx + 1] = originalPos[idx + 1] + Math.sin(time * 0.4 + phases[i]) * 0.3;
    }

    posAttr.array.set(pos);
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={particles.pos}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.0} // was 2.5 — much smaller
        vertexColors
        transparent
        opacity={0.5}
        map={texture}
        depthWrite={false}
        blending={THREE.NormalBlending} // ← the main fix, no more bloom amplification
        sizeAttenuation
        alphaTest={0.01} // discards near-invisible fragments cheaply
      />
    </points>
  );
};

export default NebulaFloor;
