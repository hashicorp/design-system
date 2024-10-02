/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAppSideNavBaseSignature {
  Blocks: {
    root?: [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
  };
  Element: HTMLDivElement;
}

const HdsAppSideNavBase = TemplateOnlyComponent<HdsAppSideNavBaseSignature>();

export default HdsAppSideNavBase;
