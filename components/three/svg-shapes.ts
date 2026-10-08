import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/**
 * Parses raw SVG path data into THREE.Shapes (holes resolved by SVGLoader).
 * Coordinates stay in SVG space (y down) — flip the mesh with a negative
 * Y scale; the renderer compensates the winding for mirrored objects.
 */
export function shapesFromPathData(paths: readonly string[]): THREE.Shape[] {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg">${paths
    .map((d) => `<path d="${d}"/>`)
    .join("")}</svg>`;
  const data = new SVGLoader().parse(markup);
  return data.paths.flatMap((p) => p.toShapes());
}

/** Rounded rectangle shape (SVG space). */
export function roundedRect(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Rounded rectangle as a hole path (same outline, usable in shape.holes). */
export function roundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): THREE.Path {
  const p = new THREE.Path();
  p.setFromPoints(roundedRect(x, y, w, h, r).getPoints(12));
  return p;
}
