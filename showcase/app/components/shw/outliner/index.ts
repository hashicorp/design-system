/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface OutlinerComponentSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const OutlinerComponent = templateOnlyComponent<OutlinerComponentSignature>();

export default OutlinerComponent;
