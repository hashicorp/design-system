/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsApplicationStateIndexComponent extends Component {
  /**
   * The error code to display in the footer.
   *
   * @param errorCode
   * @type {string}
   * @default null
   */
  get errorCode() {
    return this.args.errorCode || null;
  }

  /**
   * Indicate if the footer should have a top border or not.
   *
   * @param hasDivider
   * @type {boolean}
   * @default false
   */
  get hasDivider() {
    return this.args.hasDivider || false;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-application-state'];

    // add a class based on the existence of @errorCode argument
    if (this.errorCode !== null) {
      classes.push(`hds-application-state--error`);
    }

    // add a class based on the existence of @hasDivider argument
    if (this.hasDivider) {
      classes.push(`hds-application-state--has-divider`);
    }

    return classes.join(' ');
  }
}
