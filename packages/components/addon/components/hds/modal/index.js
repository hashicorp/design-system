/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { getElementId } from '@hashicorp/design-system-components/utils/hds-get-element-id';
import { buildWaiter } from '@ember/test-waiters';
import { DEBUG } from '@glimmer/env';

let waiter;

// Notice: this code will get stripped out in production builds (DEBUG evaluates to `true` in dev/test builds, but `false` in prod builds)
if (DEBUG) {
  waiter = buildWaiter('@hashicorp/design-system-components:modal');
}

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_COLOR = 'neutral';
export const SIZES = ['small', 'medium', 'large'];
export const COLORS = ['neutral', 'warning', 'critical'];

export default class HdsModalIndexComponent extends Component {
  @tracked isOpen = false;
  @tracked isDismissDisabled = this.args.isDismissDisabled ?? false;

  /**
   * Sets the size of the modal dialog
   * Accepted values: small, medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

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
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

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
  get id() {
    return getElementId(this);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-modal'];

    // add a class based on the @size argument
    classes.push(`hds-modal--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-modal--color-${this.color}`);

    return classes.join(' ');
  }

  @action
  didInsert(element) {
    // Store references of `<dialog>` and `<body>` elements
    this.element = element;
    this.body = document.body;

    if (this.body) {
      // Store the initial `overflow` value of `<body>` so we can reset to it
      this.bodyInitialOverflowValue =
        this.body.style.getPropertyValue('overflow');
    }

    // Register `<dialog>` element for polyfilling if no native support is available
    if (!element.showModal) {
      Promise.all([import('dialog-polyfill'), import('dialog-polyfill-css')])
        .then(([dialogPolyfill]) => {
          const dialog = dialogPolyfill.default;
          if (dialog.registerDialog) {
            dialog.registerDialog(element);
            // This unscoped class is defined in the dialog polyfill: https://github.com/GoogleChrome/dialog-polyfill/blob/master/dist/dialog-polyfill.css#L33
            element.classList.add('fixed');
          }
        })
        .catch({});
    }

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    this.element.addEventListener('close', () => {
      if (
        !this.isDismissDisabled &&
        this.args.onClose &&
        typeof this.args.onClose === 'function'
      ) {
        this.args.onClose();
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
    });

    // If the modal dialog is not already open
    if (!this.element.open) {
      this.open();
    }
  }

  @action
  open() {
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
  async onDismiss() {
    // allow ember test helpers to be aware of when the `close` event fires
    // when using `click` or other helpers from '@ember/test-helpers'
    // Notice: this code will get stripped out in production builds (DEBUG evaluates to `true` in dev/test builds, but `false` in prod builds)
    if (DEBUG && this.element.open) {
      let token = waiter.beginAsync();
      let listener = () => {
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
