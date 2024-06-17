/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

interface HdsSideNavHeaderSignature {
  Blocks: {
    logo?: [];
    actions?: [];
  };
  Element: HTMLDivElement;
}

const HdsSideNavHeaderComponent =
  TemplateOnlyComponent<HdsSideNavHeaderSignature>();

export default HdsSideNavHeaderComponent;
