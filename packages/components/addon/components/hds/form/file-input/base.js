/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsFormFileInputBaseComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-file-input', 'hds-typography-body-100'];

    // add a class based on the @extraClass argument
    // classes.push(`hds-form-file-input--variant-${this.args.extraClass}`);

    return classes.join(' ');
  }
}
