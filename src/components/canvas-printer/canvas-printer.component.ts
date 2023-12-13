import { AbsComponent } from 'abs-component';
import { DEFAULT_GRADIENT, GRADIENT_CHANGE_EVENT_NAME } from '../../general/consts';
import { Gradient, GradientChangeEvent, ProfilePictureFrame } from '../../general/interfaces';
import { drawFrame } from '../../general/utils';
import { proportionalRange } from 'abs-utilities';
import { GradientGeneratorComponent } from '../gradient-generator/gradient-generator.component';
import { absComponentManager } from '../../main';


export class CanvasPrinterComponent implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  private readonly FILE_INPUT_SELECTOR: string = '.canvas-printer-image-input';
  private readonly IMAGE_PREVIEW_SELECTOR: string = '.canvas-printer-image-preview';
  private readonly CANVAS_WRAPPER_SELECTOR: string = '.canvas-printer-canvas-wrapper';
  private readonly CANVAS_CLASS: string = 'canvas-printer-canvas';
  private readonly CANVAS_SELECTOR: string = '.' + this.CANVAS_CLASS;
  private imageWidth: number = NaN;
  private imageHeight: number = NaN;
  private canvasSize: number = NaN;
  private _profilePictureFrameData: ProfilePictureFrame = {};

  init() {}

  ready() {}
}