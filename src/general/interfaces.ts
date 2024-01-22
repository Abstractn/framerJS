export interface Step {
  colorCode?: string;
  position?: number;
}

export interface Gradient {
  angle?: number;
  type?: string;
  steps?: Step[];
}

export interface ProfilePictureFrame {
  size?: number;
  color?: string;
  gradient?: Gradient;
}