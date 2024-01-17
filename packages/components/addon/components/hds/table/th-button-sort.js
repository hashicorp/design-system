/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

const NOOP = () => {};

export default class HdsTableThButtonSortComponent extends Component {
  /**
   * @param icon
   * @type {string}
   * @private
   * @default swap-vertical
   * @description Determines which icon to use based on the sort order defined
   */
  get icon() {
    switch (this.args.sortOrder) {
      case 'asc':
        return 'arrow-up';
      case 'desc':
        return 'arrow-down';
      default:
        return 'swap-vertical';
    }
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'sort'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'sort';
  }

  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick() {
    let { onClick } = this.args;

    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table__th-button', 'hds-table__th-button--sort'];

    // add a class based on the @sortOrder argument
    if (this.args.sortOrder === 'asc' || this.args.sortOrder === 'desc') {
      classes.push(`hds-table__th-button--is-sorted`);
    }

    return classes.join(' ');
  }
}
