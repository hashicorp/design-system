import Component from '@glimmer/component';

export interface HdsSideNavBaseSignature {
  Blocks: {
    root?: [];
    header?: [];
    body?: [];
    footer?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsSideNavBaseComponent extends Component<HdsSideNavBaseSignature> {}
