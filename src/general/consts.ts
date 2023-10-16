import { ProfilePictureFrame, Step } from "./interfaces";

export const PROFILE_PICTURE_FRAME_INTERFACE_INIT: ProfilePictureFrame = {
  gradient: {
    steps: []
  }
};
export const DEFAULT_GRADIENT: Step[] = [
  {colorCode: '000000', position: 0},
  {colorCode: 'FFFFFF', position: 100}
];
export const GRADIENT_CHANGE_EVENT_NAME: string = 'gradientchange';