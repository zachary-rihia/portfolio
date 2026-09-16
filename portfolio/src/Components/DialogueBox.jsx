import { useEffect } from "react";
import { useDialogue } from "../Context/DialogueProviderContext";
import useInteract from "../Hooks/useInteract";

const DialogueBox = () => {
  const { isVisible, currentLine, nextLine, hideDialogue } = useDialogue();

  // Advancing the dialogue now goes through the same shared interact key
  // as everything else — space/e/f, defined once in useInteract.js
  useInteract(() => {
    nextLine();
  }, isVisible); // only active while a dialogue box is actually showing

  // Escape isn't an "interact" key, so it stays as its own small listener
  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        hideDialogue();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isVisible, hideDialogue]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#333",
        color: "#fff",
        padding: "16px 24px",
        borderRadius: "12px",
        border: "2px solid #fff",
        fontFamily: "monospace",
        fontSize: "30px",
        height: "20%",
        width: "70%",
        textAlign: "left",
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      {currentLine}
    </div>
  );
};

export default DialogueBox;
