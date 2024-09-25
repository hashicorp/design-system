/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsDialogPrimitiveFooterSignature {
  Args: {
    contextualClass?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss?: (event: MouseEvent, ...args: any[]) => void;
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

const NOOP = (): void => {};

export default class HdsDialogPrimitiveFooter extends Component<HdsDialogPrimitiveFooterSignature> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss(): (event: MouseEvent, ...args: any[]) => void {
    const { onDismiss } = this.args;

    // notice: this is to make sure the function is always defined when consumers add `{{on 'click' F.close}}` to a button in the DialogFooter.
    // in reality it's always used inside the main components as a yielded component, so the onDismiss handler is always defined
    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return NOOP;
    }
  }
}
