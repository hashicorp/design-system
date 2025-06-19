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
import { registerDestructor } from '@ember/destroyable';

import type { WithBoundArgs } from '@glint/template';
import type Owner from '@ember/owner';
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
  private _clickHandler!: (event: MouseEvent) => void;

  constructor(owner: Owner, args: HdsModalSignature['Args']) {
    super(owner, args);

    console.log('Constructor invoked');

    registerDestructor(this, (): void => {
      console.group('registerDestructor');
      console.log('`registerDestructor` invoked');
      document.removeEventListener('click', this._clickHandler, true);
      console.log('removed `click` event listener');
      console.groupEnd();
    });
  }

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

  @action
  registerOnCloseCallback(event: Event): void {
    console.group('@action registerOnCloseCallback() invoked');
    if (
      !this.isDismissDisabled &&
      this.args.onClose &&
      typeof this.args.onClose === 'function'
    ) {
      this.args.onClose(event);
      console.log('this.args.onClose() invoked');
    }

    // If the dismissal of the modal is disabled, we keep the modal open/visible otherwise we mark it as closed
    if (this.isDismissDisabled) {
      // If, in a chain of events, the element is not attached to the DOM, the `showModal` would fail
      // so we add this safeguard condition that checks for the `<dialog>` to have a parent
      if (this._element.parentElement) {
        // As there is no way to `preventDefault` on `close` events, we call the `showModal` function
        // preserving the state of the modal dialog
        this._element.showModal();
        console.log('re-opened the modal with `this._element.showModal()` when dismiss is disabled');
      }
    } else {
      this._isOpen = false;
      console.log('close the modal setting `this._isOpen = false`');

      // Reset page `overflow` property
      if (this._body) {
        this._body.style.removeProperty('overflow');
        console.log('remove property `overflow` that we assigned before');
        if (this._bodyInitialOverflowValue === '') {
          console.log('initial overflow value was empty string');
          if (this._body.style.length === 0) {
            this._body.removeAttribute('style');
            console.log('entirely removed the `style` attribute because its lenght is 0');
          }
        } else {
          this._body.style.setProperty(
            'overflow',
            this._bodyInitialOverflowValue
          );
          console.log('set back initial overflow value that was stored as', this._bodyInitialOverflowValue);
        }
      }

      // Return focus to a specific element (if provided)
      if (this.args.returnFocusTo) {
        const initiator = document.getElementById(this.args.returnFocusTo);
        if (initiator) {
          initiator.focus();
          console.log('return focus to element declared as `this.args.returnFocusTo`');
        }
      }
    }
    console.groupEnd();
  }

  @action
  didInsert(element: HTMLDialogElement): void {
    console.group('@action didInsert() invoked');
    // Store references of `<dialog>` and `<body>` elements
    this._element = element;
    this._body = document.body;

    if (this._body) {
      // Store the initial `overflow` value of `<body>` so we can reset to it
      this._bodyInitialOverflowValue =
        this._body.style.getPropertyValue('overflow');
      console.log('stored initial `overflow` value for `body` as', this._bodyInitialOverflowValue);
    }

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this._element.addEventListener('close', this.registerOnCloseCallback, true);
    console.log('added event listener for `close` applied to this._element with `this.registerOnCloseCallback`');

    // If the modal dialog is not already open
    if (!this._element.open) {
      this.open();
      console.log('opening Dialog element via `this.open();`');
    }

    this._clickHandler = (event: MouseEvent) => {
      // check if the click is outside the modal and the modal is open
      if (!this._element.contains(event.target as Node) && this._isOpen) {
        if (!this.isDismissDisabled) {
          void this.onDismiss();
          console.log('executed `this.onDismiss()` inside `this._clickHandler`');
        }
      }
    };
    console.log('defined `this._clickHandler` callback');

    document.addEventListener('click', this._clickHandler, {
      capture: true,
      passive: false,
    });
    console.log('added event listener to `document` for `click` and assigned `this._documentClickHandler` callback');
    console.groupEnd();
  }

  @action
  willDestroyNode(): void {
    console.group('@action willDestroyNode() invoked');
    if (this._element) {
      this._element.removeEventListener(
        'close',
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.registerOnCloseCallback,
        true
      );
      console.log('removed event listener for `close` applied to this._element with `this.registerOnCloseCallback`');
    }
    console.groupEnd();
  }

  @action
  open(): void {
    console.group('@action open() invoked');
    // Make modal dialog visible using the native `showModal` method
    this._element.showModal();
    console.log('opened Dialog element via native call `this._element.showModal();`');
    this._isOpen = true;
    console.log('set `this._isOpen = true`');

    // Prevent page from scrolling when the dialog is open
    if (this._body) this._body.style.setProperty('overflow', 'hidden');
    console.log('set `overflow: hidden on `body` element');

    // Call "onOpen" callback function
    if (this.args.onOpen && typeof this.args.onOpen === 'function') {
      this.args.onOpen();
    }
    console.groupEnd();
  }

  @action
  // eslint-disable-next-line @typescript-eslint/require-await
  async onDismiss(): Promise<void> {
    console.group('async @action onDismiss() invoked');
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
    console.log('closed Dialog element via native call `this._element.close();`');
    console.groupEnd();
  }
}
