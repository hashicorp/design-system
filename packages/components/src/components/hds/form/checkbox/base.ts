/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

interface HdsFormCheckboxBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormCheckboxBaseComponent =
  templateOnlyComponent<HdsFormCheckboxBaseSignature>();

export default HdsFormCheckboxBaseComponent;
