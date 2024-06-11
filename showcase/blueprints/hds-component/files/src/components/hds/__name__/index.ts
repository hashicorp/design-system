/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface Hds<%= classifiedModuleName %>Signature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component  
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template  
  Element: HTMLDivElement;
}

export default class Hds<%= classifiedModuleName %>Component extends Component<Hds<%= classifiedModuleName %>Signature> {
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
    let classes = ['hds-<%= kebabizedModuleName %>'];

    // add a class based on the @xxx argument
    // classes.push(`hds-<%= kebabizedModuleName %>--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
