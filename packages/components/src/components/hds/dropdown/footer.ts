/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDropdownFooterSignature {
  Args: {
    hasDivider?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsDropdownFooter = templateOnlyComponent<HdsDropdownFooterSignature>();

export default HdsDropdownFooter;
