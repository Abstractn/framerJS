import { AbsComponent } from 'abs-component';
import { Browser, Device, Os } from '../../general/enums';
import Bowser from 'bowser';

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
  private readonly UTIL_CLASS_PREFIX: string = 'ua';
  private readonly UTIL_BROWSER_CLASS_PREFIX: string = 'web';
  private readonly UTIL_OS_CLASS_PREFIX: string = 'os';
  private readonly UTIL_DEVICE_CLASS_PREFIX: string = 'dvc';

  init() {
    this.setUtilClasses();
  }

  ready() {}

  setUtilClasses() {
    const bowser = Bowser.getParser(window.navigator.userAgent);
    this.setBrowserClass( bowser.getBrowser() );
    this.setOsClass( bowser.getOS() );
    this.setDeviceClass( bowser.getPlatform() );
  }

  setBrowserClass(browserData: Bowser.Parser.Details) {
    const isChrome =  browserData?.name?.toLowerCase().includes(Browser.CHROME);
    const isEdge =    browserData?.name?.toLowerCase().includes(Browser.EDGE);
    const isFirefox = browserData?.name?.toLowerCase().includes(Browser.FIREFOX);
    const isOpera =   browserData?.name?.toLowerCase().includes(Browser.OPERA);
    const isSafari =  browserData?.name?.toLowerCase().includes(Browser.SAFARI);
    const isIE =      browserData?.name?.toLowerCase().includes(Browser.INTERNET_EXPLORER);

    const browserUtilPartialClass = `${this.UTIL_CLASS_PREFIX}-${this.UTIL_BROWSER_CLASS_PREFIX}-`;
    const browserUtilClass: string =
      isChrome  ? browserUtilPartialClass + Browser.CHROME :
      isEdge    ? browserUtilPartialClass + Browser.EDGE :
      isFirefox ? browserUtilPartialClass + Browser.FIREFOX :
      isOpera   ? browserUtilPartialClass + Browser.OPERA :
      isSafari  ? browserUtilPartialClass + Browser.SAFARI :
      isIE      ? browserUtilPartialClass + Browser.IE :
      browserUtilPartialClass + 'undefined';

    document.body.classList.add(browserUtilClass);
  }

  setOsClass(osData: Bowser.Parser.OSDetails) {
    const isWin =   osData?.name?.toLowerCase().includes(Os.WIN);
    const isMac =   osData?.name?.toLowerCase().includes(Os.MAC);
    const isLin =   osData?.name?.toLowerCase().includes(Os.LIN);
    const isDroid = osData?.name?.toLowerCase().includes(Os.DROID);
    const isIos =   osData?.name?.toLowerCase().includes(Os.IOS);

    const osUtilPartialClass = `${this.UTIL_CLASS_PREFIX}-${this.UTIL_OS_CLASS_PREFIX}-`;
    const osUtilClass: string =
      isWin   ? osUtilPartialClass + Os.WIN :
      isMac   ? osUtilPartialClass + Os.MAC :
      isLin   ? osUtilPartialClass + Os.LIN :
      isDroid ? osUtilPartialClass + Os.DROID :
      isIos   ? osUtilPartialClass + Os.IOS :
      osUtilPartialClass + 'undefined';

    document.body.classList.add(osUtilClass);
  }

  setDeviceClass(deviceData: Bowser.Parser.PlatformDetails) {
    const isMob = deviceData?.type?.toLowerCase().includes(Device.MOBILE);
    const isTab = deviceData?.type?.toLowerCase().includes(Device.TABLET);
    const isDsk = deviceData?.type?.toLowerCase().includes(Device.DESKTOP);

    const deviceUtilPartialClass = `${this.UTIL_CLASS_PREFIX}-${this.UTIL_DEVICE_CLASS_PREFIX}-`;
    const deviceUtilClass: string =
      isMob ? deviceUtilPartialClass + Device.MOB :
      isTab ? deviceUtilPartialClass + Device.TAB :
      isDsk ? deviceUtilPartialClass + Device.DSK :
      deviceUtilPartialClass + 'undefined';

    document.body.classList.add(deviceUtilClass);
  }
}