/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsDialogPrimitiveBodySignature {
  Args: {
    contextualClass?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsDialogPrimitiveBody: TemplateOnlyComponent<HdsDialogPrimitiveBodySignature> =
  <template>
    <div
      class="hds-dialog-primitive__body {{@contextualClass}}"
      tabindex="0"
      ...attributes
    >
      {{yield}}
    </div>
  </template>;

export default HdsDialogPrimitiveBody;
