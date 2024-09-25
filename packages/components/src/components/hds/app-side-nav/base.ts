/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAppSideNavBaseSignature {
  Blocks: {
    root?: [];
    header?: [];
    body?: [];
    footer?: [];
  };
  Element: HTMLDivElement;
}

const HdsAppSideNavBase = TemplateOnlyComponent<HdsAppSideNavBaseSignature>();

export default HdsAppSideNavBase;
