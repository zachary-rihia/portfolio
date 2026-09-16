import { useEffect, useRef } from "react";

const INTERACT_KEYS = [" ", "e", "f"];

// Call this with a callback that runs whenever the interact key is pressed —
// completely decoupled from proximity/hitbox logic, which is the component's job
export const useInteract = (onInteract, enabled = true) => {
  const callbackRef = useRef(onInteract);
  callbackRef.current = onInteract; // always call the latest version, avoids stale closures

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      if (INTERACT_KEYS.includes(e.key)) {
        callbackRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled]);
};

export default useInteract;
