/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsAlertTextComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method AlertText#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-alert__text'];

    // Add typography classes based on @type argument
    if (this.args.type === 'compact') {
      classes.push('hds-typography-body-100');
    } else {
      classes.push('hds-typography-body-200');
    }

    return classes.join(' ');
  }
}
