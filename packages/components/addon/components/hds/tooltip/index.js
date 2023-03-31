/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsTooltipIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  get text() {
    return this.args.text;
  }

  get options() {
    return {
      // parse `content` strings as HTML
      allowHTML: true,
    };
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tooltip'];

    // add a class based on the @xxx argument
    // classes.push(`hds-tooltip--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
