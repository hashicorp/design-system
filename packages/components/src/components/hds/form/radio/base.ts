/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsFormRadioBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormRadioBaseComponent =
  templateOnlyComponent<HdsFormRadioBaseSignature>();

export default HdsFormRadioBaseComponent;
