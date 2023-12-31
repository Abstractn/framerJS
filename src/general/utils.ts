import { proportionalRange } from "abs-utilities";
import { Gradient } from "./interfaces";

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function drawFrame(frameSizePercentage: number, gradientData: Gradient) {
  const canvasNode = document.querySelector('canvas') as HTMLCanvasElement;
  const ctx = canvasNode.getContext('2d') as CanvasRenderingContext2D;
  const canvasSize = canvasNode.width;
  const center = canvasSize / 2;
  const frameSize = proportionalRange(0, 100, 0, canvasSize/2, frameSizePercentage);
  const x = center;
  const y = center;
  const r = center - (frameSize - (frameSize / 2));
  
  ctx.lineWidth = frameSize;

  let gradientAngle = gradientData.angle as number;
  const fixedGradientAngle = ((gradientAngle) + 90)* -1;
  const startGradientX = Math.floor( proportionalRange(-1, 1, 0, canvasSize, Math.sin( degreesToRadians(fixedGradientAngle) ) ) );
  const startGradientY = Math.floor( proportionalRange(-1, 1, 0, canvasSize, Math.cos( degreesToRadians(fixedGradientAngle) ) ) );
  const endGradientX   = Math.floor( proportionalRange(-1, 1, 0, canvasSize, Math.sin( degreesToRadians(fixedGradientAngle + 180) ) ) );
  const endGradientY   = Math.floor( proportionalRange(-1, 1, 0, canvasSize, Math.cos( degreesToRadians(fixedGradientAngle + 180) ) ) );
  
  const frameGradient = ctx.createLinearGradient(startGradientX, startGradientY, endGradientX, endGradientY);
  gradientData.steps?.forEach(gradientStep => {
    try {
      frameGradient.addColorStop(
        (gradientStep.position || 0) / 100,
        `#${gradientStep?.colorCode || '000000'}`
      );
    } catch (error: any) {
      if( (error.message as string|undefined)?.includes('Invalid color') ) {
        frameGradient.addColorStop(
          (gradientStep.position || 0) / 100,
          '#000000'
        );
      } else {
        console.error(error);
      }
    }
  });
  
  ctx.strokeStyle = frameGradient;

  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.stroke();
}