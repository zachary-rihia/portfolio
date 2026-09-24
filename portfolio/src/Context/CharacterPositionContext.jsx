import { createContext, useRef } from "react";
import PropTypes from "prop-types";

const CharacterPositionContext = createContext();

export const CharacterPositionProvider = ({ children }) => {
  // A ref instead of state — mutating positionRef.current NEVER triggers
  // a re-render anywhere, no matter how many components read from it
  const positionRef = useRef({ x: 0, y: 0, z: 0 });

  return (
    <CharacterPositionContext.Provider value={{ positionRef }}>
      {children}
    </CharacterPositionContext.Provider>
  );
};

CharacterPositionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CharacterPositionContext;