/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsSideNavListTitleSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsSideNavListTitle =
  TemplateOnlyComponent<HdsSideNavListTitleSignature>();

export default HdsSideNavListTitle;
