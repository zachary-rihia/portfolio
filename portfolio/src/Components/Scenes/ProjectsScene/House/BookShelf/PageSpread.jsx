import usePageTexture from "../../../../../Hooks/usePageTexture";
import PropTypes from "prop-types";

const PAGE_WIDTH = 1.0;
const PAGE_HEIGHT = 1.5;
const GAP = 0.02; // small gap at the spine

const PageSpread = ({ leftPageData, rightPageData }) => {
  const leftTexture = usePageTexture(leftPageData);
  const rightTexture = usePageTexture(rightPageData);

  return (
    <group>
      {/* Left page — sits to the left of the spine */}
      {leftPageData && (
        <mesh position={[-(PAGE_WIDTH / 2 + GAP), 0, 0]}>
          <planeGeometry args={[PAGE_WIDTH, PAGE_HEIGHT]} />
          <meshStandardMaterial map={leftTexture} side={2} />
        </mesh>
      )}

      {/* Right page — sits to the right of the spine */}
      {rightPageData && (
        <mesh position={[PAGE_WIDTH / 2 + GAP, 0, 0]}>
          <planeGeometry args={[PAGE_WIDTH, PAGE_HEIGHT]} />
          <meshStandardMaterial map={rightTexture} side={2} />
        </mesh>
      )}
    </group>
  );
};

PageSpread.propTypes = {
  leftPageData: PropTypes.object,
  rightPageData: PropTypes.object,
};

export default PageSpread;
