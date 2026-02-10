/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsFormFileInputBaseSignature {
  Args: {
    id?: string;
    ariaDescribedBy?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormFileInputBase: TemplateOnlyComponent<HdsFormFileInputBaseSignature> =
  <template>
    <input
      class="hds-form-file-input hds-typography-body-200"
      id={{@id}}
      aria-describedby={{@ariaDescribedBy}}
      ...attributes
      type="file"
    />
  </template>;

export default HdsFormFileInputBase;
