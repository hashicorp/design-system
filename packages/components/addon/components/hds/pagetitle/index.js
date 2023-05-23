/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsPagetitleIndexComponent extends Component {
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

  get title() {
    let { title } = this.args;
    return title;
  }

  get classNames() {
    let classes = ['hds-pagetitle'];

    // add a class based on the @xxx argument
    // classes.push(`hds-pagetitle--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
