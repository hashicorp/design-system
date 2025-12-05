/**
 * Copyright IBM Corp. 2021, 2025
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
