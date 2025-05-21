import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import PropTypes from "prop-types";

const Statue = ({ statueArgs, position }) => {

	return (
		<>
			<group>
				<RigidBody type="fixed" colliders="cuboid">
					<Box args={statueArgs} position={position}></Box>
				</RigidBody>
			</group>
		</>
	);
};

export default Statue;

Statue.propTypes = {
	statueArgs: PropTypes.arrayOf(PropTypes.number).isRequired,
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
};
