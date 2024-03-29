import React from "react";

const CharacterPositionContext = React.createContext({
  position: [0, 0, 0],
  setPosition: () => {},
});

export default CharacterPositionContext;
