/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export const DEFAULT_POSITION = 'bottom-right';
export const POSITIONS = [
  'bottom-left',
  'bottom-right',
  'top-left',
  'top-right',
];

export default class HdsDropdownIndexComponent extends Component {
  /**
   * @param listPosition
   * @type {string}
   * @default bottom-right
   * @description Determines the position of the "list"
   */
  get listPosition() {
    let { listPosition = DEFAULT_POSITION } = this.args;

    assert(
      `@listPosition for "Hds::Dropdown::Index" must be one of the following: ${POSITIONS.join(
        ', '
      )}; received: ${listPosition}`,
      POSITIONS.includes(listPosition)
    );

    return listPosition;
  }

  /**
   * Get the class names to apply to the element
   * @method classNames
   * @return {string} The "class" attribute to apply to the root element
   */
  get classNames() {
    let classes = ['hds-dropdown'];

    // add a class based on the @isInline argument
    if (this.args.isInline) {
      classes.push('hds-dropdown--is-inline');
    }

    return classes.join(' ');
  }

  /**
   * Get the class names to apply to the content
   * @method classNamesContent
   * @return {string} The "class" attribute to apply to the disclosed content
   */
  get classNamesContent() {
    let classes = ['hds-dropdown__content'];

    // add a class based on the @listPosition argument
    classes.push(`hds-dropdown__content--position-${this.listPosition}`);

    // add a class based on the @width argument
    if (this.args.width) {
      classes.push('hds-dropdown__content--fixed-width');
    }

    return classes.join(' ');
  }

  @action
  didInsertList(element) {
    let checkmarkItems = element.querySelectorAll(`[role="option"]`);
    if (checkmarkItems.length) {
      element.setAttribute('role', 'listbox');
    }
  }
}
