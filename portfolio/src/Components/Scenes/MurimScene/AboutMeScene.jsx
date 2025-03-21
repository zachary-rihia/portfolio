import { useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

// Floor
import Floor from "../../Floor";

// Character
import Character from "../../Character/Character";
import { Vector3 } from "three";

// Portal
import Portal from "../../Portal";

// Statues
import Statue from "./Statues/Statue";

const AboutMe = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const { camera } = useThree();
	
	// const handleLoadComplete = () => {
	// 	setIsLoaded(true);
	// };

	return (
		<>
			<Physics gravity={[0, -9.81, 0]} debug>
				<Floor />
				<Character
					characterPOS={[1, 1, 1]}
					sceneName="About me"
					disableMovement={false}
				/>

				<Statue position={[33, 1, -18]} />
			</Physics>
		</>
	);
};

export default AboutMe;
