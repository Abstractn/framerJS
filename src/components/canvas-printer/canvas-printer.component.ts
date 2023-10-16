import { AbsComponent } from '../../../../main/lib/abs-component';
import { DEFAULT_GRADIENT, GRADIENT_CHANGE_EVENT_NAME } from '../../general/consts';
import { Gradient, ProfilePictureFrame } from '../../general/interfaces';
import { drawFrame, proportionalRange } from '../../general/utils';
import { GradientGeneratorComponent } from '../gradient-generator/gradient-generator.component';

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

  ready() {
    const fileInputNode = this.node.querySelector(this.FILE_INPUT_SELECTOR) as HTMLElement;
    fileInputNode.addEventListener('change', (event) => {
      this.getFile();
    });
  }

  getFile(): void {
    const inputNode = this.node.querySelector(this.FILE_INPUT_SELECTOR) as HTMLInputElement;
    const previewImgNode = this.node.querySelector(this.IMAGE_PREVIEW_SELECTOR) as HTMLImageElement;
    const file = inputNode.files && inputNode.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.onload = () => {
      previewImgNode.setAttribute('src', fileReader.result as string);
    };
    previewImgNode.onload = () => {
      this.imageWidth = previewImgNode.width;
      this.imageHeight = previewImgNode.height;
      this.canvasSize =
        this.imageWidth < this.imageHeight ?
          this.imageWidth :
          this.imageHeight;
      this.generateCanvas();
      this.printToCanvas(this._profilePictureFrameData);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  printToCanvas(profilePictureData: ProfilePictureFrame): void {
    const imagePreviewNode = this.node.querySelector(this.IMAGE_PREVIEW_SELECTOR) as HTMLImageElement;
    const canvasNode = this.node.querySelector(this.CANVAS_SELECTOR) as HTMLCanvasElement;
    const canvasCenter = this.canvasSize/2;
    const ctx = canvasNode.getContext('2d') as CanvasRenderingContext2D;
    const defaultGradientData: Gradient = {
      angle: 15,
      steps: DEFAULT_GRADIENT
    };
    //TODO rename to frameSizePercentage
    const frameSize = profilePictureData?.size !== undefined ? profilePictureData?.size : 10;
    //TODO rename to frameSize
    const frameSizeNotPercentage = proportionalRange(0, 100, 0, canvasCenter, frameSize);
    const gradientData: Gradient = profilePictureData?.gradient || defaultGradientData;

    //clear the canvas
    ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    
    //draw the mask as a filled shape
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(canvasCenter, canvasCenter, canvasCenter - 1, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    //change blend method to make the currently drawn content work as mask
    ctx.globalCompositeOperation = 'source-in';
    
    //draw image
    const widthDifference = this.canvasSize - this.imageWidth;
    const heightDifference = this.canvasSize - this.imageHeight;
    //TODO subtract frameSize to crop as less image as possible
    ctx.drawImage(
      imagePreviewNode as CanvasImageSource,
      0, 0, this.imageWidth, this.imageHeight,
      widthDifference/2, heightDifference/2, this.imageWidth, this.imageHeight
    );
    /* const source = {
      x: 0,
      y: 0,
      w: this.imageWidth,
      h: this.imageHeight,
    };
    const destination = {
      x: (widthDifference / 2) + (frameSizeNotPercentage-1),
      y: (heightDifference / 2) + (frameSizeNotPercentage-1),
      w: this.imageWidth - (frameSizeNotPercentage+1),
      h: this.imageHeight - (frameSizeNotPercentage+1),
    };
    ctx.drawImage(
      imagePreviewNode as CanvasImageSource,
      source.x, source.y, source.w, source.h,
      destination.x, destination.y, destination.w, destination.h
    ); */

    //revert blend method to default
    ctx.globalCompositeOperation = 'source-over';

    //draw frame
    drawFrame(frameSize, gradientData);

    imagePreviewNode.classList.add('hidden');
  }

  generateCanvas(): void {
    const canvasWrapperNode = this.node.querySelector(this.CANVAS_WRAPPER_SELECTOR) as HTMLElement;
    canvasWrapperNode.innerHTML = '';
    const canvasNode = document.createElement('canvas') as HTMLCanvasElement;
    canvasNode.setAttribute('width', this.canvasSize.toString());
    canvasNode.setAttribute('height', this.canvasSize.toString());
    canvasNode.setAttribute('class', this.CANVAS_CLASS);
    canvasWrapperNode.appendChild(canvasNode);

    // GradientGenerator logic
    document.addEventListener(GRADIENT_CHANGE_EVENT_NAME, (event: Event) => {
      //@ts-ignore
      _profilePictureFrameData = event.detail.profilePictureData as ProfilePictureFrame;
      this.printToCanvas(this._profilePictureFrameData);
    });
    GradientGeneratorComponent.prototype.init(); //FIXME this might not work correctly because of `prototype`
  }
}