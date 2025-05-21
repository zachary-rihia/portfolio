import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import PropTypes from "prop-types";

// The planes at the end that will raise from the ground when the player gets in range.
// Will have links attached for linkden, github and a pdf download of CV.
const FloatingPlane = ({ position }) => {
	return (
		<>
			<RigidBody type="fixed" colliders="cuboid">
				<Box args={[1, 1, 1]} position={position}>
					<meshStandardMaterial
						color="red"
						emissive="red"
						emissiveIntensity={3}
					/>
				</Box>
			</RigidBody>
		</>
	);
};

export default FloatingPlane;

FloatingPlane.propTypes = {
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
};
