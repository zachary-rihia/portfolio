import { Box, Cylinder, Torus } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import PropTypes from "prop-types";

const Statue = ({ position }) => {
	return (
		<>
			<group>
				<RigidBody type="fixed" colliders="cuboid">
					<Box args={[6, 6, 3]} position={position}></Box>
				</RigidBody>
			</group>
		</>
	);
};

export default Statue;

Statue.propTypes = {
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
};
