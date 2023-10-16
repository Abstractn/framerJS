import { AbsComponent } from '../../../../main/lib/abs-component';
import { proportionalRange, rgbToHex } from '../../general/utils';

export class ColorPickerComponent implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  private readonly CANVAS_NODE_SELECTOR: string = '.canvas-printer-canvas';
  private readonly CANVAS_NODE: HTMLCanvasElement | null = document.querySelector(this.CANVAS_NODE_SELECTOR) as HTMLCanvasElement;;
  private isColorPickerModeActive: boolean = false;
  private pointedColor: string = '';
  private selectedColor: string = '';

  init() {}

  ready() {
    this.addColorPickerEvent();
    this.addColorSelectorEvent();
  }

  /*assignColorPickerEvent() {
    const canvas = document.querySelector(this.CANVAS_NODE_SELECTOR);
    canvas.addEventListener('event', (event) => {
      let pos = this.findPos(event.target);
      let x = event.pageX - pos.x;
      let y = event.pageY - pos.y;
      let coord = "x=" + x + ", y=" + y;
      let c = this.getContext('2d');
      let p = c.getImageData(x, y, 1, 1).data; 
      let hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
      $('#status').html(coord + "<br>" + hex);
    });
  }*/
  
  /*findPos(obj) {
    let curleft = 0;
    let curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
  }*/
  
  addColorPickerEvent(): void {
    this.CANVAS_NODE?.addEventListener('mousemove', (event) => {
      this.pointedColor = this.isColorPickerModeActive ?
        this.getColorFromCursorPosition(event) :
        '';
    });
  }
  
  addColorSelectorEvent(): void {
    this.CANVAS_NODE?.addEventListener('click', (event) => {
      this.selectedColor = this.pointedColor;
      console.log(this.selectedColor);//TODO delete
      //TODO dispatch event || share data via global variable and call external class?
    });
  }
  
  startColorPickerEvent(): void {
    this.isColorPickerModeActive = true;
  }
  
  stopColorPickerEvent(): void {
    this.isColorPickerModeActive = false;
  }
  
  getColorFromCursorPosition(hoverEvent: MouseEvent): string {
    const eventTarget: HTMLElement = hoverEvent.currentTarget as HTMLElement;
    const canvasSize = this.CANVAS_NODE?.width;
    const unscaledX = hoverEvent.pageX - eventTarget.offsetLeft;
    const unscaledY = hoverEvent.pageY - eventTarget.offsetTop;
    const x = proportionalRange(0, 300, 0, canvasSize as number, unscaledX);
    const y = proportionalRange(0, 300, 0, canvasSize as number, unscaledY);
    const ctx = this.CANVAS_NODE?.getContext('2d') as CanvasRenderingContext2D;
    const colorData = ctx.getImageData(x, y, 1, 1).data;
    const pointedHexColorCode = rgbToHex(colorData[0], colorData[1], colorData[2]) || '000000';
    return pointedHexColorCode
  }
}