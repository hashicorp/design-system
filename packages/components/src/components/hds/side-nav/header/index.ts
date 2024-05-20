import Component from '@glimmer/component';
interface HdsSideNavHeaderSignature {
  Blocks: {
    logo?: [];
    actions?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsSideNavHeaderComponent extends Component<HdsSideNavHeaderSignature> {}
