/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsDialogPrimitiveBodySignature {
  Args: {
    contextualClass?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsDialogPrimitiveBody: TOC<HdsDialogPrimitiveBodySignature> = <template>
  <div
    class="hds-dialog-primitive__body {{@contextualClass}}"
    tabindex="0"
    ...attributes
  >
    {{yield}}
  </div>
</template>;

export default HdsDialogPrimitiveBody;
