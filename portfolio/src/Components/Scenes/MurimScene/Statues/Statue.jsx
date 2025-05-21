import { useState, useEffect } from "react";
import { Box } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import PropTypes from "prop-types";

const Statue = ({ statueArgs, plateArgs, position }) => {

	return (
		<>
			<group>
				<RigidBody type="fixed" colliders="cuboid">
					<Box args={statueArgs} position={position}></Box>
					<Box
						args={plateArgs}
						position={[position[0] - 3, position[1], position[2]]}
					></Box>
				</RigidBody>
			</group>
		</>
	);
};

export default Statue;

Statue.propTypes = {
	statueArgs: PropTypes.arrayOf(PropTypes.number).isRequired,
	plateArgs: PropTypes.arrayOf(PropTypes.number).isRequired,
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
};
