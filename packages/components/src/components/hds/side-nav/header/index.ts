/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsSideNavHeaderSignature {
  Blocks: {
    logo?: [];
    actions?: [];
  };
  Element: HTMLDivElement;
}

const HdsSideNavHeader = TemplateOnlyComponent<HdsSideNavHeaderSignature>();

export default HdsSideNavHeader;
