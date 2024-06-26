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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickToggle?: (...args: any[]) => void;
  };
  Blocks: {
    toggle: [
      {
        isOpen: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClickToggle: (...args: any[]) => void;
      },
    ];
    content: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close: (...args: any[]) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsDisclosurePrimitiveComponent extends Component<HdsDisclosurePrimitiveSignature> {
  @tracked _isOpen = false;
  @tracked _isControlled = this.args.isOpen !== undefined;

  get isOpen() {
    if (this._isControlled) {
      // if the state is controlled from outside, the argument overrides the internal state
      return this.args.isOpen ?? this._isOpen;
    } else {
      // if the state changes internally, the internal state overrides the argument
      return this._isOpen;
    }
  }

  set isOpen(value) {
    this._isOpen = value || false;
  }

  @action
  onClickToggle(): void {
    this.isOpen = !this.isOpen;
    this._isControlled = false;
    // we call the "onClickToggle" callback if it exists and it's a function
    if (
      this.args.onClickToggle &&
      typeof this.args.onClickToggle === 'function'
    ) {
      this.args.onClickToggle(this.isOpen);
    }
  }

  @action
  onStateChange() {
    if (this.args.isOpen !== undefined) {
      this.isOpen = this.args.isOpen;
    }
    this._isControlled = true;
  }

  @action
  close(): void {
    // we schedule this afterRender to avoid an error in tests caused by updating `isOpen` multiple times in the same computation
    schedule('afterRender', (): void => {
      this.isOpen = false;
      // we call the "onClose" callback if it exists (and is a function)
      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }
    });
  }
}
