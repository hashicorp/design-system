/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface ShwOutlinerSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const ShwOutliner = templateOnlyComponent<ShwOutlinerSignature>();

export default ShwOutliner;
