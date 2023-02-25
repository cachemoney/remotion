import { CircleDemo } from "./Circle";
import { EllipseDemo } from "./Ellipse";
import { NoiseComp } from "./NoiseDemo";
import { PieDemo } from "./Pie";
import { RectDemo } from "./Rect";
import { StarDemo } from "./Star";
import {
  OpacityDemo,
  RotateDemo,
  ScaleDemo,
  SkewDemo,
  TranslateDemo,
} from "./Translate";
import { TriangleDemo } from "./Triangle";

export type Option = {
  name: string;
  optional: "no" | "default-enabled" | "default-disabled";
} & (
  | {
      type: "numeric";
      min: number;
      default: number;
      max: number;
      step: number;
    }
  | {
      type: "boolean";
      default: boolean;
    }
  | {
      type: "enum";
      default: string;
      values: string[];
    }
);

export type DemoType = {
  id: string;
  comp: React.FC;
  compWidth: number;
  compHeight: number;
  fps: number;
  durationInFrames: number;
  options: Option[];
  autoPlay: boolean;
};

export const rectDemo: DemoType = {
  comp: RectDemo,
  compWidth: 1280,
  compHeight: 400,
  durationInFrames: 150,
  fps: 30,
  id: "rect",
  autoPlay: false,
  options: [
    {
      default: 200,
      max: 1000,
      step: 5,
      min: 1,
      type: "numeric",
      name: "width",
      optional: "no",
    },
    {
      default: 200,
      max: 1000,
      step: 5,
      min: 1,
      type: "numeric",
      name: "height",
      optional: "no",
    },
    {
      name: "cornerRadius",
      default: 0,
      max: 100,
      min: 0,
      step: 1,
      type: "numeric",
      optional: "no",
    },
    {
      name: "edgeRoundness",
      default: 1,
      max: 2,
      min: -2,
      step: 0.01,
      type: "numeric",
      optional: "default-disabled",
    },
    {
      name: "debug",
      type: "boolean",
      optional: "no",
      default: false,
    },
  ],
};

export const triangleDemo: DemoType = {
  comp: TriangleDemo,
  compWidth: 1280,
  compHeight: 400,
  durationInFrames: 150,
  fps: 30,
  id: "triangle",
  autoPlay: false,
  options: [
    {
      default: 200,
      max: 1000,
      step: 5,
      min: 1,
      type: "numeric",
      name: "length",
      optional: "no",
    },
    {
      name: "edgeRoundness",
      default: 1,
      max: 2,
      min: -2,
      step: 0.01,
      type: "numeric",
      optional: "default-disabled",
    },
    {
      name: "cornerRadius",
      default: 0,
      max: 100,
      min: 0,
      step: 1,
      type: "numeric",
      optional: "no",
    },
    {
      name: "direction",
      type: "enum",
      default: "up",
      values: ["up", "down", "left", "right"],
      optional: "no",
    },
    {
      name: "debug",
      type: "boolean",
      optional: "no",
      default: false,
    },
  ],
};

export const circleDemo: DemoType = {
  comp: CircleDemo,
  compHeight: 720,
  compWidth: 1280,
  durationInFrames: 150,
  fps: 30,
  id: "circle",
  autoPlay: false,
  options: [
    {
      default: 200,
      max: 1000,
      step: 5,
      min: 1,
      type: "numeric",
      name: "radius",
      optional: "no",
    },
  ],
};

export const translateDemo: DemoType = {
  comp: TranslateDemo,
  autoPlay: false,
  compHeight: 400,
  compWidth: 1280,
  durationInFrames: 150,
  fps: 30,
  id: "translate",
  options: [
    {
      default: 0,
      max: 800,
      step: 5,
      min: -800,
      type: "numeric",
      name: "translateX",
      optional: "no",
    },
    {
      default: 0,
      max: 800,
      step: 5,
      min: -800,
      type: "numeric",
      name: "translateY",
      optional: "no",
    },
  ],
};

export const skewDemo: DemoType = {
  comp: SkewDemo,
  autoPlay: false,
  compHeight: 400,
  compWidth: 1280,
  durationInFrames: 150,
  fps: 30,
  id: "skew",
  options: [
    {
      default: 0,
      max: 180,
      step: 1,
      min: -180,
      type: "numeric",
      name: "skew",
      optional: "no",
    },
  ],
};

export const scaleDemo: DemoType = {
  comp: ScaleDemo,
  autoPlay: false,
  compHeight: 400,
  compWidth: 1280,
  durationInFrames: 150,
  fps: 30,
  id: "scale",
  options: [
    {
      default: 1,
      max: 4,
      step: 0.01,
      min: -4,
      type: "numeric",
      name: "scale",
      optional: "no",
    },
  ],
};

export const opacityDemo: DemoType = {
  comp: OpacityDemo,
  autoPlay: false,
  compHeight: 400,
  compWidth: 1280,
  durationInFrames: 150,
  fps: 30,
  id: "opacity",
  options: [
    {
      default: 1,
      max: 1,
      step: 0.01,
      min: 0,
      type: "numeric",
      name: "opacity",
      optional: "no",
    },
  ],
};

export const rotateDemo: DemoType = {
  comp: RotateDemo,
  autoPlay: false,
  compHeight: 400,
  compWidth: 1280,
  durationInFrames: 150,
  fps: 30,
  id: "rotate",
  options: [
    {
      default: 0,
      max: 180,
      step: 1,
      min: -180,
      type: "numeric",
      name: "rotateZ",
      optional: "no",
    },
  ],
};

export const pieDemo: DemoType = {
  comp: PieDemo,
  compHeight: 720,
  compWidth: 1280,
  durationInFrames: 150,
  fps: 30,
  id: "pie",
  autoPlay: false,
  options: [
    {
      default: 200,
      max: 1000,
      step: 5,
      min: 1,
      type: "numeric",
      name: "radius",
      optional: "no",
    },
    {
      default: 0.5,
      step: 0.01,
      min: 0,
      max: 1,
      type: "numeric",
      name: "progress",
      optional: "no",
    },
    {
      default: 0,
      step: 0.01,
      min: -3.14 * 2,
      max: 3.14 * 2,
      type: "numeric",
      name: "rotation",
      optional: "no",
    },
    {
      default: true,
      type: "boolean",
      name: "closePath",
      optional: "no",
    },
    {
      default: false,
      type: "boolean",
      name: "counterClockwise",
      optional: "no",
    },
    {
      default: false,
      type: "boolean",
      name: "showStrokeInsteadPreviewOnly",
      optional: "no",
    },
  ],
};

export const ellipseDemo: DemoType = {
  comp: EllipseDemo,
  compHeight: 720,
  compWidth: 1280,
  durationInFrames: 150,
  fps: 30,
  id: "ellipse",
  autoPlay: false,
  options: [
    {
      default: 150,
      max: 1000,
      step: 5,
      min: 1,
      type: "numeric",
      name: "rx",
      optional: "no",
    },
    {
      default: 200,
      max: 1000,
      step: 5,
      min: 1,
      type: "numeric",
      name: "ry",
      optional: "no",
    },
  ],
};

export const starDemo: DemoType = {
  comp: StarDemo,
  compHeight: 720,
  compWidth: 1280,
  durationInFrames: 150,
  fps: 30,
  id: "star",
  autoPlay: false,
  options: [
    {
      default: 100,
      max: 400,
      step: 5,
      min: 1,
      type: "numeric",
      name: "innerRadius",
      optional: "no",
    },
    {
      default: 200,
      max: 400,
      step: 5,
      min: 1,
      type: "numeric",
      name: "outerRadius",
      optional: "no",
    },
    {
      name: "edgeRoundness",
      default: 1,
      max: 2,
      min: -2,
      step: 0.01,
      type: "numeric",
      optional: "default-disabled",
    },
    {
      name: "points",
      default: 5,
      max: 50,
      min: 3,
      step: 1,
      type: "numeric",
      optional: "no",
    },
    {
      name: "cornerRadius",
      default: 0,
      max: 200,
      min: 0,
      step: 1,
      type: "numeric",
      optional: "no",
    },
  ],
};

export const noiseDemo: DemoType = {
  comp: NoiseComp,
  compHeight: 720,
  compWidth: 1280,
  durationInFrames: 150,
  fps: 30,
  id: "noise",
  autoPlay: true,
  options: [
    {
      default: 0.01,
      max: 0.025,
      min: 0.001,
      step: 0.001,
      type: "numeric",
      name: "speed",
      optional: "no",
    },
    {
      min: 0,
      max: 100,
      step: 1,
      default: 50,
      name: "maxOffset",
      type: "numeric",
      optional: "no",
    },
    {
      name: "circleRadius",
      default: 5,
      max: 20,
      min: 2,
      step: 1,
      type: "numeric",
      optional: "no",
    },
  ],
};
