/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsAccordionRowIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-accordion-row'];

    // add a class based on the @xxx argument
    // classes.push(`hds-accordion-row--[variant]-${this.xxx}`);

    // add a class based on the @isOpen argument
    // if (this.args.isOpen) {
    //   classes.push('hds-accordion-row--is-open');
    // }

    return classes.join(' ');
  }
}
