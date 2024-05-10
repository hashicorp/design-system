/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';

export interface HdsDisclosurePrimitiveSignature {
  Args: {
    isOpen?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClose?: (...args: any[]) => void;
  };
  Blocks: {
    toggle: [
      {
        isOpen: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClickToggle: (...args: any[]) => void;
      }
    ];
    content: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close: (...args: any[]) => void;
      }
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsDisclosurePrimitiveComponent extends Component<HdsDisclosurePrimitiveSignature> {
  @tracked isOpen = this.args.isOpen ?? false;

  @action
  onClickToggle() {
    this.isOpen = !this.isOpen;
  }

  @action
  close() {
    // we schedule this afterRender to avoid an error in tests caused by updating `isOpen` multiple times in the same computation
    schedule('afterRender', () => {
      this.isOpen = false;
      // we call the "onClose" callback if it exists (and is a function)
      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }
    });
  }
}
