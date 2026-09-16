export const generateForestBoundary = ({
  width,
  depth,
  treeSpacing = 1.5,
  rows = 6,
  rowDepth = 1.2,
  jitter = 0.4,
  treeTextures,
}) => {
  const halfW = width / 2;
  const halfD = depth / 2;
  const positions = [];

  const addEdge = (getPosition, edgeLength) => {
    const treeCount = Math.ceil(edgeLength / treeSpacing);

    for (let row = 0; row < rows; row++) {
      for (let i = 0; i < treeCount; i++) {
        const t = i / treeCount;
        const jitterX = (Math.random() - 0.5) * jitter;
        const jitterZ = (Math.random() - 0.5) * jitter;

        const { x, z } = getPosition(t, row);
        positions.push({
          position: [x + jitterX, 0, z + jitterZ],
          texturePath: treeTextures[Math.floor(Math.random() * treeTextures.length)],
          flip: Math.random() > 0.5,
        });
      }
    }
  };

  const addCorner = (cx, cz, gridSize, spacing, jitterAmount, textures) => {
    const corner = [];
    const halfGrid = Math.floor(gridSize / 2);

    for (let ix = -halfGrid; ix <= halfGrid; ix++) {
      for (let iz = -halfGrid; iz <= halfGrid; iz++) {
        const jitterX = (Math.random() - 0.5) * jitterAmount;
        const jitterZ = (Math.random() - 0.5) * jitterAmount;

        corner.push({
          position: [cx + ix * spacing + jitterX, 0, cz + iz * spacing + jitterZ],
          texturePath: textures[Math.floor(Math.random() * textures.length)],
          flip: Math.random() > 0.5,
        });
      }
    }
    return corner;
  };

  // North edge
  addEdge((t, row) => ({ x: -halfW + t * width, z: halfD + row * rowDepth }), width);
  // South edge
  addEdge((t, row) => ({ x: -halfW + t * width, z: -halfD - row * rowDepth }), width);
  // East edge
  addEdge((t, row) => ({ x: halfW + row * rowDepth, z: -halfD + t * depth }), depth);
  // West edge
  addEdge((t, row) => ({ x: -halfW - row * rowDepth, z: -halfD + t * depth }), depth);

  // ── These two lines were missing — that's the bug ──────────────────
  const cornerGridSize = rows + 1; // scales with row density automatically
  const cornerSpacing = 0.9;

  positions.push(...addCorner(halfW, halfD, cornerGridSize, cornerSpacing, jitter, treeTextures));
  positions.push(...addCorner(-halfW, halfD, cornerGridSize, cornerSpacing, jitter, treeTextures));
  positions.push(...addCorner(halfW, -halfD, cornerGridSize, cornerSpacing, jitter, treeTextures));
  positions.push(...addCorner(-halfW, -halfD, cornerGridSize, cornerSpacing, jitter, treeTextures));

  return positions;
};
