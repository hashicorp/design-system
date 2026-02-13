/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsFormCheckboxBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormCheckboxBase: TemplateOnlyComponent<HdsFormCheckboxBaseSignature> =
  <template>
    <input
      type="checkbox"
      class="hds-form-checkbox"
      ...attributes
      value={{@value}}
    />
  </template>;

export default HdsFormCheckboxBase;
