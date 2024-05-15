/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsButtonSignature } from '../../button/';

export interface HdsRevealToggleButtonSignature {
  Args: {
    text: string;
    isOpen?: boolean;
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsRevealToggleButtonComponent extends Component<HdsRevealToggleButtonSignature> {
  /**
   * Get the class names to apply to the component.
   * @method ToggleButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-reveal__toggle-button'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-reveal__toggle-button--is-open');
    }

    return classes.join(' ');
  }
}
