// Randomly assigns books to shelves, then packs them left-to-right on each shelf
// so they can touch (zero gap) but never overlap.
export const generateShelfPositions = ({
  bookCount,
  shelves, // array of { y, xMin, xMax, z }
  bookWidth = 0.25,
  maxGap = 0.6, // max random space between touching books, 0 = flush against each other
}) => {
  // ── Step 1: Randomly assign each book to a shelf ─────────────────────
  // Shuffle shelf indices repeatedly so books land on different shelves,
  // not filled in shelf order
  const shelfAssignments = Array.from({ length: shelves.length }, () => []);

  const bookIndices = Array.from({ length: bookCount }, (_, i) => i);
  // Shuffle the books themselves so assignment order is random
  bookIndices.sort(() => Math.random() - 0.5);

  bookIndices.forEach((bookIndex) => {
    // Pick a random shelf each time — allows uneven distribution,
    // e.g. shelf 3 could get 0 books, shelf 1 could get 3
    const randomShelf = Math.floor(Math.random() * shelves.length);
    shelfAssignments[randomShelf].push(bookIndex);
  });

  // ── Step 2: Pack each shelf's books left-to-right, allowing touching ──
  const positions = new Array(bookCount);

  shelves.forEach((shelf, shelfIndex) => {
    const { y, xMin, xMax, z } = shelf;
    const booksOnShelf = shelfAssignments[shelfIndex];

    // Shuffle order within the shelf too, so it's not always sorted by index
    booksOnShelf.sort(() => Math.random() - 0.5);

    // Calculate total width needed to check it fits
    const totalWidthNeeded = booksOnShelf.length * bookWidth;
    const availableWidth = xMax - xMin;

    // If books would overflow the shelf, clamp gap to 0 so they still fit
    const safeMaxGap = totalWidthNeeded < availableWidth ? maxGap : 0;

    let cursorX = xMin;

    booksOnShelf.forEach((bookIndex) => {
      const gap = Math.random() * safeMaxGap;
      cursorX += gap;

      // Position is the book's center, so offset by half its width
      positions[bookIndex] = [cursorX + bookWidth / 2, y, z];

      cursorX += bookWidth; // next book starts right after this one — guarantees no overlap
    });
  });

  return positions;
};
