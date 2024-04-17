/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import PowerSelectComponent from 'ember-power-select/components/power-select';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HdsSuperSelectMultipleBaseComponent extends PowerSelectComponent {
  @tracked powerSelectAPI;
  @tracked showOnlySelected = false;
  @tracked showNoSelectedMessage = false;

  get selectedCount() {
    return this.selected?.length || '0';
  }

  get optionsCount() {
    return this.options?.length || '0';
  }

  get resultCountMessage() {
    return `${this.selectedCount} selected of ${this.optionsCount} total`;
  }

  @action
  setPowerSelectAPI(powerSelectAPI) {
    if (typeof this.args.registerAPI === 'function') {
      this.args.registerAPI(powerSelectAPI);
    }
    this.powerSelectAPI = powerSelectAPI;
  }

  @action showSelected() {
    this.showNoSelectedMessage = this.selectedCount === '0';
    this.showOnlySelected = true;
  }

  @action showAll() {
    this.showNoSelectedMessage = false;
    this.showOnlySelected = false;
  }

  @action clearSelected() {
    this.powerSelectAPI.actions.select(null);
    // show all options after clearing all selection
    this.showNoSelectedMessage = false;
    this.showOnlySelected = false;
  }

  /**
   * Determine if `@afterOptionsComponent` gets displayed
   * @param showAfterOptions
   * @type {boolean}
   * @default true
   */
  get showAfterOptions() {
    return this.args.showAfterOptions ?? true;
  }

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
      'hds-form-super-select',
      'hds-form-super-select-multiple',
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

    // add a class based on the showOnlySelected
    if (this.showOnlySelected) {
      classes.push(`hds-form-super-select--show-only-selected`);
    }

    return classes.join(' ');
  }
}
