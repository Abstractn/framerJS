import { AbsComponent } from 'abs-component';
import { proportionalRange, rgbToHex } from 'abs-utilities';

export class ColorPickerComponent implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  private readonly CANVAS_NODE_SELECTOR: string = '.canvas-printer-canvas';
  private readonly CANVAS_NODE: HTMLCanvasElement | null = document.querySelector(this.CANVAS_NODE_SELECTOR) as HTMLCanvasElement;;
  private isColorPickerModeActive: boolean = false;
  private pointedColor: string = '';
  private selectedColor: string = '';

  init() {}

  ready() {}
}