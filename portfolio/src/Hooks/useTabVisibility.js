// Hooks/useTabVisibility.js
import { useState, useEffect } from "react";

const useTabVisibility = () => {
  const [isHidden, setIsHidden] = useState(document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isHidden;
};

export default useTabVisibility;