/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsFormCheckboxBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormCheckboxBase =
  templateOnlyComponent<HdsFormCheckboxBaseSignature>();

export default HdsFormCheckboxBase;
