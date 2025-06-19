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
import type { HdsModalSizes, HdsModalColors } from './types.ts';

import HdsDialogPrimitiveHeaderComponent from '../dialog-primitive/header.ts';
import HdsDialogPrimitiveBodyComponent from '../dialog-primitive/body.ts';
import HdsDialogPrimitiveFooterComponent from '../dialog-primitive/footer.ts';
import { HdsModalSizeValues, HdsModalColorValues } from './types.ts';

const waiter = buildWaiter('@hashicorp/design-system-components:modal');

export const DEFAULT_SIZE = HdsModalSizeValues.Medium;
export const DEFAULT_COLOR = HdsModalColorValues.Neutral;

export const SIZES: string[] = Object.values(HdsModalSizeValues);
export const COLORS: string[] = Object.values(HdsModalColorValues);

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
  private _documentClickHandler!: (event: MouseEvent) => void;

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

  // INSERT / OPEN

  @action
  didInsert(element: HTMLDialogElement): void {
    console.group('@action didInsert() invoked');
    // Store references of `<dialog>` and `<body>` elements
    this._element = element;
    this._body = document.body;

    // If the modal dialog is not already open
    if (!this._element.open) {
      this.openModalProgrammatically();
      console.log(
        'opening programmatically the Dialog element via `this.openModalProgrammatically();`'
      );

      this.setupXyx();
      console.log('setup performed via `this.setupXyx()`');
    }

    console.groupEnd();
  }

  @action
  setupXyx(): void {
    console.group('@action setupXyx() invoked');

    // define event listener and assign it to the `document` (for click outside dismiss)
    this._documentClickHandler = (event: MouseEvent) => {
      // check if the click is outside the modal and the modal is open
      if (!this._element.contains(event.target as Node) && this._isOpen) {
        if (!this.isDismissDisabled) {
          void this.onManualDismiss();
          console.log(
            'executed `this.onManualDismiss()` inside `this._documentClickHandler`'
          );
        }
      }
    };
    console.log('defined `this._documentClickHandler` callback');

    document.addEventListener('click', this._documentClickHandler, {
      capture: true,
      passive: false,
    });
    console.log(
      'added event listener to `document` for `click` and assigned `this._documentClickHandler` callback'
    );

    // register "onDialogNativeClose" callback function to be called when a native 'close' event is dispatched
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this._element.addEventListener('close', this.onDialogNativeClose, true);
    console.log(
      'added event listener for `close` applied to this._element with `this.onDialogNativeClose`'
    );

    // prevent page from scrolling when the dialog is open
    if (this._body) {
      // Store the initial `overflow` value of `<body>` so we can reset to it
      this._bodyInitialOverflowValue =
        this._body.style.getPropertyValue('overflow');
      console.log(
        'stored initial `overflow` value for `body` as',
        this._bodyInitialOverflowValue
      );

      this._body.style.setProperty('overflow', 'hidden');
      console.log('set `overflow: hidden on `body` element');
    }

    console.groupEnd();
  }

  @action
  openModalProgrammatically(): void {
    console.group('@action open() invoked');
    // Make modal dialog visible using the native `showModal` method
    this._element.showModal();
    console.log(
      'opened Dialog element via native call `this._element.showModal();`'
    );
    this._isOpen = true;
    console.log('set `this._isOpen = true`');

    // Call "onOpen" callback function
    if (this.args.onOpen && typeof this.args.onOpen === 'function') {
      this.args.onOpen();
    }
    console.groupEnd();
  }

  // DISMISS / CLOSE

  @action
  // eslint-disable-next-line @typescript-eslint/require-await
  async onManualDismiss(): Promise<void> {
    console.group('async @action onManualDismiss() invoked');
    // allow ember test helpers to be aware of when the `close` event fires
    // when using `click` or other helpers from '@ember/test-helpers'
    if (this._element.open) {
      const token = waiter.beginAsync();
      const listener = () => {
        waiter.endAsync(token);
        this._element.removeEventListener('close', listener);
        console.log('removed event listener for `close` with `listener`');
      };
      this._element.addEventListener('close', listener);
      console.log('added back event listener for `close` with `listener`');
    }

    // Make modal dialog invisible using the native `close` method
    this._element.close();
    console.log(
      'closed Dialog element via native call `this._element.close();`'
    );
    console.groupEnd();
  }

  @action
  onDialogNativeClose(event: Event): void {
    console.group('@action onDialogNativeClose() invoked');

    // If the dismissal of the modal is disabled, we keep the modal open/visible otherwise we mark it as closed
    if (this.isDismissDisabled) {
      // If, in a chain of events, the element is not attached to the DOM, the `showModal` would fail
      // so we add this safeguard condition that checks for the `<dialog>` to have a parent
      if (this._element.parentElement) {
        // As there is no way to `preventDefault` on `close` events, we call the `showModal` function
        // preserving the state of the modal dialog
        this._element.showModal();
        console.log(
          're-opened the modal with `this._element.showModal()` when dismiss is disabled'
        );
      }
    } else {
      this._isOpen = false;
      console.log('close the modal setting `this._isOpen = false`');

      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose(event);
        console.log('this.args.onClose() invoked');
      }
    }
    console.groupEnd();
  }

  @action
  willDestroyNode(): void {
    console.group('@action willDestroyNode() invoked');

    this.cleanupXyz();
    console.log('cleanup performed via `this.cleanupXyz()`');

    console.groupEnd();
  }

  @action
  cleanupXyz(): void {
    console.group('@action cleanupXyz() invoked');

    // remove event listener assigned to the `document` (for click outside dismiss)
    document.removeEventListener('click', this._documentClickHandler, true);
    console.log('removed `click` event listener');

    // remove event listener assigned to the `dialog` element
    if (this._element) {
      this._element.removeEventListener(
        'close',
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.onDialogNativeClose,
        true
      );
      console.log(
        'removed event listener for `close` applied to this._element with `this.onDialogNativeClose`'
      );
    }

    // reset page `overflow` property
    if (this._body) {
      this._body.style.removeProperty('overflow');
      console.log('remove property `overflow` that we assigned before');
      if (this._bodyInitialOverflowValue === '') {
        console.log('initial overflow value was empty string');
        if (this._body.style.length === 0) {
          this._body.removeAttribute('style');
          console.log(
            'entirely removed the `style` attribute because its lenght is 0'
          );
        }
      } else {
        this._body.style.setProperty(
          'overflow',
          this._bodyInitialOverflowValue
        );
        console.log(
          'set back initial overflow value that was stored as',
          this._bodyInitialOverflowValue
        );
      }
    }

    // return focus to a specific element (if provided)
    if (this.args.returnFocusTo) {
      const initiator = document.getElementById(this.args.returnFocusTo);
      if (initiator) {
        initiator.focus();
        console.log(
          'return focus to element declared as `this.args.returnFocusTo`'
        );
      }
    }
    console.groupEnd();
  }
}
