import { Gradient, ProfilePictureFrame, Step } from "./interfaces";

export const DEFAULT_FRAME_SIZE: number = 10;
export const DEFAULT_FRAME_ANGLE: number = 45;
export const DEFAULT_FRAME_GRADIENT_STEPS: Step[] = [
  { colorCode: '000000', position: 0 },
  { colorCode: 'FFFFFF', position: 100 },
];
export const DEFAULT_FRAME_GRADIENT: Gradient = {
  steps: DEFAULT_FRAME_GRADIENT_STEPS,
  angle: DEFAULT_FRAME_ANGLE,
};
export const DEFAULT_FRAME: ProfilePictureFrame = {
  size: DEFAULT_FRAME_SIZE,
  gradient: DEFAULT_FRAME_GRADIENT,
};
export const INIT_FRAME: ProfilePictureFrame = {
  gradient: {
    steps: []
  }
};