/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsSuperSelectMultipleIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  // NOTE: The searchPlaceholder doesn't currently work for the multiple select
  /**
   * Get the search placeholder text
   * @param searchPlaceholder
   * @type {string}
   * @default 'Search'
   */
  get searchPlaceholder() {
    return this.args.searchPlaceholder ?? 'Search';
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = [
      'hds-super-select',
      'hds-super-select-multiple',
      'hds-typography-body-200',
    ];

    // add a class based on the @matchTriggerWidth argument
    if (this.args.matchTriggerWidth === false) {
      classes.push('hds-super-select--match-trigger-width-false');
    }

    return classes.join(' ');
  }
}
