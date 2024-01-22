import { AbsComponent } from 'abs-component';
import { } from '../../general/consts';
import { Gradient, ProfilePictureFrame, Step } from '../../general/interfaces';

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
  // TODO delete
  //private readonly GRADIENT_CHANGE_EVENT_NAME: string = GRADIENT_CHANGE_EVENT_NAME;

  private isComponentInited: boolean = false;
  private stepTemplateNode: HTMLElement | null = null;
  private templateSteps: NodeListOf<HTMLElement> | [] = [];
  // TODO delete
  //private output: ProfilePictureFrame = PROFILE_PICTURE_FRAME_INTERFACE_INIT;
  // TODO delete
  //private onChange = new CustomEvent(this.GRADIENT_CHANGE_EVENT_NAME, {});

  init() {}

  ready() {}
}