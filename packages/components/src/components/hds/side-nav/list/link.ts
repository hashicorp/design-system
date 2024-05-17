import Component from '@glimmer/component';

import type { HdsInteractiveSignature } from '../../interactive';

export interface HdsSideNavListLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon?: string;
    text?: string;
    badge?: string;
    count?: string;
    hasSubItems?: boolean;
    isActive?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsSideNavListLinkComponent extends Component<HdsSideNavListLinkSignature> {}
