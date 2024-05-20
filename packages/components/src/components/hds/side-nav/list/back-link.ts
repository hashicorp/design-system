import Component from '@glimmer/component';

import type { HdsInteractiveSignature } from '../../interactive/';

export interface HdsSideNavListBackLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    text: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsSideNavListBackLinkComponent extends Component<HdsSideNavListBackLinkSignature> {}
