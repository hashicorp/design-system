/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsFormToggleBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormToggleBase: TOC<HdsFormToggleBaseSignature> = <template>
  <div class="hds-form-toggle">
    <input
      class="hds-form-toggle__control"
      type="checkbox"
      ...attributes
      value={{@value}}
      role="switch"
    />
    <div class="hds-form-toggle__facade"></div>
  </div>
</template>;

export default HdsFormToggleBase;
