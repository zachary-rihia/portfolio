import { useState, useEffect } from "react";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

import { useDialogue } from "../../../Context/DialogueProviderContext";
import dialogueData from "../../data/dialogue.json";

// Floor
import Floor from "../../Floor";

// Character
import Character from "../../Character/Character";

// Portal
import Portal from "../../Portal";

// Statues
import Statue from "./Statues/Statue";
import FloatingPlane from "./Statues/FloatingPlane";

const AboutMe = () => {
	// const [isLoaded, setIsLoaded] = useState(false);
	// const { camera } = useThree();
	const [activeDialogueNum, setActiveDialogueNum] = useState(null);
	const [insideHitbox, setInsideHitbox] = useState(false);
	const { isVisible, showDialogueOnce, hideDialogue } = useDialogue();

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
						position={[21, 1, 30]}
						sensor={true} // Ensures we detect collisions without physical interaction
						onIntersectionEnter={() => {
							setInsideHitbox(true), setActiveDialogueNum("statue1");
						}}
						onIntersectionExit={() => {
							setInsideHitbox(false), setActiveDialogueNum(null);
						}}
					/>
					<Statue
						statueArgs={[3, 6.6, 6.6]}
						plateArgs={[1, 1, 1]}
						position={[24, 1, 30]}
					/>
				</group>

				<group>
					<CuboidCollider
						args={[1.5, 2, 1.5]}
						position={[21, 1, 54]}
						sensor={true} // Ensures we detect collisions without physical interaction
						onIntersectionEnter={() => {
							setInsideHitbox(true), setActiveDialogueNum("statue2");
						}}
						onIntersectionExit={() => {
							setInsideHitbox(false),
								hideDialogue(),
								setActiveDialogueNum(null);
						}}
					/>
					<Statue
						statueArgs={[3, 6.6, 6.6]}
						plateArgs={[1, 1, 1]}
						position={[24, 1, 54]}
					/>
				</group>

				<group>
					<Statue
						statueArgs={[12, 2, 3]}
						plateArgs={[2, 2, 2]}
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
