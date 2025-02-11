import BookshelfFrame from "./BookshelfFrame";
import Book from "./Book";

const Bookshelf = () => {
	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 10, 5]} intensity={1} />

			{/* Render the Bookshelf frame */}
			<BookshelfFrame position={[0.42, 0.5, 0.1]}/>

			{/* Render books in the shelf */}
			<Book position={[-6.6, 2.46, -4]} />
			<Book position={[-6.3, 2.46, -4]} />
			<Book position={[-5.9, 2.46, -4]} />
			<Book position={[-6.7, 1.66, -4]} />
			<Book position={[-6.3, 1.66, -4]} />
			<Book position={[-5.9, 1.66, -4]} />
		</>
	);
};

export default Bookshelf;
