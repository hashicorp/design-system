/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDialogPrimitiveDescriptionSignature {
  Args: {
    contextualClass?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsDialogPrimitiveDescription =
  templateOnlyComponent<HdsDialogPrimitiveDescriptionSignature>();

export default HdsDialogPrimitiveDescription;
