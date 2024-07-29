/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDropdownFooterSignature {
  Args: {
    hasDivider: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsDropdownFooterComponent =
  templateOnlyComponent<HdsDropdownFooterSignature>();

export default HdsDropdownFooterComponent;
