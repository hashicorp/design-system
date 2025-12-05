/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsAppSideNavListSignature } from '../list/index';

export interface HdsAppSideNavPortalSignature {
  Args: {
    ariaLabel?: string;
    targetName?: string;
  };
  Blocks: HdsAppSideNavListSignature['Blocks'];
  Element: HTMLDivElement;
}

const HdsAppSideNavPortal =
  TemplateOnlyComponent<HdsAppSideNavPortalSignature>();

export default HdsAppSideNavPortal;
