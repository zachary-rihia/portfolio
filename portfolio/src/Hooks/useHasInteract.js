import { useState, useEffect } from "react";

// Detects the very first time the player presses any movement or interact key —
// used to auto-dismiss a controls hint once they've clearly figured it out
const MOVEMENT_KEYS = ["w", "a", "s", "d"];
const INTERACT_KEYS = [" ", "e", "f"];

const useHasInteracted = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) return;

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (MOVEMENT_KEYS.includes(key) || INTERACT_KEYS.includes(key)) {
        setHasInteracted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasInteracted]);

  return hasInteracted;
};

export default useHasInteracted;
