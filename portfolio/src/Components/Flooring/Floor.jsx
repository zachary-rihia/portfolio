import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Floor = () => {
  return (
    <RigidBody type="fixed">
      <Plane args={[900, 900]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#080808"
          transparent
          opacity={0.6}
          roughness={1}
          metalness={0}
          depthWrite={false}
        />
      </Plane>
    </RigidBody>
  );
};

export default Floor;
