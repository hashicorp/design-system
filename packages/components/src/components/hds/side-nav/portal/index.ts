/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsSideNavListSignature } from '../list/index';

export interface HdsSideNavPortalSignature {
  Args: {
    ariaLabel?: string;
    targetName?: string;
  };
  Blocks: HdsSideNavListSignature['Blocks'];
  Element: HTMLDivElement;
}

const HdsSideNavPortal = TemplateOnlyComponent<HdsSideNavPortalSignature>();

export default HdsSideNavPortal;
