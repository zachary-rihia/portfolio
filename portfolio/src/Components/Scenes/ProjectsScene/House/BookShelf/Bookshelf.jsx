import { useState, useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import BookshelfFrame from "./BookshelfFrame";
import Book from "./Book";
import { BOOKSHELF_BOOKS } from "../../../../../data/bookcontent";
import { generateShelfPositions } from "../../../../../Utilities/shelfLayout";

// All 5 shelves — adjust y values and x bounds to match your actual BookshelfFrame
const SHELVES = [
  { y: 4.01, xMin: -6.9, xMax: -4.5, z: -3.7 },
  { y: 3.3, xMin: -6.9, xMax: -4.5, z: -3.7 },
  { y: 2.64, xMin: -6.9, xMax: -4.5, z: -3.7 },
  { y: 1.94, xMin: -6.9, xMax: -4.5, z: -3.7 },
  { y: 1.2, xMin: -6.9, xMax: -4.5, z: -3.7 },
];

const Bookshelf = ({ isFocused }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { camera } = useThree();

  // useMemo so positions are randomised once per mount, not every render
  const bookPositions = useMemo(
    () =>
      generateShelfPositions({
        bookCount: BOOKSHELF_BOOKS.length,
        shelves: SHELVES,
        bookWidth: 0.25,
      }),
    []
  );

  const handleSelectBook = (bookIndex) => {
    if (!isFocused) return;
    setSelectedBook((prev) => (prev === bookIndex ? null : bookIndex));
  };

  useEffect(() => {
    if (!isFocused) setSelectedBook(null);
  }, [isFocused]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <BookshelfFrame position={[-5.75, 3, -3.9]} />

      {BOOKSHELF_BOOKS.map((bookData, i) => (
        <Book
          key={i}
          position={bookPositions[i]}
          bookData={bookData}
          isSelected={selectedBook === i}
          isFocused={isFocused}
          onSelect={() => handleSelectBook(i)}
          onClose={() => setSelectedBook(null)}
          camera={camera}
        />
      ))}
    </>
  );
};

export default Bookshelf;
