/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

// import type { HdsSideNavListSignature } from '../list/index';

// TODO! understand how this should be done "correctly"
// import type { PortalSignature } from 'ember-stargate/components/portal';
interface PortalSignature {
  Args: {
    target: string;
    renderInPlace?: boolean;
    fallback?: 'inplace';
  };
  Blocks: {
    default?: [];
  };
}

export interface HdsSideNavPortalSignature {
  Args: PortalSignature['Args'] & {
    targetName?: string;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

const HdsSideNavPortal = TemplateOnlyComponent<HdsSideNavPortalSignature>();

export default HdsSideNavPortal;
