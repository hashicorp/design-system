/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsDialogPrimitiveOverlaySignature {
  Args: {
    contextualClass?: string;
  };
  Element: HTMLDivElement;
}

const HdsDialogPrimitiveOverlay: TemplateOnlyComponent<HdsDialogPrimitiveOverlaySignature> =
  <template>
    <div class="hds-dialog-primitive__overlay {{@contextualClass}}"></div>
  </template>;

export default HdsDialogPrimitiveOverlay;
