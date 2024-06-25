/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';

export const DEFAULT_SIZE = 'medium';
export const SIZES = ['small', 'medium'];

const NOOP = () => {};

export default class HdsDropdownToggleIconComponent extends Component {
  @tracked hasImage = true;

  constructor() {
    super(...arguments);
    if (!(this.args.icon || this.args.imageSrc)) {
      assert(
        '@icon or @imageSrc must be defined for "Hds::Dropdown::Toggle::Icon"'
      );
    }
  }

  @action
  onDidUpdateImageSrc() {
    this.hasImage = true;
  }

  @action
  onImageLoadError() {
    this.hasImage = false;
  }

  /**
   * @param text
   * @type {string}
   * @description The text of the `aria-label` applied to the toggle
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::Toggle::Icon" must have a valid value',
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
      `@size for "Hds::Dropdown::Toggle::Icon" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * @param iconSize
   * @type {string}
   * @default 24
   * @description ensures that the correct icon size is used
   */
  get iconSize() {
    if (this.args.size === 'medium' && !this.hasChevron) {
      // in this special case we use a larger SVG
      return '24';
    } else {
      // this is the default size (notice: for the "small" variant with chevron, we set the actual size to `12px` via CSS)
      return '16';
    }
  }

  /**
   * Indicates if a dropdown chevron icon should be displayed; should be displayed unless the "more-horizontal" icon is used.
   *
   * @param hasChevron
   * @type {boolean}
   * @default true
   */
  get hasChevron() {
    return this.args.hasChevron ?? true;
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
   * Get the class names to apply to the component.
   * @method ToggleIcon#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dropdown-toggle-icon'];

    // add a class based on the @size argument
    classes.push(`hds-dropdown-toggle-icon--size-${this.size}`);

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-dropdown-toggle-icon--is-open');
    }

    // add a class based on the @hasChevron argument
    if (this.hasChevron) {
      classes.push('hds-dropdown-toggle-icon--has-chevron');
    }

    return classes.join(' ');
  }
}
