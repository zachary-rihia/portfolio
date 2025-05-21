import { useState, useEffect } from "react";
import { Physics, CuboidCollider } from "@react-three/rapier";

import { useDialogue } from "../../../Context/DialogueProviderContext";
import dialogueData from "../../data/statueDialogue.json";

// Floor
import Floor from "../../Floor";

// Character
import Character from "../../Character/Character";

// Portal
import Portal from "../../Portal";

// Statues
import Statue from "./Statues/Statue";
import FloatingPlane from "./Statues/FloatingPlane";

// Bug where the pathfinder hitbox is being read as soon as you go in.
// A little fix is that you have to interact with any statue.
// Other than that I'm not too sure.
const AboutMe = () => {
	// const [isLoaded, setIsLoaded] = useState(false);
	// const { camera } = useThree();
	const [activeDialogueNum, setActiveDialogueNum] = useState(null);
	const [insideHitbox, setInsideHitbox] = useState(false);
	const { isVisible, showDialogueOnce, hideDialogue } = useDialogue();

	const statueArgs = [3, 6.6, 6.6];

	// const handleLoadComplete = () => {
	// 	setIsLoaded(true);
	// };

	useEffect(() => {
		if (!insideHitbox) return;

		const handleKeyDown = (e) => {
			const linesForID = dialogueData?.[activeDialogueNum] ?? [];
			if (insideHitbox) {
				if (!isVisible && [" ", "e", "f"].includes(e.key)) {
					if (!activeDialogueNum) return;
					showDialogueOnce(activeDialogueNum, linesForID);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [insideHitbox, activeDialogueNum]);

	return (
		<>
			<Physics gravity={[0, -9.81, 0]} debug>
				<Floor />
				<Character
					characterPOS={[1, 1, 1]}
					sceneName="About me"
					disableMovement={isVisible}
				/>

				<Portal
					args={[1, 1.8, 0.3]}
					position={[1, 3, -3]}
					portalName={"Main"}
				/>

				<group>
					<CuboidCollider
						args={[1.5, 2, 1.5]}
						position={[21, 1, 21]}
						sensor={true} // Ensures we detect collisions without physical interaction
						onIntersectionEnter={() => {
							setInsideHitbox(true), setActiveDialogueNum("architect");
						}}
						onIntersectionExit={() => {
							setInsideHitbox(false), setActiveDialogueNum(null);
						}}
					/>
					<Statue
						statueArgs={statueArgs}
						position={[24, 1, 21]}
					/>
				</group>

				<group>
					<CuboidCollider
						args={[1.5, 2, 1.5]}
						position={[-21, 1, 21]}
						sensor={true} // Ensures we detect collisions without physical interaction
						onIntersectionEnter={() => {
							setInsideHitbox(true), setActiveDialogueNum("chronicler");
						}}
						onIntersectionExit={() => {
							setInsideHitbox(false), setActiveDialogueNum(null);
						}}
					/>
					<Statue
						statueArgs={statueArgs}
						position={[-24, 1, 21]}
					/>
				</group>

				<group>
					<CuboidCollider
						args={[1.5, 2, 1.5]}
						position={[21, 1, 45]}
						sensor={true} // Ensures we detect collisions without physical interaction
						onIntersectionEnter={() => {
							setInsideHitbox(true), setActiveDialogueNum("seeker");
						}}
						onIntersectionExit={() => {
							setInsideHitbox(false),
								hideDialogue(),
								setActiveDialogueNum(null);
						}}
					/>
					<Statue
						statueArgs={statueArgs}
						position={[24, 1, 45]}
					/>
				</group>

				<group>
					<CuboidCollider
						args={[1.5, 2, 1.5]}
						position={[-21, 1, 45]}
						sensor={true} // Ensures we detect collisions without physical interaction
						onIntersectionEnter={() => {
							setInsideHitbox(true), setActiveDialogueNum("duelist");
						}}
						onIntersectionExit={() => {
							setInsideHitbox(false),
								hideDialogue(),
								setActiveDialogueNum(null);
						}}
					/>
					<Statue
						statueArgs={statueArgs}
						position={[-24, 1, 45]}
					/>
				</group>

				<group>
					<CuboidCollider
						args={[1.5, 2, 1.5]}
						position={[21, 1, 69]}
						sensor={true} // Ensures we detect collisions without physical interaction
						onIntersectionEnter={() => {
							setInsideHitbox(true), setActiveDialogueNum("dreamsmith");
						}}
						onIntersectionExit={() => {
							setInsideHitbox(false),
								hideDialogue(),
								setActiveDialogueNum(null);
						}}
					/>
					<Statue
						statueArgs={statueArgs}
						position={[24, 1, 69]}
					/>
				</group>

				<group>
					<CuboidCollider
						args={[1.5, 2, 1.5]}
						position={[-21, 1, 69]}
						sensor={true} // Ensures we detect collisions without physical interaction
						onIntersectionEnter={() => {
							setInsideHitbox(true), setActiveDialogueNum("pathfinder");
						}}
						onIntersectionExit={() => {
							setInsideHitbox(false),
								hideDialogue(),
								setActiveDialogueNum(null);
						}}
					/>
					<Statue
						statueArgs={statueArgs}
						position={[-24, 1, 69]}
					/>
				</group>

				<group>
					<Statue
						statueArgs={[12, 2, 3]}
						position={[1, 1, 81]}
					/>

					<FloatingPlane position={[5, 2, 78]} />
					<FloatingPlane position={[1, 2, 78]} />
					<FloatingPlane position={[-3, 2, 78]} />
				</group>
			</Physics>
		</>
	);
};

export default AboutMe;
