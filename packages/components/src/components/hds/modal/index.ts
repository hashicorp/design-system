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

export interface HdsModalIndexSignature {
  Args: {
    isDismissDisabled?: boolean;
    size?: HdsModalSizes;
    color?: HdsModalColors;
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

export default class HdsModalIndexComponent extends Component<HdsModalIndexSignature> {
  @tracked isOpen = false;
  @tracked isDismissDisabled = this.args.isDismissDisabled ?? false;
  element!: HTMLDialogElement;
  body!: HTMLElement;
  bodyInitialOverflowValue = '';

  /**
   * Sets the size of the modal dialog
   * Accepted values: small, medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
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

  /**
   * Sets the color of the modal dialog
   * Accepted values: neutral, warning, critical
   *
   * @param color
   * @type {string}
   * @default 'neutral'
   */
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
    const classes = ['hds-modal'];

    // add a class based on the @size argument
    classes.push(`hds-modal--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-modal--color-${this.color}`);

    return classes.join(' ');
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
      if (this.element.parentElement) {
        // As there is no way to `preventDefault` on `close` events, we call the `showModal` function
        // preserving the state of the modal dialog
        this.element.showModal();
      }
    } else {
      this.isOpen = false;
    }
  }

  @action
  didInsert(element: HTMLDialogElement): void {
    // Store references of `<dialog>` and `<body>` elements
    this.element = element;
    this.body = document.body;

    if (this.body) {
      // Store the initial `overflow` value of `<body>` so we can reset to it
      this.bodyInitialOverflowValue =
        this.body.style.getPropertyValue('overflow');
    }

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    this.element.addEventListener('close', this.registerOnCloseCallback, true);

    // If the modal dialog is not already open
    if (!this.element.open) {
      this.open();
    }
  }

  @action
  willDestroyNode(): void {
    if (this.element) {
      this.element.removeEventListener(
        'close',
        this.registerOnCloseCallback,
        true
      );
    }
  }

  @action
  open(): void {
    // Make modal dialog visible using the native `showModal` method
    this.element.showModal();
    this.isOpen = true;

    // Prevent page from scrolling when the dialog is open
    if (this.body) this.body.style.setProperty('overflow', 'hidden');

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
    if (this.element.open) {
      const token = waiter.beginAsync();
      const listener = () => {
        waiter.endAsync(token);
        this.element.removeEventListener('close', listener);
      };
      this.element.addEventListener('close', listener);
    }

    // Make modal dialog invisible using the native `close` method
    this.element.close();

    // Reset page `overflow` property
    if (this.body) {
      this.body.style.removeProperty('overflow');
      if (this.bodyInitialOverflowValue === '') {
        if (this.body.style.length === 0) {
          this.body.removeAttribute('style');
        }
      } else {
        this.body.style.setProperty('overflow', this.bodyInitialOverflowValue);
      }
    }
  }
}
