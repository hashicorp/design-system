/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsFormFileInputBaseSignature {
  Args: {
    id?: string;
    ariaDescribedBy?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormFileInputBase =
  templateOnlyComponent<HdsFormFileInputBaseSignature>();

export default HdsFormFileInputBase;
