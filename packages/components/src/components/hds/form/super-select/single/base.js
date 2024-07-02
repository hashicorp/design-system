/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import PowerSelectComponent from 'ember-power-select/components/power-select';
import anchoredPositionModifier from '../../../../../modifiers/hds-anchored-position.ts';

import { action } from '@ember/object';

const DEFAULT_HORIZONTAL_POSITION = 'bottom-start';
const HORIZONTAL_POSITION_MAPPING = {
  left: 'bottom-start',
  center: 'bottom',
  right: 'bottom-end',
};

export default class HdsSuperSelectSingleBaseComponent extends PowerSelectComponent {
  @action calculatePosition(trigger, content) {
    // use `hds-anchored-position` to calculate and set position
    anchoredPositionModifier(content, [trigger], {
      placement: this.args.horizontalPosition
        ? HORIZONTAL_POSITION_MAPPING[this.args.horizontalPosition]
        : DEFAULT_HORIZONTAL_POSITION,
      offsetOptions: 4,
      enableCollisionDetection: true,
    });
    // prevent PowerSelect from setting position
    return {};
  }

  /**
   * Determine if `@afterOptionsComponent` gets displayed
   * @param showAfterOptions
   * @type {boolean}
   * @default false
   */
  get showAfterOptions() {
    return this.args.showAfterOptions ?? this.args.afterOptionsContent ?? false;
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
   * Get the maxWidth to apply to the dropdown
   * @param dropdownMaxWidth
   * @type {string}
   * @default 'none'
   */
  get dropdownMaxWidthStyle() {
    const maxWidthStyle = {};
    if (this.args.dropdownMaxWidth) {
      maxWidthStyle['--hds-form-super-select-dropdown-max-width'] =
        this.args.dropdownMaxWidth;
    }
    return maxWidthStyle;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-super-select', 'hds-form-super-select-single'];

    // add a class based on the @matchTriggerWidth argument or whether dropdownMaxWidth is set
    if (this.args.matchTriggerWidth === false || this.args.dropdownMaxWidth) {
      classes.push('hds-form-super-select--dropdown-content-auto-width');
    }

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-super-select--is-invalid`);
    }

    return classes.join(' ');
  }
}
