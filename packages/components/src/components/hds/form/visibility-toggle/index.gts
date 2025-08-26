/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';
import HdsIcon from '../../icon/index.gts';

export interface HdsFormVisibilityToggleSignature {
  Args: {
    ariaLabel?: string;
    ariaMessageText?: string;
    isVisible?: boolean;
  };
  Element: HTMLButtonElement;
}

const HdsFormVisibilityToggle: TOC<HdsFormVisibilityToggleSignature> =
  <template>
    <button
      class="hds-form-visibility-toggle"
      type="button"
      aria-label={{@ariaLabel}}
      ...attributes
    >
      <HdsIcon @name={{if @isVisible "eye" "eye-off"}} @size="16" />
      <span class="sr-only" aria-live="polite">{{@ariaMessageText}}</span>
    </button>
  </template>;

export default HdsFormVisibilityToggle;
