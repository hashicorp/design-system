/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAppFrameFooterSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameFooter = TemplateOnlyComponent<HdsAppFrameFooterSignature>();

export default HdsAppFrameFooter;
