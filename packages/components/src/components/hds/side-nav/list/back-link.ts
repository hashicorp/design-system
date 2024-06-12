import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsInteractiveSignature } from '../../interactive/';

export interface HdsSideNavListBackLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    text: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

const HdsSideNavListBackLinkComponent =
  TemplateOnlyComponent<HdsSideNavListBackLinkSignature>();

export default HdsSideNavListBackLinkComponent;
