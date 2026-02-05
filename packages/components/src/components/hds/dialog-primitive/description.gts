/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsDialogPrimitiveDescriptionSignature {
  Args: {
    contextualClass?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsDialogPrimitiveDescription: TemplateOnlyComponent<HdsDialogPrimitiveDescriptionSignature> =
  <template>
    <div
      class="hds-dialog-primitive__description hds-typography-body-200 hds-foreground-primary
        {{@contextualClass}}"
      ...attributes
    >
      {{yield}}
    </div>
  </template>;

export default HdsDialogPrimitiveDescription;
