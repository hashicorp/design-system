/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import PowerSelectComponent from 'ember-power-select/components/power-select';

export default class HdsSuperSelectSingleBaseComponent extends PowerSelectComponent {
  /**
   * Determine if `@afterOptionsComponent` gets displayed
   * @param showAfterOptions
   * @type {boolean}
   * @default false
   */
  get showAfterOptions() {
    return this.args.showAfterOptions ?? false;
  }

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
      'hds-form-super-select',
      'hds-form-super-select-single',
      'hds-typography-body-200',
    ];

    // add a class based on the @matchTriggerWidth argument
    if (this.args.matchTriggerWidth === false) {
      classes.push('hds-form-super-select--match-trigger-width-false');
    }

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-super-select--is-invalid`);
    }

    return classes.join(' ');
  }
}
