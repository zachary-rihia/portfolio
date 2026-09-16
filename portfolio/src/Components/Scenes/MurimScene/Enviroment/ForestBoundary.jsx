import { useMemo } from "react";
import { generateForestBoundary } from "../../../../Utilities/generateForestBoundary";
import StandingSprite from "./StandingSprite";

const TREE_TEXTURES = [
  "/Textures/tree1.png",
  "/Textures/tree2.png",
  "/Textures/tree3.png",
  "/Textures/bush1.png",
  "/Textures/bush2.png",
  "/Textures/bush3.png",
  "/Textures/bush4.png",
  "/Textures/bush5.png",
  "/Textures/bush6.png",
];

// entranceZ: where along the Z axis the gap in the wall should be (e.g. the
// south wall, matching where your cave/portal already sits)
// entranceWidth: how wide the visible gap is — should match your portal/path width
const ForestBoundary = ({ width, depth, entranceSide = "south", entranceWidth = 0 }) => {
  const trees = useMemo(() => {
    const allTrees = generateForestBoundary({
      width,
      depth,
      rows: 6,
      treeSpacing: 1.5,
      jitter: 0.5,
      treeTextures: TREE_TEXTURES,
    });

    // Remove trees that fall inside the entrance gap, on whichever side
    // the entrance is on — this "cuts a doorway" into the tree wall
    return allTrees.filter((tree) => {
      const [x, , z] = tree.position;
      const halfW = width / 2;
      const halfD = depth / 2;

      if (entranceSide === "south") {
        // Keep everything EXCEPT trees near the south edge within entranceWidth of center-x
        const isSouthEdge = z < -halfD + 2;
        const isInGap = Math.abs(x) < entranceWidth / 2;
        return !(isSouthEdge && isInGap);
      }
      // Add similar checks here if you want entrances on other sides
      return true;
    });
  }, [width, depth, entranceSide, entranceWidth]);

  return (
    <group>
      {trees.map((tree, i) => (
        <StandingSprite
          key={i}
          texturePath={tree.texturePath}
          position={tree.position}
          width={2.2}
          height={3.5}
          flip={tree.flip}
        />
      ))}
    </group>
  );
};

export default ForestBoundary;
