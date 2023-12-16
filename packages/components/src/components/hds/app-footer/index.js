/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsAppFooterIndexComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Footer items'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Footer items';
  }

  /**
   * @param theme
   * @type {string}
   * @description The component theme
   * @default 'light'
   */
  get theme() {
    return this.args.theme ?? 'light';
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-app-footer'];

    // add a class based on the @theme argument
    classes.push(`hds-app-footer--theme-${this.theme}`);

    return classes.join(' ');
  }
}
