/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsTableThButtonTooltipComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'more information'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'more information';
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table__th-button', 'hds-table__th-button--tooltip'];

    return classes.join(' ');
  }
}
