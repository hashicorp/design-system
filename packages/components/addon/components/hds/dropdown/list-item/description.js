/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class HdsDropdownListItemDescriptionComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the item. If no text value is defined an error will be thrown
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ListItem::Description" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = [
      'hds-dropdown-list-item',
      'hds-dropdown-list-item--variant-description',
    ];

    // add classes for the typographic style
    classes.push('hds-typography-body-100');
    classes.push('hds-font-weight-regular');

    return classes.join(' ');
  }
}
