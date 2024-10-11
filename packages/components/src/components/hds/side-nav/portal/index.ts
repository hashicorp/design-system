/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsSideNavListSignature } from '../list/index';

// TODO! understand how this should be done "correctly"
// import type { PortalSignature } from 'ember-stargate/components/portal';
export interface PortalSignature {
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

const HdsSideNavPortal = TemplateOnlyComponent<HdsSideNavPortalSignature>();

export default HdsSideNavPortal;
