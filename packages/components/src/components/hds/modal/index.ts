/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { getElementId } from '../../../utils/hds-get-element-id.ts';
import { buildWaiter } from '@ember/test-waiters';
import { modifier } from 'ember-modifier';

import type { WithBoundArgs } from '@glint/template';
import type { HdsModalSizes, HdsModalColors } from './types.ts';

import HdsDialogPrimitiveHeaderComponent from '../dialog-primitive/header.gts';
import HdsDialogPrimitiveBodyComponent from '../dialog-primitive/body.gts';
import HdsDialogPrimitiveFooterComponent from '../dialog-primitive/footer.gts';
import { HdsModalSizeValues, HdsModalColorValues } from './types.ts';

const waiter = buildWaiter('@hashicorp/design-system-components:modal');

export const DEFAULT_SIZE = HdsModalSizeValues.Medium;
export const DEFAULT_COLOR = HdsModalColorValues.Neutral;

export const SIZES: HdsModalSizes[] = Object.values(HdsModalSizeValues);
export const COLORS: HdsModalColors[] = Object.values(HdsModalColorValues);

export interface HdsModalSignature {
  Args: {
    isDismissDisabled?: boolean;
    size?: HdsModalSizes;
    color?: HdsModalColors;
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

export default class HdsModal extends Component<HdsModalSignature> {
  @tracked private _isOpen = false;
  private _element!: HTMLDialogElement;
  private _body!: HTMLElement;
  private _bodyInitialOverflowValue = '';
  private _clickOutsideToDismissHandler!: (event: MouseEvent) => void;

  get isDismissDisabled(): boolean {
    return this.args.isDismissDisabled ?? false;
  }

  get size(): HdsModalSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Modal" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  get color(): HdsModalColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Modal" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  get id(): string {
    return getElementId(this);
  }

  get classNames(): string {
    const classes = ['hds-modal'];

    // add a class based on the @size argument
    classes.push(`hds-modal--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-modal--color-${this.color}`);

    return classes.join(' ');
  }

  private _performCloseCleanup(): void {
    this._isOpen = false;

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

  @action registerOnCloseCallback(event: Event): void {
    if (
      !this.isDismissDisabled &&
      this.args.onClose &&
      typeof this.args.onClose === 'function'
    ) {
      this.args.onClose(event);
    }

    // If the dismissal of the modal is disabled, we keep the modal open/visible otherwise we mark it as closed
    if (this.isDismissDisabled) {
      // If, in a chain of events, the element is not attached to the DOM, the `showModal` would fail
      // so we add this safeguard condition that checks for the `<dialog>` to have a parent
      if (this._element.parentElement) {
        // As there is no way to `preventDefault` on `close` events, we call the `showModal` function
        // preserving the state of the modal dialog
        this._element.showModal();
      }
    } else {
      this._performCloseCleanup();
    }
  }

  private _registerDialog = modifier((element: HTMLDialogElement) => {
    // Store references of `<dialog>` and `<body>` elements
    this._element = element;
    this._body = document.body;

    if (this._body) {
      // Store the initial `overflow` value of `<body>` so we can reset to it
      this._bodyInitialOverflowValue =
        this._body.style.getPropertyValue('overflow');
    }

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this._element.addEventListener('close', this.registerOnCloseCallback, true);

    // If the modal dialog is not already open
    if (!this._element.open) {
      this.open();
    }

    // Note: because the Modal has the `@isDismissedDisabled` argument, we need to add our own click outside to dismiss logic. This is because `ember-focus-trap` treats the `focusTrapOptions` as static, so we can't update it dynamically if `@isDismissDisabled` changes.
    this._clickOutsideToDismissHandler = (event: MouseEvent) => {
      // check if the click is outside the modal and the modal is open
      if (!this._element.contains(event.target as Node) && this._isOpen) {
        if (!this.isDismissDisabled) {
          //  here we use `void` because `onDismiss` is an async function, but in reality we don't need to handle the result or wait for its completion
          void this.onDismiss();
        }
      }
    };

    document.addEventListener('click', this._clickOutsideToDismissHandler, {
      capture: true,
      passive: false,
    });

    return () => {
      // if the <dialog> is removed from the dom while open we emulate the close event
      if (this._isOpen) {
        this._performCloseCleanup();
      }

      this._element?.removeEventListener(
        'close',
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.registerOnCloseCallback,
        true
      );

      document.removeEventListener(
        'click',
        this._clickOutsideToDismissHandler,
        true
      );
    };
  });

  @action
  open(): void {
    // Make modal dialog visible using the native `showModal` method
    this._element.showModal();
    this._isOpen = true;

    // Prevent page from scrolling when the dialog is open
    if (this._body) this._body.style.setProperty('overflow', 'hidden');

    // Call "onOpen" callback function
    if (this.args.onOpen && typeof this.args.onOpen === 'function') {
      this.args.onOpen();
    }
  }

  @action
  // eslint-disable-next-line @typescript-eslint/require-await
  async onDismiss(): Promise<void> {
    // allow ember test helpers to be aware of when the `close` event fires
    // when using `click` or other helpers from '@ember/test-helpers'
    if (this._element.open) {
      const token = waiter.beginAsync();
      const listener = () => {
        waiter.endAsync(token);
        this._element.removeEventListener('close', listener);
      };
      this._element.addEventListener('close', listener);
    }

    // Make modal dialog invisible using the native `close` method
    this._element.close();
  }
}
