/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

interface HdsAppSideNavHeaderSignature {
  Blocks: {
    logo?: [];
    actions?: [];
  };
  Element: HTMLDivElement;
}

const HdsAppSideNavHeaderComponent =
  TemplateOnlyComponent<HdsAppSideNavHeaderSignature>();

export default HdsAppSideNavHeaderComponent;
