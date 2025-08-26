/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsFormFileInputBaseSignature {
  Args: {
    id?: string;
    ariaDescribedBy?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormFileInputBase: TOC<HdsFormFileInputBaseSignature> = <template>
  <input
    class="hds-form-file-input hds-typography-body-200"
    id={{@id}}
    aria-describedby={{@ariaDescribedBy}}
    ...attributes
    type="file"
  />
</template>;

export default HdsFormFileInputBase;
