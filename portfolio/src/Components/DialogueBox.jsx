import { useEffect } from "react";
import { useDialogue } from "../Context/DialogueProviderContext";

const DialogueBox = () => {
	const { isVisible, currentLine, nextLine, hideDialogue } = useDialogue();

	useEffect(() => {
		if (!isVisible) return;
		window.focus();

		const handleKeyDown = (e) => {
			if ([" ", "e", "f"].includes(e.key)) {
				nextLine();
			} else if (e.key === "Escape") {
				hideDialogue();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isVisible, nextLine, hideDialogue]);

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
				fontSize: "16px",
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
