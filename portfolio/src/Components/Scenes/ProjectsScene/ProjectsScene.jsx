import { useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Physics, CuboidCollider } from "@react-three/rapier";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Floor
import Floor from "../../Flooring/Floor";

//House Objects
import House from "./House/House";

// Character
import Character from "../../Character/Character";
import { Vector3 } from "three";

const ProjectsScene = () => {
  const { camera } = useThree();
  const [isFocused, setIsFocused] = useState(false);
  const [insideHitbox, setInsideHitbox] = useState(false); // Track if the character is inside the hitbox
  const [hideCharacter, setHideCharacter] = useState(false); // Track character visibility
  const [disableMovement, setDisableMovement] = useState(false); // Disable movement
  const [characterPosition, setCharacterPosition] = useState(new Vector3(-6, 1.8, 2));

  // Define positions as Vector3 objects
  const initialCameraPosition = new Vector3(-0.1, 3.6, 7.8);
  const initialLookAtPosition = new Vector3(0, 3.3, 0);
  const bookshelfPosition = new Vector3(-5.7, 2.5, -4.1);
  const bookshelfCamPosition = new Vector3(-5.7, 2.8, -1);

  // const handleLoadComplete = () => {
  // 	setIsLoaded(true);
  // };

  // Function to toggle focus on click (only if inside hitbox)
  const handleKeyDown = (event) => {
    if (insideHitbox && [" ", "e", "f"].includes(event.key)) {
      setIsFocused((prev) => {
        const newFocusState = !prev;

        // Set character POS for bookshelf zoom out
        setCharacterPosition(new Vector3(-5.7, 2.7, -2.4)); // (Temp placement)

        // Hide character and disable movement when zoomed in
        setHideCharacter(newFocusState);
        setDisableMovement(newFocusState);
        setInsideHitbox(newFocusState);

        return newFocusState;
      });
    }
  };

  // Effect to listen for clicks
  useEffect(() => {
    camera.position.copy(initialCameraPosition);
    camera.lookAt(initialLookAtPosition);
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

  return (
    <>
      <EffectComposer>
        <Bloom kernelSize={5} luminanceThreshold={0.4} luminanceSmoothing={0.6} intensity={1} />
      </EffectComposer>
      <Physics gravity={[0, -9.81, 0]}>
        <Floor />
        <House isFocused={isFocused} />
        {!hideCharacter && (
          <Character
            characterPOS={characterPosition.toArray()}
            sceneName="Projects"
            disableMovement={disableMovement}
          />
        )}

        <CuboidCollider
          args={[1.5, 2, 1.5]}
          position={bookshelfPosition}
          sensor={true} // Ensures we detect collisions without physical interaction
          onIntersectionEnter={() => setInsideHitbox(true)}
          onIntersectionExit={() => setInsideHitbox(false)}
        />
      </Physics>
    </>
  );
};

//-7.5, 1.5, 2
export default ProjectsScene;
