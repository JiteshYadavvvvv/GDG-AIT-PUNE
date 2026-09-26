import { Vector3 } from "three";

import {
  buildLanes,
  HUB_SIZE,
  landscapeLayout,
  portraitLayout,
  projectToFrame,
  type NetworkLayout,
} from "@/components/three/developer-network/layout";
import { GdgMark } from "@/components/ui/gdg-mark";
import { brandHex, inkHex } from "@/config/brand";
import { cn } from "@/lib/utils/cn";

// Rendered on the server. Draws itself in with CSS on first paint, then the live scene fades in over it.
export function NetworkFallback() {
  return (
    <div data-hero-fallback className="absolute inset-0">
      <NetworkDrawing layout={landscapeLayout} className="portrait:hidden" />
      <NetworkDrawing layout={portraitLayout} className="landscape:hidden" />
    </div>
  );
}

const LANE_DELAY = 250;

function NetworkDrawing({ layout, className }: { layout: NetworkLayout; className: string }) {
  const lanes = buildLanes(layout);
  const { width, height } = layout.frame;
  // One world unit in CSS pixels, matching `meet` (and the 3D camera's fit).
  const unit = `min(100vw / ${width}, 100svh / ${height})`;
  const [mergeX, mergeY] = projectToFrame(new Vector3(...layout.merge), layout);
  const [endX, endY] = projectToFrame(new Vector3(...layout.mainLineEnd), layout);
  const markWidth = HUB_SIZE * 0.5;
  const markHeight = (markWidth * 34) / 66;

  return (
    <svg
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn("absolute inset-0 size-full overflow-visible", className)}
      style={{ transformOrigin: `calc(50% + ${mergeX} * ${unit}) calc(50% + ${mergeY} * ${unit})` }}
    >
      {lanes.map((lane, index) => (
        <path
          key={lane.accent}
          d={toPath(lane.spread.getSpacedPoints(160), layout)}
          fill="none"
          stroke={brandHex[lane.accent]}
          strokeWidth={0.085}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1 1"
          className="animate-draw-in"
          style={{ animationDelay: `${LANE_DELAY + index * 90}ms` }}
        />
      ))}

      <path
        d={`M${mergeX} ${mergeY}L${endX} ${endY}`}
        stroke={inkHex}
        strokeWidth={0.085}
        pathLength={1}
        strokeDasharray="1 1"
        className="animate-draw-in"
        style={{ animationDelay: "1000ms" }}
      />

      {lanes.map((lane, index) =>
        lane.commits.map((u) => {
          const [x, y] = projectToFrame(lane.spread.getPointAt(u), layout);
          return (
            <g
              key={`${lane.accent}-${u}`}
              className="origin-center animate-pop-in [transform-box:fill-box]"
              style={{ animationDelay: `${LANE_DELAY + index * 90 + 250 + u * 700}ms` }}
            >
              <circle cx={x} cy={y} r={0.15} fill="none" stroke={brandHex[lane.accent]} strokeWidth={0.04} />
              <circle cx={x} cy={y} r={0.085} fill="#ffffff" />
            </g>
          );
        }),
      )}

      <g data-hub className="origin-center animate-pop-in [transform-box:fill-box]" style={{ animationDelay: "900ms" }}>
        <circle cx={mergeX} cy={mergeY + 0.05} r={HUB_SIZE / 2 + 0.02} fill={inkHex} opacity={0.07} />
        <circle cx={mergeX} cy={mergeY} r={HUB_SIZE / 2} fill="#ffffff" />
        <GdgMark
          x={mergeX - markWidth / 2}
          y={mergeY - markHeight / 2}
          width={markWidth}
          height={markHeight}
        />
      </g>
    </svg>
  );
}

function toPath(points: Vector3[], layout: NetworkLayout) {
  return points
    .map((point, i) => {
      const [x, y] = projectToFrame(point, layout);
      return `${i === 0 ? "M" : "L"}${x.toFixed(3)} ${y.toFixed(3)}`;
    })
    .join("");
}
