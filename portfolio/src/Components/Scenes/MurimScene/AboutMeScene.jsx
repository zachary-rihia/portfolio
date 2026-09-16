import { useState, useEffect } from "react";
import { Physics, CuboidCollider } from "@react-three/rapier";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { useDialogue } from "../../../Context/DialogueProviderContext";
import { STATUES, STATUE_ARGS, HITBOX_ARGS, END_STATUE } from "../../../data/statueData";
import useInteract from "../../../Hooks/useInteract";

import Floor from "./Enviroment/Floor";
import BoundaryWalls from "./Enviroment/BoundryWalls";
import ForestBoundary from "./Enviroment/ForestBoundary";
import GreenPlane from "./Enviroment/GreenPlane";

import Character from "../../Character/Character";
import Portal from "../../Portal/Portal";
import Statue from "./Statues/Statue";
import FloatingPlane from "./Statues/FloatingPlane";

const AboutMe = () => {
  const [activeDialogueNum, setActiveDialogueNum] = useState(null);
  const [insideHitbox, setInsideHitbox] = useState(false);
  const { isVisible, showDialogueOnce, hideDialogue } = useDialogue();

  useInteract(() => {
    if (insideHitbox && activeDialogueNum) {
      const activeStatue = STATUES.find((s) => s.id === activeDialogueNum);
      if (activeStatue && !isVisible) {
        showDialogueOnce(activeStatue.id, activeStatue.dialogue ?? []);
      }
    }
  }, insideHitbox);

  return (
    <>
      <EffectComposer>
        <Bloom kernelSize={5} luminanceThreshold={0.4} luminanceSmoothing={0.6} intensity={1} />
      </EffectComposer>
      <Physics gravity={[0, -9.81, 0]}>
        <Floor
          texturePath="/Textures/aboutMeGround.png"
          position={[0, 0, 40]}
          worldWidth={50}
          worldDepth={90}
          flipZ={true}
        />
        <GreenPlane position={[0, -0.1, 40]} size={300} />

        <Character characterPOS={[1, 1, 79]} sceneName="About me" disableMovement={isVisible} />
        <Portal args={[1, 1.8, 0.3]} position={[0, 3, 81]} portalName={"PixelPortal"} />

        <group position={[0, 0, 40]}>
          <BoundaryWalls width={50} depth={90} />
          <ForestBoundary width={50} depth={90} />
        </group>

        {/* Every statue rendered from one array — add/remove/reposition by editing statuesConfig.js only */}
        {STATUES.map((statue) => (
          <group key={statue.id}>
            <CuboidCollider
              args={HITBOX_ARGS}
              position={statue.hitboxPosition}
              sensor={true}
              onIntersectionEnter={() => {
                setInsideHitbox(true);
                setActiveDialogueNum(statue.id);
              }}
              onIntersectionExit={() => {
                setInsideHitbox(false);
                hideDialogue();
                setActiveDialogueNum(null);
              }}
            />
            <Statue
              statueArgs={STATUE_ARGS}
              position={statue.position}
              texturePath={statue.texturePath}
              spriteWidth={statue.spriteWidth}
              spriteHeight={statue.spriteHeight}
            />
          </group>
        ))}

        <group>
          <Statue
            statueArgs={END_STATUE.args}
            position={END_STATUE.position}
            texturePath={END_STATUE.texturePath}
            spriteWidth={END_STATUE.spriteWidth}
            spriteHeight={END_STATUE.spriteHeight}
          />
          <FloatingPlane
            position={[0, 2, 3]}
            texturePath="/Textures/runeSymbol4.png"
            url="https://github.com/zachary-rihia"
          />
          <FloatingPlane
            position={[4, 2, 3]}
            texturePath="/Textures/runeSymbol3.png"
            url="https://linkedin.com/in/zachary-rihia"
          />
          <FloatingPlane
            position={[-4, 2, 3]}
            texturePath="/Textures/runeSymbol1.png"
            url="/Documents/YourName_CV.pdf"
            download={true}
          />
        </group>
      </Physics>
    </>
  );
};

export default AboutMe;
