import { useMemo } from "react";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { NEBULA_CLOUDS, STAR_FIELD, NEBULA_TEXTURE } from "../../../Configs/nebulaConfig";

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
};

const buildNebulaTexture = () => {
  const { width, height, baseColor, speckleCount, speckleOpacity, speckleMaxRadius } =
    NEBULA_TEXTURE;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Deep space base
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  // Paint nebula clouds from config
  NEBULA_CLOUDS.forEach(({ x, y, radius, color, alpha }) => {
    const [r, g, b] = hexToRgb(color);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
    gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`);
    gradient.addColorStop(0.75, `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  });

  // Distant star cluster speckles
  ctx.fillStyle = `rgba(255, 255, 255, ${speckleOpacity})`;
  for (let i = 0; i < speckleCount; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * width,
      Math.random() * height,
      Math.random() * speckleMaxRadius,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return texture;
};

const Background = () => {
  const nebulaTexture = useMemo(() => buildNebulaTexture(), []);

  return (
    <>
      <Stars
        radius={STAR_FIELD.radius}
        depth={STAR_FIELD.depth}
        count={STAR_FIELD.count}
        factor={STAR_FIELD.factor}
        saturation={STAR_FIELD.saturation}
        fade
        speed={STAR_FIELD.speed}
      />

      <mesh renderOrder={-1}>
        <sphereGeometry args={[450, 48, 48]} />
        <meshBasicMaterial
          map={nebulaTexture}
          side={THREE.BackSide}
          depthWrite={false}
          fog={false}
        />
      </mesh>
    </>
  );
};

export default Background;
