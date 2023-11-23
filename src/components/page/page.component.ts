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

  ready() {
    this.detectDevice();
    this.checkforSplashInit();
    this.addEventsToSplashButtons();
  }

  addEventsToSplashButtons(): void {
    const splashNode = document.querySelector(this.SPLASH_SCREEN_NODE_SELECTOR) as HTMLElement;
    const startButtonNode = splashNode.querySelector(this.START_BUTTON_SELECTOR) as HTMLElement;
    const guideButtonNode = splashNode.querySelector(this.GUIDE_BUTTON_SELECTOR) as HTMLElement;
    startButtonNode.addEventListener('click', () => { this.hideSplashScreen(); });
    guideButtonNode.addEventListener('click', () => { this.showGuideView(); });
  }
  
  hideSplashScreen(): void {
    const splashNode = document.querySelector(this.SPLASH_SCREEN_NODE_SELECTOR) as HTMLElement;
    splashNode.classList.add(this.SPLASH_SCREEN_CLOSED_CLASS);
    sessionStorage.setItem(
      this.SPLASH_SCREEN_VIEWED_STORAGE_KEY,
      this.SPLASH_SCREEN_VIEWED_VALUE.toString()
    );
  }
  
  forceHideSplashScreen(): void {
    const splashNode = document.querySelector(this.SPLASH_SCREEN_NODE_SELECTOR) as HTMLElement;
    splashNode.classList.add(this.SPLASH_SCREEN_HIDDEN_CLASS);
  }
  
  showGuideView(): void {
    const splashNode = document.querySelector(this.SPLASH_SCREEN_NODE_SELECTOR) as HTMLElement;
    const guideViewNode = splashNode.querySelector(this.GUIDE_VIEW_NODE_SELECTOR) as HTMLElement;
    guideViewNode.classList.add(this.GUIDE_VIEW_VISIBLE_CLASS);
  }
  
  hideGuideView(): void {
    const splashNode = document.querySelector(this.SPLASH_SCREEN_NODE_SELECTOR) as HTMLElement;
    const guideViewNode = splashNode.querySelector(this.GUIDE_VIEW_NODE_SELECTOR) as HTMLElement;
    guideViewNode.classList.remove(this.GUIDE_VIEW_VISIBLE_CLASS);
  }
  
  checkforSplashInit(): void {
    const isSessionInited: boolean = sessionStorage.getItem(this.SPLASH_SCREEN_VIEWED_STORAGE_KEY) === 'true';
    if(isSessionInited === this.SPLASH_SCREEN_VIEWED_VALUE)  {
      this.forceHideSplashScreen();
    }
  }
  
  detectDevice(): void {
    const DEVICE_DSK = 'desktop';
    //@ts-ignore
    const userAgentData = bowser.getParser(window.navigator.userAgent).parsedResult;
    if(userAgentData.platform.type !== DEVICE_DSK) {
      (document.querySelector('.unsupported-device-warning') as HTMLElement).classList.remove('hidden');
    }
  }
}