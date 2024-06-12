import Component from '@glimmer/component';

import type { HdsSideNavListSignature } from '../list/index';

// TODO! understand how this should be done "correctly"
// import type { PortalSignature } from 'ember-stargate/components/portal';
interface PortalSignature {
  Args: {
    target: string;
    renderInPlace?: boolean;
    fallback?: 'inplace';
  };
  Blocks: {
    default: [];
  };
}

export interface HdsSideNavPortalSignature {
  Args: PortalSignature['Args'] & {
    ariaLabel?: string;
    targetName?: string;
  };
  Blocks: HdsSideNavListSignature['Blocks'];
  Element: HTMLDivElement;
}

export default class HdsSideNavPortalComponent extends Component<HdsSideNavPortalSignature> {}
