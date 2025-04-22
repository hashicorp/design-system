/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsFormCheckboxBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormCheckboxBase: TOC<HdsFormCheckboxBaseSignature> = <template>
  <input
    type="checkbox"
    class="hds-form-checkbox"
    ...attributes
    value={{@value}}
  />
</template>;

export default HdsFormCheckboxBase;
