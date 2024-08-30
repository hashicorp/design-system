/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDialogPrimitiveOverlaySignature {
  Args: {
    contextualClass?: string;
  };
  Element: HTMLDivElement;
}

const HdsDialogPrimitiveOverlay =
  templateOnlyComponent<HdsDialogPrimitiveOverlaySignature>();

export default HdsDialogPrimitiveOverlay;
