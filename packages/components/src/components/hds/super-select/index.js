/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const SELECTION_TYPES = ['single', 'multiple'];

export default class HdsSuperSelectIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  /**
   * Get selection type
   * @method selectionType
   * @return {string} The selection type.
   */
  get selectionType() {
    let { selectionType = 'single' } = this.args;

    assert(
      `@selectionType for "Hds::SuperSelect" must be one of the following: ${SELECTION_TYPES.join(
        ', '
      )}; received: ${selectionType}`,
      SELECTION_TYPES.includes(selectionType)
    );

    return selectionType;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-super-select'];

    // add a class based on the @xxx argument
    // classes.push(`hds-super-select--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
