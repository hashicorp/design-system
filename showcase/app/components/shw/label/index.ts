/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface LabelComponentSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLParagraphElement;
}

const LabelComponent = templateOnlyComponent<LabelComponentSignature>();

export default LabelComponent;
