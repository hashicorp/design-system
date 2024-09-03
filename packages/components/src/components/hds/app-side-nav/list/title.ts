/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAppSideNavListTitleSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsAppSideNavListTitleComponent =
  TemplateOnlyComponent<HdsAppSideNavListTitleSignature>();

export default HdsAppSideNavListTitleComponent;
