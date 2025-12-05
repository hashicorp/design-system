/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsFormVisibilityToggleSignature {
  Args: {
    ariaLabel?: string;
    ariaMessageText?: string;
    isVisible?: boolean;
  };
  Element: HTMLButtonElement;
}

const HdsFormVisibilityToggle =
  templateOnlyComponent<HdsFormVisibilityToggleSignature>();

export default HdsFormVisibilityToggle;
