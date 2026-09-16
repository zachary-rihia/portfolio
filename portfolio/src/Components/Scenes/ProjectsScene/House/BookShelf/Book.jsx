import { useRef, useState, useEffect } from "react";
import { Box, Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3, MathUtils, Color } from "three";
import PropTypes from "prop-types";
import PageSpread from "./PageSpread";

const Book = ({ position, isSelected, onSelect, onClose, camera, bookData, isFocused }) => {
  const [hovered, setHovered] = useState(false);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const groupRef = useRef();

  useEffect(() => {
    if (!isSelected) setSpreadIndex(0);
  }, [isSelected]);

  // ── Escape key closes the currently open book ──────────────────────
  useEffect(() => {
    if (!isSelected) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSelected, onClose]);

  useFrame(() => {
    if (!groupRef.current) return;

    const targetPosition = isSelected
      ? new Vector3(camera.position.x, camera.position.y - 0.15, camera.position.z - 1)
      : new Vector3(...position);

    groupRef.current.position.lerp(targetPosition, 0.1);

    const targetRotationY = isSelected ? camera.rotation.y : 0;
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
  });

  const totalSpreads = Math.ceil(bookData.pages.length / 2);
  const leftPage = bookData.pages[spreadIndex * 2];
  const rightPage = bookData.pages[spreadIndex * 2 + 1];

  const goNext = (e) => {
    e.stopPropagation();
    setSpreadIndex((i) => Math.min(i + 1, totalSpreads - 1));
  };
  const goPrev = (e) => {
    e.stopPropagation();
    setSpreadIndex((i) => Math.max(i - 1, 0));
  };

  // ── Highlight colour is the book's own colour, brightened ──────────
  const brightenedColour = new Color(bookData.colour).offsetHSL(0, 0, 0.25).getStyle();

  // Only show hover highlight when focused on the bookshelf
  const displayColour = hovered && isFocused ? brightenedColour : bookData.colour;
  const displayEmissiveIntensity = hovered && isFocused ? 0.4 : 0;

  return (
    <group ref={groupRef} position={position}>
      {!isSelected && (
        <group>
          <Box
            args={[0.15, 0.6, 0.4]}
            onPointerOver={() => isFocused && setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => isFocused && onSelect()}
          >
            <meshStandardMaterial
              color={displayColour}
              emissive={displayColour}
              emissiveIntensity={displayEmissiveIntensity}
            />
            <Edges color="#1a1108" linewidth={1.2} threshold={15} />
          </Box>

          <Box args={[0.02, 0.58, 0.38]} position={[0.08, 0, 0]}>
            <meshStandardMaterial color={displayColour} />
            <Edges color="#c9c0a8" linewidth={1} />
          </Box>
          <Box args={[0.02, 0.58, 0.38]} position={[-0.08, 0, 0]}>
            <meshStandardMaterial color={displayColour} />
            <Edges color="#c9c0a8" linewidth={1} />
          </Box>
          <Box args={[0.15, 0.01, 0.36]} position={[0, 0.2999, 0]}>
            <meshStandardMaterial color="#F0EAD6" /> {/* off-white paper colour */}
          </Box>
        </group>
      )}

      {isSelected && (
        <>
          <mesh position={[0, 0, -0.02]} onClick={onClose}>
            <planeGeometry args={[2.1, 1.5]} />
            <meshStandardMaterial color="#3b2a1a" />
          </mesh>

          <group position={[0, 0, 0.01]}>
            <PageSpread leftPageData={leftPage} rightPageData={rightPage} />
          </group>

          {spreadIndex > 0 && (
            <mesh position={[-1.3, -0.9, 0.05]} onClick={goPrev}>
              <planeGeometry args={[0.3, 0.15]} />
              <meshStandardMaterial color="white" transparent opacity={0.7} />
            </mesh>
          )}
          {spreadIndex < totalSpreads - 1 && (
            <mesh position={[1.3, -0.9, 0.05]} onClick={goNext}>
              <planeGeometry args={[0.3, 0.15]} />
              <meshStandardMaterial color="white" transparent opacity={0.7} />
            </mesh>
          )}
        </>
      )}
    </group>
  );
};

Book.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  camera: PropTypes.object.isRequired,
  isFocused: PropTypes.bool.isRequired,
  bookData: PropTypes.shape({
    title: PropTypes.string,
    colour: PropTypes.string,
    pages: PropTypes.array,
  }).isRequired,
};

export default Book;
