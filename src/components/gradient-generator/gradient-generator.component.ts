import { AbsComponent } from 'abs-component';
import { DEFAULT_GRADIENT, GRADIENT_CHANGE_EVENT_NAME, PROFILE_PICTURE_FRAME_INTERFACE_INIT } from '../../general/consts';
import { Gradient, GradientChangeEvent, ProfilePictureFrame, Step } from '../../general/interfaces';

export class GradientGeneratorComponent implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  private readonly STEPS_LIST_SELECTOR: string = '.gradient-generator-step-list';
  private readonly STEP_SELECTOR: string = '.gradient-generator-step-list-item';
  private readonly STEP_COLOR_PREVIEW_SELECTOR: string = '.gradient-generator-step-color-preview';
  private readonly STEP_COLOR_INPUT_SELECTOR: string = '.gradient-generator-step-color-hex-input';
  private readonly STEP_POSITION_INPUT_SELECTOR: string = '.gradient-generator-step-position-input';
  private readonly DELETE_STEP_BUTTON_SELECTOR: string = '.gradient-generator-step-control-delete';
  private readonly ADD_STEP_BUTTON_SELECTOR: string = '.gradient-generator-control-add';
  private readonly STEP_ITEM_TEMPLATE_SELECTOR: string = '.template#step-item-template>*';
  private readonly GRADIENT_IMPORT_VIEW_SELECTOR = '.gradient-generator-view-import';
  private readonly GRADIENT_IMPORT_VIEW_OPEN_BUTTON_SELECTOR: string = '.gradient-generator-control-import';
  private readonly GRADIENT_IMPORT_VIEW_CLOSE_BUTTON_SELECTOR: string = '.gradient-generator-view-import-close';
  private readonly GRADIENT_IMPORT_INPUT_SELECTOR: string = '.gradient-generator-view-import-input';
  private readonly GRADIENT_IMPORT_BUTTON_SELECTOR: string = '.gradient-generator-view-import-action';
  private readonly GRADIENT_EXPORT_VIEW_SELECTOR: string = '.gradient-generator-view-export';
  private readonly GRADIENT_EXPORT_VIEW_OPEN_BUTTON_SELECTOR: string = '.gradient-generator-control-export';
  private readonly GRADIENT_EXPORT_VIEW_CLOSE_BUTTON_SELECTOR: string = '.gradient-generator-view-export-close';
  private readonly GRADIENT_EXPORT_INPUT_SELECTOR: string = '.gradient-generator-view-export-input';
  private readonly HIDE_OVERLAY_VIEW_CLASS: string = 'not-visible';
  private readonly GRADIENT_GENERATOR_DISABLED_CLASS: string = 'disabled';
  private readonly GRADIENT_ANGLE_INPUT_SELECTOR: string = '.gradient-generator-frame-angle-input';
  private readonly FRAME_SIZE_INPUT_SELECTOR: string = '.gradient-generator-frame-size-input';
  private readonly STEP_MIN_VALUE: number = 0;
  private readonly STEP_MAX_VALUE: number = 100;
  //TODO move to config object
  private readonly LAST_GRADIENT_DATA_STORAGE_KEY: string = 'abs.framerJs.gradientGenerator.lastGeneratedData';
  private readonly GRADIENT_CHANGE_EVENT_NAME: string = GRADIENT_CHANGE_EVENT_NAME;

  private isComponentInited: boolean = false;
  private stepTemplateNode: HTMLElement | null = null;
  private templateSteps: NodeListOf<HTMLElement> | [] = [];
  private output: ProfilePictureFrame = PROFILE_PICTURE_FRAME_INTERFACE_INIT;
  private onChange = new CustomEvent(this.GRADIENT_CHANGE_EVENT_NAME, {});

  init() {}

  customInit() {
    if(!this.isComponentInited) {
      this.isComponentInited = !this.isComponentInited;

      this.node.classList.remove(this.GRADIENT_GENERATOR_DISABLED_CLASS);
      this.stepTemplateNode = document.querySelector(this.STEP_ITEM_TEMPLATE_SELECTOR) as HTMLElement;
  
      this.updateStepsListFromTemplate();
      
      const lastGeneratedGradientData = JSON.parse(localStorage.getItem(this.LAST_GRADIENT_DATA_STORAGE_KEY) as string) as ProfilePictureFrame;
      if(lastGeneratedGradientData !== null) {
        this.reloadStoredData(lastGeneratedGradientData);
      } else {
        this.generateDefaultGradient();
      }
  
      this.sortSteps();
      this.templateSteps.forEach(step => {
        this.assignEventsToStep(step);
      });
      this.assignGlobalEvents();
    }
  }

  updateStepsListFromTemplate(): void {
    this.templateSteps = this.node.querySelectorAll(this.STEP_SELECTOR);
  }

  assignEventsToStep(currentStep: HTMLElement): void {
    const colorPreviewNode = currentStep.querySelector(this.STEP_COLOR_PREVIEW_SELECTOR) as HTMLElement;
    const colorInputNode = currentStep.querySelector(this.STEP_COLOR_INPUT_SELECTOR) as HTMLInputElement;
    const stepPositionInputNode = currentStep.querySelector(this.STEP_POSITION_INPUT_SELECTOR) as HTMLElement;
    const deleteStepButtonNode = currentStep.querySelector(this.DELETE_STEP_BUTTON_SELECTOR) as HTMLElement;

    colorInputNode.addEventListener('input', () => {
      this.updateColorPreview(colorInputNode as HTMLInputElement, colorPreviewNode);
      this.updateOutput();
    });
    colorInputNode.addEventListener('paste', (event) => {
      let clipboardText = (event.clipboardData || (window as any).clipboardData).getData('text');
      if(clipboardText.indexOf('#') === 0) {
        clipboardText = clipboardText.split('#')[1] || clipboardText; 
      }
      colorInputNode.value = clipboardText;

      this.updateColorPreview(colorInputNode as HTMLInputElement, colorPreviewNode);
      this.updateOutput();
    });
    stepPositionInputNode.addEventListener('change', () => {
      this.sortSteps();
      this.forceNumberInputLimit(stepPositionInputNode as HTMLInputElement);
      this.updateOutput();
    });
    deleteStepButtonNode.addEventListener('click', () => {
      this.deleteStep(currentStep);
      this.updateOutput();
    });
  }

  updateColorPreview(input: HTMLInputElement, previewBox: HTMLElement): void {
    const inputValue: string = input.value || '000000';
    previewBox.setAttribute('style', `background-color: #${inputValue};`);
  }
  
  forceNumberInputLimit(inputNode: HTMLInputElement): void {
    const minValue = parseInt(inputNode.getAttribute('min') as string);
    const maxValue = parseInt(inputNode.getAttribute('max') as string);
    const currentValue = parseInt(inputNode.value);
    inputNode.value =
      currentValue < minValue ? `${minValue}` :
      currentValue > maxValue ? `${maxValue}` :
      `${currentValue}`;
  }
  
  addNewStep(stepData?: Step): HTMLElement {
    const newStepNode = this.stepTemplateNode?.cloneNode(true) as HTMLElement;
    const stepsListNode = this.node.querySelector(this.STEPS_LIST_SELECTOR) as HTMLElement;
    stepsListNode.appendChild(newStepNode);
    this.assignEventsToStep(newStepNode);
    if(stepData) {
      const stepColorInput = newStepNode.querySelector(this.STEP_COLOR_INPUT_SELECTOR) as HTMLInputElement;
      const stepPositionInput = newStepNode.querySelector(this.STEP_POSITION_INPUT_SELECTOR) as HTMLInputElement;
      stepColorInput.value = stepData.colorCode as string;
      stepPositionInput.value = stepData?.position?.toString() as string;
      stepColorInput.dispatchEvent(new Event('input'));
      stepPositionInput.dispatchEvent(new Event('change'));
    }
    this.updateStepsListFromTemplate();
    this.updateOutput();
    return newStepNode;
  }

  deleteStep(selectedStep: HTMLElement): void {
    selectedStep.remove();
    this.updateStepsListFromTemplate();
    this.updateOutput();
  }

  generateDefaultGradient(): void {
    DEFAULT_GRADIENT.forEach(step => {
      this.addNewStep({colorCode: step.colorCode, position: step.position});
    });
  }
  
  sortSteps(): void {
    // source: https://www.geeksforgeeks.org/how-to-sort-an-html-list-using-javascript/
    const stepsList = document.querySelector(this.STEPS_LIST_SELECTOR) as HTMLElement;
    let i: number;
    let run: boolean = true;
    let stop: boolean = false;

    while(run) {
      run = false;
      const steps = stepsList?.querySelectorAll(this.STEP_SELECTOR);

      for(i = 0; i < (steps.length - 1); i++) {
        stop = false;
        const currentInput = steps[i]?.querySelector(this.STEP_POSITION_INPUT_SELECTOR) as HTMLInputElement;
        const nextInput =  steps[i+1]?.querySelector(this.STEP_POSITION_INPUT_SELECTOR) as HTMLInputElement;
        const currentValue = parseInt(currentInput?.value)+1 || 9999;
        const nextValue = parseInt(nextInput?.value)+1 || 9999;
        if (currentValue > nextValue) {
          stop = true;
          break;
        }
      }

      if(stop) {
        steps[i].parentNode?.insertBefore(steps[i + 1], steps[i]);
        run = true;
      }
    }
  }
  
  assignGlobalEvents(): void {
    const addStepButtonNode = this.node.querySelector(this.ADD_STEP_BUTTON_SELECTOR) as HTMLElement;
    addStepButtonNode.addEventListener('click', () => this.addNewStep());
    addStepButtonNode.addEventListener('click', () => this.updateOutput());
    const exportInputNode = this.node.querySelector(this.GRADIENT_EXPORT_INPUT_SELECTOR) as HTMLInputElement;
    exportInputNode.addEventListener('click', () => {
      exportInputNode.select();
      const value = exportInputNode.value;
      try {
        navigator.clipboard.writeText(value);
      } catch (error) {}
    });
    const importButtonNode = this.node.querySelector(this.GRADIENT_IMPORT_BUTTON_SELECTOR);
    const importViewNode = this.node.querySelector(this.GRADIENT_IMPORT_VIEW_SELECTOR) as HTMLElement;
    const closeImportViewButtonNode = importViewNode.querySelector(this.GRADIENT_IMPORT_VIEW_CLOSE_BUTTON_SELECTOR) as HTMLElement;
    importButtonNode?.addEventListener('click', () => {
      this.importGradient();
      closeImportViewButtonNode.click();
    });
    const frameSizeInputNode = this.node.querySelector(this.FRAME_SIZE_INPUT_SELECTOR) as HTMLInputElement;
    frameSizeInputNode?.addEventListener('input', () => {
      this.output.size = parseInt(frameSizeInputNode.value);
      this.updateOutput();
    });
    const gradientAngleInputNode = this.node.querySelector(this.GRADIENT_ANGLE_INPUT_SELECTOR) as HTMLInputElement;
    gradientAngleInputNode?.addEventListener('input', () => {
      if(this.output.gradient) {
        this.output.gradient.angle = parseInt(gradientAngleInputNode.value);
        this.updateOutput();
      }
    });
    this.assignViewsVisibilityEvents();
  }

  assignViewsVisibilityEvents(): void {
    const importViewNode = this.node.querySelector(this.GRADIENT_IMPORT_VIEW_SELECTOR) as HTMLElement;
    const openImportViewButtonNode = this.node.querySelector(this.GRADIENT_IMPORT_VIEW_OPEN_BUTTON_SELECTOR) as HTMLElement;
    const closeImportViewButtonNode = importViewNode.querySelector(this.GRADIENT_IMPORT_VIEW_CLOSE_BUTTON_SELECTOR) as HTMLElement;
    const exportViewNode = this.node.querySelector(this.GRADIENT_EXPORT_VIEW_SELECTOR) as HTMLElement;
    const openExportViewButtonNode = this.node.querySelector(this.GRADIENT_EXPORT_VIEW_OPEN_BUTTON_SELECTOR) as HTMLElement;
    const closeExportViewButtonNode = exportViewNode.querySelector(this.GRADIENT_EXPORT_VIEW_CLOSE_BUTTON_SELECTOR) as HTMLElement;

    openImportViewButtonNode.addEventListener('click', () => {
      importViewNode.classList.remove(this.HIDE_OVERLAY_VIEW_CLASS);
      exportViewNode.classList.add(this.HIDE_OVERLAY_VIEW_CLASS);
    });
    closeImportViewButtonNode.addEventListener('click', () => {
      importViewNode.classList.add(this.HIDE_OVERLAY_VIEW_CLASS);
    });
    openExportViewButtonNode.addEventListener('click', () => {
      exportViewNode.classList.remove(this.HIDE_OVERLAY_VIEW_CLASS);
      importViewNode.classList.add(this.HIDE_OVERLAY_VIEW_CLASS);
    });
    closeExportViewButtonNode.addEventListener('click', () => {
      exportViewNode.classList.add(this.HIDE_OVERLAY_VIEW_CLASS);
    });
  }

  reloadStoredData(storedData: ProfilePictureFrame | null): void {
    const frameSizeInputNode = this.node.querySelector(this.FRAME_SIZE_INPUT_SELECTOR) as HTMLInputElement;
    const gradientAngleInputNode = this.node.querySelector(this.GRADIENT_ANGLE_INPUT_SELECTOR) as HTMLInputElement;
    if(storedData?.size || storedData?.size === 0) {
      frameSizeInputNode.value = storedData.size.toString();
    }
    if(storedData?.gradient) {
      if(storedData?.gradient?.angle || storedData?.gradient?.angle === 0) {
        gradientAngleInputNode.value = storedData.gradient.angle.toString();
      }
      if(storedData?.gradient?.steps && storedData?.gradient?.steps?.length > 0) {
        storedData?.gradient?.steps?.forEach(gradientItem => {
          this.addNewStep(gradientItem);
        });
      } else {
        this.generateDefaultGradient();
      }
    }
  }
  
  // --------------- OUTPUT MANAGEMENT

  updateOutput(): void {
    this.output = PROFILE_PICTURE_FRAME_INTERFACE_INIT;
    (this.output.gradient as Gradient).steps = [];
    this.templateSteps.forEach((step, i) => {
      const colorCode = (step.querySelector(this.STEP_COLOR_INPUT_SELECTOR) as HTMLInputElement).value;
      const stepPosition = parseInt((step.querySelector(this.STEP_POSITION_INPUT_SELECTOR) as HTMLInputElement).value);
      if(colorCode && (stepPosition >= 0 && stepPosition <= 100)) {
        ((this.output.gradient as Gradient).steps as Step[]).push({
          colorCode: colorCode,
          position: stepPosition
        });
      }
    });
    const frameSizeInputNode = this.node.querySelector(this.FRAME_SIZE_INPUT_SELECTOR) as HTMLInputElement;
    const gradientAngleInputNode = this.node.querySelector(this.GRADIENT_ANGLE_INPUT_SELECTOR) as HTMLInputElement;
    this.output.size = parseInt(frameSizeInputNode.value);
    if(this.output.gradient) {
      this.output.gradient.angle = parseInt(gradientAngleInputNode.value);
    }
    ((this.output.gradient as Gradient).steps as Step[]).sort( (a: Step, b: Step) => ((a.position as number + 1 || 9999) - (b.position as number + 1 || 9999)) );
    localStorage.setItem(this.LAST_GRADIENT_DATA_STORAGE_KEY, JSON.stringify(this.output));
    this.updateExport();
    this.triggerOutput();
  }
  
  updateExport(): void {
    const exportInputNode = this.node.querySelector(this.GRADIENT_EXPORT_INPUT_SELECTOR) as HTMLInputElement;
    exportInputNode.value = JSON.stringify(this.output);
  }

  importGradient(): void {
    const importInputNode = this.node.querySelector(this.GRADIENT_IMPORT_INPUT_SELECTOR) as HTMLInputElement;
    const importedGradient = JSON.parse(importInputNode.value) as ProfilePictureFrame;
    this.templateSteps.forEach(step => this.deleteStep(step));
    importedGradient.gradient?.steps?.forEach(step => {
      const newTemplateStep = this.addNewStep(step);
      this.assignEventsToStep(newTemplateStep);
    });
    const gradientAngleInputNode = this.node.querySelector(this.GRADIENT_ANGLE_INPUT_SELECTOR) as HTMLInputElement;
    const frameSizeInputNode = this.node.querySelector(this.FRAME_SIZE_INPUT_SELECTOR) as HTMLInputElement;
    frameSizeInputNode.value = (importedGradient.size || 10).toString();
    gradientAngleInputNode.value = (importedGradient.gradient?.angle || 45).toString();
    importInputNode.value = '';
    this.sortSteps();
    this.updateOutput();
  }

  triggerOutput() {
    this.onChange = new CustomEvent(GRADIENT_CHANGE_EVENT_NAME, {
      detail: {
        profilePictureData: this.output
      },
      bubbles: true,
      cancelable: true
    }) as CustomEvent<GradientChangeEvent>;
    document.dispatchEvent(this.onChange);
  }
}