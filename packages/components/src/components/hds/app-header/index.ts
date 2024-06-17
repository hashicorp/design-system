/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsAppHeaderSignature {
  Blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalItems?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    utilityItems?: any;
  };
  Element: HTMLDivElement;
}
// More info on types and signatures: https://github.com/hashicorp/design-system/blob/main/wiki/TypeScript-Migration.md

export default class HdsAppHeaderComponent extends Component<HdsAppHeaderSignature> {
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
    const classes = ['hds-app-header'];

    // add a class based on the @xxx argument
    // classes.push(`hds-app-header--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
