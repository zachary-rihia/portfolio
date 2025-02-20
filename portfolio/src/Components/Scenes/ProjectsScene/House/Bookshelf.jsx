import { useState } from "react";
import { Vector3 } from "three";
import BookshelfFrame from "./BookshelfFrame";
import Book from "./Book";
import { useThree } from "@react-three/fiber";

const Bookshelf = ({ isFocused }) => {
	const [selectedBook, setSelectedBook] = useState(null);
	const { camera } = useThree();

	// Handle book selection
	const handleSelectBook = (bookIndex) => {
		if (!isFocused) return; // Only allow selection when focused on bookshelf

		if (selectedBook === bookIndex) {
			setSelectedBook(null);
		} else {
			setSelectedBook(bookIndex);
		}
	};

	// Auto deselect when zooming out
	useState(() => {
		if (!isFocused) setSelectedBook(null);
	}, [isFocused]);

	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 10, 5]} intensity={1} />

			{/* Render the Bookshelf frame */}
			<BookshelfFrame position={[0.42, 0.5, 0.1]} />

			{/* Render books */}
			<Book position={[-6.6, 2.46, -4]} isSelected={selectedBook === 0} onSelect={() => handleSelectBook(0)} camera={camera} />
			<Book position={[-6.3, 2.46, -4]} isSelected={selectedBook === 1} onSelect={() => handleSelectBook(1)} camera={camera} />
			<Book position={[-5.9, 2.46, -4]} isSelected={selectedBook === 2} onSelect={() => handleSelectBook(2)} camera={camera} />
			<Book position={[-6.7, 1.66, -4]} isSelected={selectedBook === 3} onSelect={() => handleSelectBook(3)} camera={camera} />
			<Book position={[-6.3, 1.66, -4]} isSelected={selectedBook === 4} onSelect={() => handleSelectBook(4)} camera={camera} />
			<Book position={[-5.9, 1.66, -4]} isSelected={selectedBook === 5} onSelect={() => handleSelectBook(5)} camera={camera} />
		</>
	);
};

export default Bookshelf;
