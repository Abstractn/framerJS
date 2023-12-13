import { AbsComponent } from 'abs-component';

export class PageComponent implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  private readonly SPLASH_SCREEN_NODE_SELECTOR: string = '.splash';
  private readonly START_BUTTON_SELECTOR: string = '.splash-button-start';
  private readonly GUIDE_BUTTON_SELECTOR: string = '.splash-button-help';
  private readonly GUIDE_VIEW_NODE_SELECTOR: string = '.splash-view-guide';
  private readonly SPLASH_SCREEN_CLOSED_CLASS: string = 'closed';
  private readonly SPLASH_SCREEN_HIDDEN_CLASS: string = 'hidden';
  private readonly GUIDE_VIEW_VISIBLE_CLASS: string = 'visible';
  //TODO move to config object
  private readonly SPLASH_SCREEN_VIEWED_STORAGE_KEY: string = 'abs.framerJs.splash.alreadySeen';
  private readonly SPLASH_SCREEN_VIEWED_VALUE: boolean = true;

  init() {}

  ready() {}
}