/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsFormRadioBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormRadioBase: TemplateOnlyComponent<HdsFormRadioBaseSignature> =
  <template>
    <input type="radio" class="hds-form-radio" ...attributes value={{@value}} />
  </template>;

export default HdsFormRadioBase;
