import { AbsComponent } from 'abs-component';
import { debounceTime, skip } from 'rxjs';
import { activeFrame } from '../../general/observables';
import { Gradient, ProfilePictureFrame } from '../../general/interfaces';
import { DEFAULT_FRAME_ANGLE, DEFAULT_FRAME_GRADIENT_STEPS } from '../../general/consts';

export class DynamicBackgroundComponent implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.firstGradientBackgroundNode = this.node.querySelector(this.FIRST_GRADIENT_BACKGROUND_NODE_SELECTOR) as HTMLElement;
    this.secondGradientBackgroundNode = this.node.querySelector(this.SECOND_GRADIENT_BACKGROUND_NODE_SELECTOR) as HTMLElement;
    this.isFirstBackgroundSelected = true;
  }

  private readonly FIRST_GRADIENT_BACKGROUND_NODE_SELECTOR: string = '.background-1';
  private readonly SECOND_GRADIENT_BACKGROUND_NODE_SELECTOR: string = '.background-2';
  private readonly firstGradientBackgroundNode: HTMLElement;
  private readonly secondGradientBackgroundNode: HTMLElement;
  private isFirstBackgroundSelected: boolean;

  init() {}

  ready() {
    activeFrame.pipe(skip(1), debounceTime(0)).subscribe((updatedFrame) => {
      this.setBackground(updatedFrame);
    });
  }

  fjsToCssGradient(fjsGrandient: Gradient | undefined): string {
    const gradientAngle = `${((fjsGrandient?.angle !== undefined ? fjsGrandient.angle : DEFAULT_FRAME_ANGLE) + 90).toString()}deg`;
    let res = 'linear-gradient(';
    let stepRes = '';

    (fjsGrandient?.steps || DEFAULT_FRAME_GRADIENT_STEPS).forEach((gradientStep) => {
      const gradientPosition = gradientStep.position;
      const gradientColor = gradientStep.colorCode;
      stepRes += `, #${gradientColor} ${gradientPosition}%`;
    });

    res += gradientAngle;
    res += stepRes;
    res += ')';
    return res;
  }

  setBackground(frame: ProfilePictureFrame): void {
    const cssGradient = this.fjsToCssGradient(frame.gradient);

    const selectedBackgroundNode = this.isFirstBackgroundSelected ? this.firstGradientBackgroundNode : this.secondGradientBackgroundNode;
    selectedBackgroundNode.style.backgroundImage = cssGradient;
    

    if(this.isFirstBackgroundSelected) {
      this.firstGradientBackgroundNode.style.opacity = '1';
      this.secondGradientBackgroundNode.style.opacity = '0';
    } else {
      this.secondGradientBackgroundNode.style.opacity = '1';
    }

    this.isFirstBackgroundSelected = !this.isFirstBackgroundSelected;
  }
}