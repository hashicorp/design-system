/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAppSideNavBaseSignature {
  Blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    root?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    header?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    footer?: any;
  };
  Element: HTMLDivElement;
}

const HdsAppSideNavBaseComponent =
  TemplateOnlyComponent<HdsAppSideNavBaseSignature>();

export default HdsAppSideNavBaseComponent;
