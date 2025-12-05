/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsFormSuperSelectPlaceholderSignature {
  Args: {
    placeholder?: string;
  };
}

const HdsFormSuperSelectPlaceholder =
  templateOnlyComponent<HdsFormSuperSelectPlaceholderSignature>();

export default HdsFormSuperSelectPlaceholder;
