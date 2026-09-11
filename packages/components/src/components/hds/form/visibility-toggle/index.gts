/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsIcon from '../../icon/index.gts';

export interface HdsFormVisibilityToggleSignature {
  Args: {
    ariaLabel?: string;
    ariaMessageText?: string;
    ariaMessageTextWhenVisible?: string;
    // notice: @isVisible actually tracks whether the eye icon is "open" or "closed"
    // @isVisible=true corresponds to the input's hidden state, false to the visible state
    isVisible?: boolean;
  };
  Element: HTMLButtonElement;
}

const HdsFormVisibilityToggle: TemplateOnlyComponent<HdsFormVisibilityToggleSignature> =
  <template>
    <button
      class="hds-form-visibility-toggle"
      type="button"
      aria-label={{@ariaLabel}}
      ...attributes
    >
      <HdsIcon @name={{if @isVisible "eye" "eye-off"}} @size="16" />
      <span class="sr-only" aria-live="polite">{{if
          @isVisible
          @ariaMessageText
          @ariaMessageTextWhenVisible
        }}</span>
    </button>
  </template>;

export default HdsFormVisibilityToggle;
