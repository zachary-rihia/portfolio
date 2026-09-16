import { useMemo, useState } from "react";
import * as THREE from "three";

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 1400;

// Wraps text AND respects \n\n as real paragraph breaks
const wrapText = (ctx, text, x, y, maxWidth, lineHeight, paragraphGap) => {
  const paragraphs = text.split("\n\n"); // 👈 split on real paragraph breaks first
  let cursorY = y;

  paragraphs.forEach((paragraph, pIndex) => {
    const words = paragraph.replace(/\n/g, " ").split(" "); // collapse single \n within a paragraph
    let line = "";

    words.forEach((word) => {
      const testLine = line + word + " ";
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && line !== "") {
        ctx.fillText(line, x, cursorY);
        line = word + " ";
        cursorY += lineHeight;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, x, cursorY);
    cursorY += lineHeight;

    if (pIndex < paragraphs.length - 1) {
      cursorY += paragraphGap; // 👈 real visual gap between paragraphs
    }
  });

  return cursorY;
};

// Measures how many lines the text will need at a given font size —
// used to decide if we need to shrink the font before actually drawing
const estimateLineCount = (ctx, text, maxWidth) => {
  const paragraphs = text.split("\n\n");
  let totalLines = 0;

  paragraphs.forEach((paragraph) => {
    const words = paragraph.replace(/\n/g, " ").split(" ");
    let line = "";
    let lines = 1;

    words.forEach((word) => {
      const testLine = line + word + " ";
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth && line !== "") {
        lines++;
        line = word + " ";
      } else {
        line = testLine;
      }
    });
    totalLines += lines;
  });

  return totalLines;
};

const usePageTexture = (pageData) => {
  const { title = null, text = null, details = null, image = null } = pageData ?? {};
  const [, forceUpdate] = useState(0);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#F5F0E6";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "rgba(0,0,0,0.02)";
    for (let i = 0; i < 400; i++) {
      ctx.fillRect(Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT, 1, 1);
    }

    let cursorY = 100;
    const marginX = 80;
    const textWidth = CANVAS_WIDTH - marginX * 2;

    if (title) {
      const maxTitleWidth = CANVAS_WIDTH - 160; // matches your margins elsewhere

      // Try progressively smaller sizes until the title actually fits
      const titleSizes = [60, 54, 48, 42, 36];
      let chosenTitleSize = titleSizes[titleSizes.length - 1];

      for (const size of titleSizes) {
        ctx.font = `bold ${size}px Georgia, serif`;
        const width = ctx.measureText(title).width;
        if (width <= maxTitleWidth) {
          chosenTitleSize = size;
          break;
        }
      }

      ctx.fillStyle = "#1A1A1A";
      ctx.font = `bold ${chosenTitleSize}px Georgia, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(title, CANVAS_WIDTH / 2, cursorY);
      cursorY += chosenTitleSize + 25; // spacing now scales with the chosen size, not a fixed number

      ctx.strokeStyle = "#8B7355";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2 - 150, cursorY);
      ctx.lineTo(CANVAS_WIDTH / 2 + 150, cursorY);
      ctx.stroke();
      cursorY += 70;
      ctx.textAlign = "left";
    }

    if (details) {
      details.forEach(({ label, value }) => {
        if (!value) return;
        ctx.fillStyle = "#5A4632";
        ctx.font = "bold 30px Georgia, serif";
        ctx.fillText(`${label}:`, marginX, cursorY);
        cursorY += 40;

        ctx.fillStyle = "#2B2B2B";
        ctx.font = "32px Georgia, serif";
        cursorY = wrapText(ctx, value, marginX, cursorY, textWidth, 42, 0);
        cursorY += 25;
      });
      cursorY += 20;
    }

    if (text) {
      // ── Dynamic font sizing ────────────────────────────────────────
      // Available vertical space left on the page for body text
      const availableHeight = CANVAS_HEIGHT - cursorY - 60; // 60px bottom margin

      // Try progressively smaller fonts until the estimated content fits
      const fontSizes = [38, 34, 30, 27, 24];
      let chosenSize = fontSizes[fontSizes.length - 1];

      for (const size of fontSizes) {
        ctx.font = `${size}px Georgia, serif`;
        const lineHeight = size * 1.45;
        const paragraphGap = size * 0.5;
        const paragraphCount = text.split("\n\n").length;

        const estimatedLines = estimateLineCount(ctx, text, textWidth);
        const estimatedHeight = estimatedLines * lineHeight + (paragraphCount - 1) * paragraphGap;

        if (estimatedHeight <= availableHeight) {
          chosenSize = size;
          break;
        }
      }

      const lineHeight = chosenSize * 1.45;
      const paragraphGap = chosenSize * 0.5;

      ctx.fillStyle = "#2B2B2B";
      ctx.font = `${chosenSize}px Georgia, serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      cursorY = wrapText(ctx, text, marginX, cursorY, textWidth, lineHeight, paragraphGap);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;

    if (image) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = image;
      img.onload = () => {
        const imgWidth = CANVAS_WIDTH - 160;
        const imgHeight = (img.height / img.width) * imgWidth;
        ctx.drawImage(img, 80, cursorY + 20, imgWidth, imgHeight);
        tex.needsUpdate = true;
        forceUpdate((n) => n + 1);
      };
    }

    return tex;
  }, [title, text, details, image]);

  return texture;
};

export default usePageTexture;
