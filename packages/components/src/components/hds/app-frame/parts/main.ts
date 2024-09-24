/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAppFrameMainSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameMain = TemplateOnlyComponent<HdsAppFrameMainSignature>();

export default HdsAppFrameMain;
