/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

const NOOP = () => {};

export default class HdsDropdownToggleButtonComponent extends Component {
  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick() {
    let { onClick } = this.args;

    // notice: this is a guard used in case the toggle is used as standalone element (eg. in the showcase)
    // in reality it's always used inside the Reveal main component as yielded component, so the onClick handler is always defined
    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method ToggleButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-reveal__toggle-button'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-reveal__toggle-button--is-open');
    }

    return classes.join(' ');
  }
}
