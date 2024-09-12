/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface ShwLabelSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLParagraphElement;
}

const ShwLabel = templateOnlyComponent<ShwLabelSignature>();

export default ShwLabel;
