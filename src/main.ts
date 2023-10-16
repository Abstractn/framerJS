import './main.scss';

import { AbsComponentManager } from '../../main/lib/abs-component';

import { GradientGeneratorComponent } from './components/gradient-generator/gradient-generator.component';
import { CanvasPrinterComponent } from './components/canvas-printer/canvas-printer.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { PageComponent } from './components/page/page.component';

[
  GradientGeneratorComponent,
  CanvasPrinterComponent,
  ColorPickerComponent,
  PageComponent,
].forEach(Component => {
  AbsComponentManager.registerComponent(
    Component.prototype.constructor.name,
    Component
  );
});