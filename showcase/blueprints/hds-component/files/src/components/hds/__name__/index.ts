/**
 * Copyright IBM Corp. 2021, 2025
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
// More info on types and signatures: https://hashicorp.atlassian.net/wiki/spaces/HDS/pages/3245932580/Using+Typescript

export default class Hds<%= classifiedModuleName %> extends Component<Hds<%= classifiedModuleName %>Signature> {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor(owner: Owner, args: <%= classifiedModuleName %>Signature['Args']) {
  //   super(owner, args);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  get classNames() {
    const classes = ['hds-<%= kebabizedModuleName %>'];

    // add a class based on the @xxx argument
    // classes.push(`hds-<%= kebabizedModuleName %>--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
