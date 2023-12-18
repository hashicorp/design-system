/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

const NOOP = () => {};

export default class HdsTableThButtonSortComponent extends Component {
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

    // add a class based on the @isSorted argument
    if (this.args.isSorted) {
      classes.push(`hds-table__th-button--is-sorted`);
    }

    return classes.join(' ');
  }
}
