import './main.scss';

import { AbsComponentManager } from 'abs-component';

import { GradientGeneratorComponent } from './components/gradient-generator/gradient-generator.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { PageComponent } from './components/page/page.component';
import { DynamicBackgroundComponent } from './components/dynamic-background/dynamic-background.component';

export const absComponentManager = new AbsComponentManager();

[
  GradientGeneratorComponent,
  ImageViewerComponent,
  ColorPickerComponent,
  PageComponent,
  DynamicBackgroundComponent,
].forEach(Component => {
  absComponentManager.registerComponent(
    Component.prototype.constructor.name,
    Component
  );
});
absComponentManager.initComponents();