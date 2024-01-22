import { AbsComponent } from 'abs-component';
import { DEFAULT_FRAME, DEFAULT_FRAME_GRADIENT, DEFAULT_FRAME_SIZE } from '../../general/consts';
import { Gradient, ProfilePictureFrame } from '../../general/interfaces';
import { degreesToRadians } from '../../general/utils';
import { proportionalRange } from 'abs-utilities';
import { GradientGeneratorComponent } from '../gradient-generator/gradient-generator.component';
import { absComponentManager } from '../../main';
import { activeFrame } from '../../general/observables';
import { Subscription, skip } from 'rxjs';

export class ImageViewerComponent implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.loadButtonNode = this.node.querySelector(this.LOAD_BUTTON_NODE_SELECTOR) as HTMLButtonElement;
    //TODO delete?
    //this.changeButtonNode = this.node.querySelector(this.CHANGE_BUTTON_NODE_SELECTOR) as HTMLButtonElement;
    this.downloadButtonNode = this.node.querySelector(this.DOWNLOAD_BUTTON_NODE_SELECTOR) as HTMLButtonElement;
    this.imageInputNode = this.node.querySelector(this.IMAGE_INPUT_NODE_SELECTOR) as HTMLInputElement;
    this.canvasWrapperNode = this.node.querySelector(this.CANVAS_WRAPPER_NODE_SELECTOR) as HTMLElement;
    this.canvasNode = null;
    this.activeFrameSubscription = null;
  }

  private readonly LOAD_BUTTON_NODE_SELECTOR: string = 'button.image-load';
  //TODO delete?
  //private readonly CHANGE_BUTTON_NODE_SELECTOR: string = 'button.image-change';
  private readonly DOWNLOAD_BUTTON_NODE_SELECTOR: string = 'button.image-download';
  private readonly IMAGE_INPUT_NODE_SELECTOR: string = 'input.image-file-input';
  private readonly CANVAS_WRAPPER_NODE_SELECTOR: string = '.image-container';
  private readonly loadButtonNode: HTMLButtonElement;
  //TODO delete?
  //private readonly changeButtonNode: HTMLButtonElement;
  private readonly downloadButtonNode: HTMLButtonElement;
  private readonly imageInputNode: HTMLInputElement;
  private readonly canvasWrapperNode: HTMLElement;
  private canvasNode: HTMLCanvasElement|null;
  private activeFrameSubscription: Subscription|null;

  init() {}

  ready() {
    this.setNodesEvents();
  }

  getImageAsEncodedString(onImageLoadedCallback: (encodedImageString: string) => void) {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = () => {
      const encodedImageString: string = fileReader.result as string;
      onImageLoadedCallback(encodedImageString);
    };
    
    const file = this.imageInputNode.files && this.imageInputNode.files[0];
    file && fileReader.readAsDataURL(file);
  }

  generateCanvasNode(image: HTMLImageElement) {
    //TODO cropping
    const canvasSize = image.width < image.height ? image.width : image.height;
    this.canvasWrapperNode.innerHTML = '';
    this.canvasNode = document.createElement('canvas');
    this.canvasNode.setAttribute('width', canvasSize.toString());
    this.canvasNode.setAttribute('height', canvasSize.toString());
    this.canvasWrapperNode.appendChild(this.canvasNode);

    this.activeFrameSubscription && this.activeFrameSubscription.unsubscribe();
    this.activeFrameSubscription = activeFrame.pipe(skip(1)).subscribe(updatedFrame => {
      this.printToCanvas(image, updatedFrame);
    });
  }

  printToCanvas(image: HTMLImageElement, frame: ProfilePictureFrame) {
    const cleanCanvas = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize);
    };

    const drawMask = () => {
      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      ctx.arc(canvasCenter, canvasCenter, canvasCenter - 1, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    const setBlendMethod = () => {
      ctx.globalCompositeOperation = 'source-in';
    };

    const drawImage = () => {
      //TODO make dynamic
      const OFFSET = true;
      
      //const widthDifference = canvasSize - imageWidth; //TODO delete?
      //const heightDifference = canvasSize - imageHeight; //TODO delete?

      const sourceX = 0;
      const sourceY = 0;
      const sourceWidth = imageWidth;
      const sourceHeight = imageHeight;
      //TODO delete?
      //const destinationX = OFFSET ? frameSize : widthDifference / 2;
      //const destinationY = OFFSET ? frameSize : heightDifference / 2;
      const destinationX = OFFSET ? frameSize : 0;
      const destinationY = OFFSET ? frameSize : 0;
      const destinationWidth = OFFSET ? imageWidth - (frameSize * 2) : imageWidth;
      const destinationHeight = OFFSET ? imageHeight - (frameSize * 2) : imageHeight;


      ctx.drawImage(
        image,
        sourceX, sourceY, sourceWidth, sourceHeight,
        destinationX, destinationY, destinationWidth, destinationHeight
      );
    };

    const revertBlendMode = () => {
      ctx.globalCompositeOperation = 'source-over';
    };

    const drawFrame = () => {
      const x = canvasCenter;
      const y = canvasCenter;
      const r = canvasCenter - (frameSize - (frameSize / 2));
      
      ctx.lineWidth = frameSize;

      const gradientAngle = gradient.angle as number;
      const fixedGradientAngle = ((gradientAngle) + 90)* -1;
      const startGradientX = Math.floor( proportionalRange(-1, 1, 0, canvasSize, Math.sin( degreesToRadians(fixedGradientAngle) ) ) );
      const startGradientY = Math.floor( proportionalRange(-1, 1, 0, canvasSize, Math.cos( degreesToRadians(fixedGradientAngle) ) ) );
      const endGradientX   = Math.floor( proportionalRange(-1, 1, 0, canvasSize, Math.sin( degreesToRadians(fixedGradientAngle + 180) ) ) );
      const endGradientY   = Math.floor( proportionalRange(-1, 1, 0, canvasSize, Math.cos( degreesToRadians(fixedGradientAngle + 180) ) ) );
      
      const frameGradient = ctx.createLinearGradient(startGradientX, startGradientY, endGradientX, endGradientY);
      gradient.steps?.forEach(gradientStep => {
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
    };

    const imageWidth = image.width;
    const imageHeight = image.height;
    const canvasSize = imageWidth < imageHeight ? imageWidth : imageHeight;
    const canvasCenter = canvasSize / 2;
    const ctx = this.canvasNode?.getContext('2d') as CanvasRenderingContext2D;
    const frameSizePercentage = frame.size !== undefined ? frame.size : DEFAULT_FRAME_SIZE;
    const frameSize = proportionalRange(0, 100, 0, canvasCenter, frameSizePercentage);
    const gradient: Gradient = frame.gradient || DEFAULT_FRAME_GRADIENT;
    
    cleanCanvas();
    drawMask();
    setBlendMethod();
    drawImage();
    revertBlendMode();
    drawFrame();
  }

  setNodesEvents() {
    this.loadButtonNode.addEventListener('click', (event) => {
      this.imageInputNode.click();
    });
    
    //TODO delete?
    //this.changeButtonNode.addEventListener('click', (event) => {});
    
    this.downloadButtonNode.addEventListener('click', (event) => {});
    
    this.imageInputNode.addEventListener('change', (event) => {
      this.getImageAsEncodedString(encodedImageString => {
        const imageElement = new Image();
        imageElement.src = encodedImageString;
        imageElement.onload = () => {
          //TODO move inside next methods
          /* const imageData = {
            imageElement: imageElement,
            imageWidth: imageElement.width,
            imageHeight: imageElement.height,
          }; */

          this.generateCanvasNode(imageElement);
          //TODO add usage of last stored frame
          // if there is no stored frame use `DEFAULT_FRAME`
          this.printToCanvas(imageElement, DEFAULT_FRAME);
        };
      });
    });
  }
}