import TemplateOnlyComponent from '@ember/component/template-only';

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

const HdsSideNavListLinkComponent =
  TemplateOnlyComponent<HdsSideNavListLinkSignature>();

export default HdsSideNavListLinkComponent;
