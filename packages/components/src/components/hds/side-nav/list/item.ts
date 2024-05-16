import Component from '@glimmer/component';

export interface HdsSideNavListItemSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class HdsSideNavListItemComponent extends Component<HdsSideNavListItemSignature> {}
