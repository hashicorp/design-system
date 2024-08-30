/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDialogPrimitiveWrapperSignature {
  Blocks: {
    header?: [];
    body?: [];
    footer?: [];
  };
  Element: HTMLDialogElement;
}

const HdsDialogPrimitiveWrapper =
  templateOnlyComponent<HdsDialogPrimitiveWrapperSignature>();

export default HdsDialogPrimitiveWrapper;
