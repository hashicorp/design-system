/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsApplicationStateIndexComponent extends Component {
  get subtitle() {
    return this.args.subtitle || null;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-application-state'];

    // add a class based on the existence of @subtitle argument
    if (this.subtitle !== null) {
      classes.push(`hds-application-state--error`);
    }

    return classes.join(' ');
  }
}
