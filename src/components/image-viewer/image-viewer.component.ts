import { AbsComponent } from 'abs-component';
import { DEFAULT_FRAME, DEFAULT_FRAME_GRADIENT, DEFAULT_FRAME_SIZE } from '../../general/consts';
import { Gradient, ProfilePictureFrame } from '../../general/interfaces';
import { degreesToRadians } from '../../general/utils';
import { proportionalRange } from 'abs-utilities';
import { activeFrame, imageLoaded } from '../../general/observables';
import { Subscription, skip } from 'rxjs';

export class ImageViewerComponent implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.loadButtonNode = this.node.querySelector(this.LOAD_BUTTON_NODE_SELECTOR) as HTMLButtonElement;
    this.downloadButtonNode = this.node.querySelector(this.DOWNLOAD_BUTTON_NODE_SELECTOR) as HTMLButtonElement;
    this.imageInputNode = this.node.querySelector(this.IMAGE_INPUT_NODE_SELECTOR) as HTMLInputElement;
    this.canvasWrapperNode = this.node.querySelector(this.CANVAS_WRAPPER_NODE_SELECTOR) as HTMLElement;
    this.imageDownloadLinkNode = this.node.querySelector(this.IMAGE_DOWNLOAD_LINK_NODE_SELECTOR) as HTMLAnchorElement;
    this.canvasNode = null;
    this.activeFrameSubscription = null;
    this.lastFrame = null;
  }

  private readonly LOAD_BUTTON_NODE_SELECTOR: string = 'button.image-load';
  private readonly DOWNLOAD_BUTTON_NODE_SELECTOR: string = 'button.image-download';
  private readonly IMAGE_INPUT_NODE_SELECTOR: string = 'input.image-file-input';
  private readonly CANVAS_WRAPPER_NODE_SELECTOR: string = '.image-container';
  private readonly IMAGE_DOWNLOAD_LINK_NODE_SELECTOR: string = 'a.image-download-link';
  private readonly loadButtonNode: HTMLButtonElement;
  private readonly downloadButtonNode: HTMLButtonElement;
  private readonly imageInputNode: HTMLInputElement;
  private readonly canvasWrapperNode: HTMLElement;
  private readonly imageDownloadLinkNode: HTMLAnchorElement;
  private canvasNode: HTMLCanvasElement|null;
  private activeFrameSubscription: Subscription|null;
  private lastFrame: ProfilePictureFrame|null;

  init() {
    this.downloadButtonNode.setAttribute('disabled', 'true');
  }

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
    const canvasSize = image.width < image.height ? image.width : image.height;
    this.canvasWrapperNode.innerHTML = '';
    this.canvasNode = document.createElement('canvas');
    this.canvasNode.setAttribute('width', canvasSize.toString());
    this.canvasNode.setAttribute('height', canvasSize.toString());
    this.canvasWrapperNode.appendChild(this.canvasNode);

    this.activeFrameSubscription && this.activeFrameSubscription.unsubscribe();
    this.activeFrameSubscription = activeFrame.pipe(skip(1)).subscribe(updatedFrame => {
      this.lastFrame = updatedFrame;
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
      //TODO make dynamic as "preserve image" option
      const OFFSET = true;
      
      const sourceX = 0;
      const sourceY = 0;
      const sourceWidth = imageWidth;
      const sourceHeight = imageHeight;
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

    this.downloadButtonNode.addEventListener('click', (event) => {
      const getFileOriginalName = () => {
        const fakeFilePath = this.imageInputNode.value;
        const splitFakeFilePath = fakeFilePath.split('\\');
        const fileNameAndFormat = splitFakeFilePath[splitFakeFilePath.length - 1];
        const splitFileNameAndFormat = fileNameAndFormat.split('.');
        const fileName = splitFileNameAndFormat[0];
        return fileName;
      };

      const image = this.canvasNode?.toDataURL() as string;
      const originalFileName = getFileOriginalName();
      this.imageDownloadLinkNode.download = `${originalFileName}.png`;
      this.imageDownloadLinkNode.href = image;
      this.imageDownloadLinkNode.click();
    });
    
    this.imageInputNode.addEventListener('change', (event) => {
      this.getImageAsEncodedString(encodedImageString => {
        const imageElement = new Image();
        imageElement.src = encodedImageString;
        imageElement.onload = () => {
          this.generateCanvasNode(imageElement);
          this.printToCanvas(imageElement, this.lastFrame || DEFAULT_FRAME);
          imageLoaded.next(null);
          this.downloadButtonNode.removeAttribute('disabled');
        };
      });
    });
  }
}