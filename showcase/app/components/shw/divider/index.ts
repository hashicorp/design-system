/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface ShwDividerSignature {
  Args: {
    level?: 2;
  };
  Element: HTMLHRElement;
}

const ShwDivider = templateOnlyComponent<ShwDividerSignature>();

export default ShwDivider;
