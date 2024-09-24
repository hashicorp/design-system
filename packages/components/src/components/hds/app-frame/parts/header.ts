/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsAppFrameHeaderSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const HdsAppFrameHeader = TemplateOnlyComponent<HdsAppFrameHeaderSignature>();

export default HdsAppFrameHeader;
