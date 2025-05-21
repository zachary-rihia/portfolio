import { createContext, useContext, useState, useRef } from "react";

const DialogueContext = createContext();

export const DialogueProvider = ({ children }) => {
	const linesRef = useRef([]);
	const shownDialoguesRef = useRef(new Set());
	const [canInteract, setCanInteract] = useState(true);
	const [isVisible, setIsVisible] = useState(false);
	const [index, setIndex] = useState(0);
	const [currentLine, setCurrentLine] = useState("");

	const showDialogue = (dialogueArray) => {
		if (!canInteract || dialogueArray.length === 0) return;
		linesRef.current = dialogueArray;
		setIndex(0);
		setCurrentLine(dialogueArray[0]);
		setIsVisible(true);
	};

	const showDialogueOnce = (id, dialogueArray) => {
		if (shownDialoguesRef.current.has(id)) {
			return;
		}

		shownDialoguesRef.current.add(id);
		showDialogue(dialogueArray);
	};

	const nextLine = () => {
		setIndex((prev) => {
			const next = prev + 1;
			if (next < linesRef.current.length) {
				setCurrentLine(linesRef.current[next]);
				return next;
			} else {
				hideDialogue();
				return 0;
			}
		});
	};

	const hideDialogue = () => {
		setIsVisible(false);
		linesRef.current = [];
		setIndex(0);
		setCanInteract(false);

		// Uncomment if you want cooldown logic
		setTimeout(() => {
			setCanInteract(true);
			resetDialogueShown(0);
		}, 500);
	};

	const resetDialogueShown = () => {
		shownDialoguesRef.current = new Set();
	};

	return (
		<DialogueContext.Provider
			value={{
				isVisible,
				currentLine,
				showDialogueOnce,
				showDialogue,
				nextLine,
				hideDialogue,
				resetDialogueShown,
			}}
		>
			{children}
		</DialogueContext.Provider>
	);
};

export const useDialogue = () => useContext(DialogueContext);
