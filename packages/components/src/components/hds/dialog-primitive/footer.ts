/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDialogPrimitiveFooterSignature {
  Args: {
    contextualClass?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss: (event: MouseEvent, ...args: any[]) => void;
  };
  Blocks: {
    default: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close: (event: MouseEvent, ...args: any[]) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

const HdsDialogPrimitiveFooterComponent =
  templateOnlyComponent<HdsDialogPrimitiveFooterSignature>();

export default HdsDialogPrimitiveFooterComponent;
