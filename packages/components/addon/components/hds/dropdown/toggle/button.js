/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_COLOR = 'primary';
export const SIZES = ['small', 'medium'];
export const COLORS = ['primary', 'secondary'];

const NOOP = () => {};

export default class HdsDropdownToggleButtonComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the button. If no text value is defined an error will be thrown.
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::Toggle::Button" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small` and `medium`
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Dropdown::Toggle::Button" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of button to be used; acceptable values are `primary` and  `secondary`
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Dropdown::Toggle::Button" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param isFullWidth
   * @type {boolean}
   * @default false
   * @description Indicates that a button should take up the full width of the parent container. The default is false.
   */
  get isFullWidth() {
    return this.args.isFullWidth ?? false;
  }

  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick() {
    let { onClick } = this.args;

    // notice: this is a guard used in case the toggle is used as standalone element (eg. in the showcase)
    // in reality it's always used inside the Dropdown main component as yielded component, so the onClick handler is always defined
    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }

  /**
   * @param badgeType
   * @type {string}
   * @default 'filled'
   * @description ensures that the correct Badge/BadgeCount type is used to meet contrast requirements
   */
  get badgeType() {
    return this.color !== 'primary' ? 'inverted' : 'filled';
  }

  /**
   * Get the class names to apply to the component.
   * @method ToggleButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dropdown-toggle-button'];

    // add a class based on the @size argument
    classes.push(`hds-dropdown-toggle-button--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-dropdown-toggle-button--color-${this.color}`);

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-dropdown-toggle-button--width-full');
    }

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-dropdown-toggle-button--is-open');
    }

    return classes.join(' ');
  }
}
