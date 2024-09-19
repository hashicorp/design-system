/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsCodeEditorSignature {
  // The arguments accepted by the component
  Args: {
    value: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
  };
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: HTMLDivElement;
}
// More info on types and signatures: https://hashicorp.atlassian.net/wiki/spaces/HDS/pages/3245932580/Using+Typescript

export default class HdsCodeEditor extends Component<HdsCodeEditorSignature> {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-code-editor'];

    // add a class based on the @xxx argument
    // classes.push(`hds-code-editor--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
