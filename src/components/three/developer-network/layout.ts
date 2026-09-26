import { CatmullRomCurve3, MathUtils, Vector3 } from "three";

import type { Accent } from "@/config/brand";

type Point = [number, number, number];

export interface NetworkLayout {
  orientation: "landscape" | "portrait";
  /** World units always kept in view, centred on the origin. */
  frame: { width: number; height: number };
  /** Camera distance at rest. */
  distance: number;
  merge: Point;
  mainLineEnd: Point;
  /** `commits` are positions along each lane (0–1) that get a node. */
  lanes: { accent: Accent; points: Point[]; commits: number[] }[];
  /** Commits that carry a technology label, in the order of `technologies` in data/hero. */
  labels: { lane: number; u: number }[];
  /** Camera position at the end of the scroll, relative to the merge point. */
  cameraEnd: Point;
}

/** Diameter of the GDG hub at the merge point, in world units. */
export const HUB_SIZE = 0.95;

// Measured against the hero copy: lanes stay in the gaps between the text blocks.
export const landscapeLayout: NetworkLayout = {
  orientation: "landscape",
  frame: { width: 12, height: 9 },
  distance: 12.364,
  merge: [4.8, 1.3, 0],
  mainLineEnd: [16, 1.3, 0],
  lanes: [
    {
      accent: "blue",
      points: [[3.5, 8, -1], [3.3, 4.4, -0.8], [3.8, 2.7, -0.4]],
      commits: [0.62, 0.84],
    },
    {
      accent: "red",
      points: [[-16, -0.6, -1.4], [-6.5, -0.62, -1.1], [-2.5, -0.95, -0.8], [1.2, -0.7, -0.5], [3.3, 0.2, -0.2]],
      commits: [0.47, 0.56, 0.65, 0.74, 0.83, 0.91],
    },
    {
      accent: "yellow",
      points: [[-16, -1.6, -1], [-6, -1.55, -0.7], [-2, -1.85, -0.5], [1.8, -1.5, -0.3], [3.8, -0.3, -0.1]],
      commits: [0.44, 0.53, 0.62, 0.71, 0.8, 0.89],
    },
    {
      accent: "green",
      points: [[-16, -2.55, -0.6], [-6, -2.5, -0.4], [-2, -2.35, -0.2], [2.4, -2.4, 0], [4.3, -0.9, 0]],
      commits: [0.5, 0.59, 0.68, 0.77, 0.86, 0.93],
    },
  ],
  labels: [
    { lane: 1, u: 0.65 },
    { lane: 3, u: 0.59 },
    { lane: 2, u: 0.8 },
    { lane: 2, u: 0.53 },
    { lane: 0, u: 0.62 },
    { lane: 0, u: 0.84 },
    { lane: 1, u: 0.83 },
  ],
  cameraEnd: [-2.6, 0.2, 4.6],
};

// Phones and portrait tablets: the copy sits on top, the network gets the lower part of the screen.
export const portraitLayout: NetworkLayout = {
  orientation: "portrait",
  frame: { width: 6, height: 12.8 },
  distance: 16,
  merge: [0.9, -4.2, 0],
  mainLineEnd: [0.9, -16, 0],
  lanes: [
    { accent: "blue", points: [[-7, -2.5, -1], [-3.4, -2.4, -0.8], [-1.7, -3, -0.5], [-0.3, -3.9, -0.2]], commits: [0.55, 0.78] },
    { accent: "red", points: [[7, -2.1, -1.2], [3.5, -2.4, -0.9], [2.4, -3.1, -0.5], [1.6, -3.7, -0.2]], commits: [0.52, 0.76] },
    { accent: "yellow", points: [[-7, -5.7, -0.8], [-3.3, -5.3, -0.6], [-1.6, -5, -0.3], [-0.2, -4.7, -0.1]], commits: [0.58, 0.8] },
    { accent: "green", points: [[7, -5.9, -0.6], [3.6, -5.6, -0.4], [2.5, -5, -0.2], [1.7, -4.7, 0]], commits: [0.5, 0.74] },
  ],
  labels: [],
  cameraEnd: [0, 1.2, 6.2],
};

/** Eased scroll progress: how far the lanes have pulled into one bundle. */
export function bundleAmount(merge: number) {
  return merge * merge * (3 - 2 * merge);
}

export function layoutFor(aspect: number) {
  return aspect >= 1 ? landscapeLayout : portraitLayout;
}

/** Fits the frame on whichever axis is tighter; the static drawing uses the same rule. */
export function cameraFor(layout: NetworkLayout, aspect: number) {
  const visibleHeight = Math.max(layout.frame.height, layout.frame.width / aspect);
  const fov = MathUtils.radToDeg(2 * Math.atan(visibleHeight / 2 / layout.distance));
  return { fov, distance: layout.distance, visibleHeight };
}

export interface Lane {
  accent: Accent;
  commits: number[];
  spread: CatmullRomCurve3;
  /** Same lane pulled into a tight bundle; the scroll blends towards it. */
  bundled: CatmullRomCurve3;
}

export function buildLanes(layout: NetworkLayout): Lane[] {
  const merge = new Vector3(...layout.merge);

  return layout.lanes.map((lane, index) => {
    const offset = (index - (layout.lanes.length - 1) / 2) * 0.16;
    const spread = [...lane.points.map((point) => new Vector3(...point)), merge.clone()];
    // Lanes that enter from the side bundle horizontally; ones from the top or bottom, vertically.
    const fromSide = Math.abs(spread[0]!.x - merge.x) > Math.abs(spread[0]!.y - merge.y);
    const bundled = spread.map((point, i) => {
      if (i === spread.length - 1) return point.clone();
      return fromSide
        ? new Vector3(point.x, merge.y + offset, offset * 0.5)
        : new Vector3(merge.x + offset, point.y, offset * 0.5);
    });

    return {
      accent: lane.accent,
      commits: lane.commits,
      spread: new CatmullRomCurve3(spread, false, "centripetal"),
      bundled: new CatmullRomCurve3(bundled, false, "centripetal"),
    };
  });
}

/** Where a point lands at the resting camera, in world units from the centre (y down). */
export function projectToFrame(point: Vector3, layout: NetworkLayout): [number, number] {
  const scale = layout.distance / (layout.distance - point.z);
  return [point.x * scale, -point.y * scale];
}
