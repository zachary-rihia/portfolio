import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useHasInteracted from "../../Hooks/useHasInteract";

// Builds a simple key-hint texture on canvas — no image assets needed,
// easy to restyle later, matches your pixel-font aesthetic
const buildHintTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "rgba(20, 20, 30, 0.85)";
  ctx.roundRect(0, 0, 512, 256, 20);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 4;
  ctx.roundRect(4, 4, 504, 248, 18);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 40px monospace";
  ctx.textAlign = "center";
  ctx.fillText("WASD", 256, 110);
  ctx.font = "24px monospace";
  ctx.fillText("Move", 256, 60);

  ctx.font = "bold 40px monospace";
  ctx.fillText("SPACE / E / F", 256, 210);
  ctx.font = "24px monospace";
  ctx.fillText("Interact", 256, 160);

  return new THREE.CanvasTexture(canvas);
};

const ControlsSign = ({ position = [0, 2, -28] }) => {
  const materialRef = useRef();
  const hasInteracted = useHasInteracted();
  const texture = useMemo(() => buildHintTexture(), []);

  useFrame(() => {
    if (!materialRef.current) return;
    const targetOpacity = hasInteracted ? 0 : 1;
    materialRef.current.opacity = THREE.MathUtils.lerp(
      materialRef.current.opacity,
      targetOpacity,
      0.05
    );
  });

  return (
    <mesh position={position} rotation={[-1, 0.3, 0.5]}>
      <planeGeometry args={[21, 21]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={1}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default ControlsSign;
