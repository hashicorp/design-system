/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsAppSideNavListSignature } from '../list/index';

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

export interface HdsAppSideNavPortalSignature {
  Args: PortalSignature['Args'] & {
    ariaLabel?: string;
    targetName?: string;
  };
  Blocks: HdsAppSideNavListSignature['Blocks'];
  Element: HTMLDivElement;
}

const HdsAppSideNavPortal =
  TemplateOnlyComponent<HdsAppSideNavPortalSignature>();

export default HdsAppSideNavPortal;
