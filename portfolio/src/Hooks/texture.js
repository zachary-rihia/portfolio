import { useEffect } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const useRepeatingTexture = (path, repeatX = 1, repeatY = 1) => {
  const texture = useTexture(path);

  useEffect(() => {
    if (!texture) return;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.needsUpdate = true;
  }, [texture, repeatX, repeatY]);

  return texture;
};

export default useRepeatingTexture;
