import { RigidBody, CuboidCollider } from "@react-three/rapier";
import PropTypes from "prop-types";

// One invisible collider per side of the play area — cheap, reliable,
// completely decoupled from how the tree sprites are visually arranged
const BoundaryWalls = ({ width, depth, wallThickness = 2, wallHeight = 10 }) => {
  const halfW = width / 2;
  const halfD = depth / 2;

  return (
    <RigidBody type="fixed">
      {/* North wall */}
      <CuboidCollider args={[halfW, wallHeight, wallThickness]} position={[0, wallHeight, halfD]} />
      {/* South wall */}
      <CuboidCollider
        args={[halfW, wallHeight, wallThickness]}
        position={[0, wallHeight, -halfD]}
      />
      {/* East wall */}
      <CuboidCollider args={[wallThickness, wallHeight, halfD]} position={[halfW, wallHeight, 0]} />
      {/* West wall */}
      <CuboidCollider
        args={[wallThickness, wallHeight, halfD]}
        position={[-halfW, wallHeight, 0]}
      />
    </RigidBody>
  );
};

BoundaryWalls.propTypes = {
  width: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  wallThickness: PropTypes.number,
  wallHeight: PropTypes.number,
};

export default BoundaryWalls;
