/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { getElementId } from '../form/utils/getElementId';
import { tracked } from '@glimmer/tracking';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_HAS_OVERLAY = true;
export const SIZES = ['medium', 'large'];

export default class HdsFlyoutIndexComponent extends Component {
  @tracked isOpen = false;

  /**
   * Sets the size of the flyout
   * Accepted values: medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

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
  get id() {
    return getElementId(this);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-flyout'];

    // add a class based on the @size argument
    classes.push(`hds-flyout--size-${this.size}`);

    return classes.join(' ');
  }

  @action
  didInsert(element) {
    // Store a reference of the `<dialog>` element
    this.element = element;

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
      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }

      this.isOpen = false;
    });

    // If the flyout dialog is not already open
    if (!this.element.open) {
      this.open();
    }
  }

  @action
  open() {
    // Make flyout dialog visible using the native `showModal` method
    this.element.showModal();
    this.isOpen = true;

    // Call "onOpen" callback function
    if (this.args.onOpen && typeof this.args.onOpen === 'function') {
      this.args.onOpen();
    }
  }

  @action
  onDismiss() {
    // Make flyout dialog invisible using the native `close` method
    this.element.close();
  }
}
