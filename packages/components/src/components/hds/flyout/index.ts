/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { getElementId } from '../../../utils/hds-get-element-id.ts';
import { buildWaiter } from '@ember/test-waiters';
import type { WithBoundArgs } from '@glint/template';

import type { HdsFlyoutSizes } from './types.ts';

import { HdsFlyoutSizesValues } from './types.ts';
import HdsDialogPrimitiveBodyComponent from '../dialog-primitive/body.ts';
import HdsDialogPrimitiveDescriptionComponent from '../dialog-primitive/description.ts';
import HdsDialogPrimitiveFooterComponent from '../dialog-primitive/footer.ts';
import HdsDialogPrimitiveHeaderComponent from '../dialog-primitive/header.ts';

const waiter = buildWaiter('@hashicorp/design-system-components:flyout');

export const DEFAULT_SIZE = HdsFlyoutSizesValues.Medium;
export const DEFAULT_HAS_OVERLAY = true;
export const SIZES: string[] = Object.values(HdsFlyoutSizesValues);

export interface HdsFlyoutSignature {
  Args: {
    size?: HdsFlyoutSizes;
    returnFocusTo?: string;
    onOpen?: () => void;
    onClose?: (event: Event) => void;
  };
  Blocks: {
    default: [
      {
        Header?: WithBoundArgs<
          typeof HdsDialogPrimitiveHeaderComponent,
          'id' | 'onDismiss' | 'contextualClassPrefix'
        >;
        Description?: WithBoundArgs<
          typeof HdsDialogPrimitiveDescriptionComponent,
          'contextualClass'
        >;
        Body?: WithBoundArgs<
          typeof HdsDialogPrimitiveBodyComponent,
          'contextualClass'
        >;
        Footer?: WithBoundArgs<
          typeof HdsDialogPrimitiveFooterComponent,
          'onDismiss' | 'contextualClass'
        >;
      },
    ];
  };
  Element: HTMLDialogElement;
}

export default class HdsFlyout extends Component<HdsFlyoutSignature> {
  @tracked private _isOpen = false;
  private _dialogElement!: HTMLDialogElement;
  private _body!: HTMLElement;
  private _bodyInitialOverflowValue = '';

  /**
   * Sets the size of the flyout
   * Accepted values: medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size(): HdsFlyoutSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Flyout" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * Calculates the unique ID to assign to the title
   */
  get id(): string {
    return getElementId(this);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-flyout'];

    // add a class based on the @size argument
    classes.push(`hds-flyout--size-${this.size}`);

    return classes.join(' ');
  }

  @action registerOnCloseCallback(event: Event) {
    if (this.args.onClose && typeof this.args.onClose === 'function') {
      this.args.onClose(event);
    }

    this._isOpen = false;
  }

  @action
  didInsert(element: HTMLDialogElement): void {
    // Store references of `<dialog>` and `<body>` elements
    this._dialogElement = element;
    this._body = document.body;

    if (this._body) {
      // Store the initial `overflow` value of `<body>` so we can reset to it
      this._bodyInitialOverflowValue =
        this._body.style.getPropertyValue('overflow');
    }

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    this._dialogElement.addEventListener(
      'close',
      this.registerOnCloseCallback,
      true
    );

    // If the flyout dialog is not already open
    if (!this._dialogElement.open) {
      this.open();
    }
  }

  @action
  willDestroyNode(): void {
    if (this._dialogElement) {
      this._dialogElement.removeEventListener(
        'close',
        this.registerOnCloseCallback,
        true
      );
    }
  }

  @action
  open(): void {
    // Make flyout dialog visible using the native `showModal` method
    this._dialogElement.showModal();
    this._isOpen = true;

    // Prevent page from scrolling when the dialog is open
    if (this._body) this._body.style.setProperty('overflow', 'hidden');

    // Call "onOpen" callback function
    if (this.args.onOpen && typeof this.args.onOpen === 'function') {
      this.args.onOpen();
    }
  }

  @action
  async onDismiss(): Promise<void> {
    // allow ember test helpers to be aware of when the `close` event fires
    // when using `click` or other helpers from '@ember/test-helpers'
    // Notice: this code will get stripped out in production builds (DEBUG evaluates to `true` in dev/test builds, but `false` in prod builds)
    if (this._dialogElement.open) {
      const token = waiter.beginAsync();
      const listener = () => {
        waiter.endAsync(token);
        this._dialogElement.removeEventListener('close', listener);
      };
      this._dialogElement.addEventListener('close', listener);
    }

    // Make flyout dialog invisible using the native `close` method
    this._dialogElement.close();

    // Reset page `overflow` property
    if (this._body) {
      this._body.style.removeProperty('overflow');
      if (this._bodyInitialOverflowValue === '') {
        if (this._body.style.length === 0) {
          this._body.removeAttribute('style');
        }
      } else {
        this._body.style.setProperty(
          'overflow',
          this._bodyInitialOverflowValue
        );
      }
    }

    // Return focus to a specific element (if provided)
    if (this.args.returnFocusTo) {
      const initiator = document.getElementById(this.args.returnFocusTo);
      if (initiator) {
        initiator.focus();
      }
    }
  }
}
