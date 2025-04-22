/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsFormRadioBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormRadioBase: TOC<HdsFormRadioBaseSignature> = <template>
  <input type="radio" class="hds-form-radio" ...attributes value={{@value}} />
</template>;

export default HdsFormRadioBase;
