import { AbsComponent } from 'abs-component';

export class DynamicBackgroundComponent implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  init() {}

  ready() {}

  //TODO
  // to simulate background animation on gradient change
  // create logic that toggles between `.background-1` and `.background-2`
  // setting the updated gradient and increasing or decreasing one of the two node's opacity
}