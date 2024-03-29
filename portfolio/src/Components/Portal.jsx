import { useContext } from "react";
import { Cylinder } from "@react-three/drei";
import PropTypes from "prop-types";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

import { SceneContext } from "../Context/SceneProviderContext";

const Portal = ({ position, portalName }) => {
  const { setCurrentScene } = useContext(SceneContext);

  return (
    <group>
      <RigidBody type="fixed">
        <CuboidCollider
          args={[1, 1, 1]}
          position={[position[0], position[1] - 1.8, position[2] + 2]}
          onCollisionEnter={() => {
            setCurrentScene(portalName);
          }}
        />
        <Cylinder args={[3, 3, 6]} position={position}>
          <meshPhongMaterial color="#78BDF5" />
        </Cylinder>
      </RigidBody>
    </group>
  );
};

Portal.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  portalName: PropTypes.string.isRequired,
};

export default Portal;
