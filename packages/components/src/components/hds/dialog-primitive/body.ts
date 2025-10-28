/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDialogPrimitiveBodySignature {
  Args: {
    contextualClass?: string;
    onDismiss?: (event: MouseEvent, ...args: unknown[]) => void;
  };
  Blocks: {
    default: [
      {
        close: (event: MouseEvent, ...args: unknown[]) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

const HdsDialogPrimitiveBody =
  templateOnlyComponent<HdsDialogPrimitiveBodySignature>();

export default HdsDialogPrimitiveBody;
