import { Text } from "@react-three/drei";
import PropTypes from "prop-types";

const StarSigns = ({ position, text }) => {
  return (
    <Text
      color="white"
      anchorX="center"
      anchorY="middle"
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {text}
    </Text>
  );
};

StarSigns.propsTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  text: PropTypes.string.isRequired,
};

export default StarSigns;
