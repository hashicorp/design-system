/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsDialogPrimitiveOverlaySignature {
  Args: {
    contextualClass?: string;
  };
  Element: HTMLDivElement;
}

const HdsDialogPrimitiveOverlay: TOC<HdsDialogPrimitiveOverlaySignature> =
  <template>
    <div class="hds-dialog-primitive__overlay {{@contextualClass}}"></div>
  </template>;

export default HdsDialogPrimitiveOverlay;
