/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsAccordionRowIndexComponent extends Component {
  @tracked isOpen = this.args.isOpen ?? false;

  @action
  toggle() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-accordion-row'];

    // add a class based on the @isOpen argument
    if (this.isOpen) {
      classes.push('hds-accordion-row--is-open');
    }

    return classes.join(' ');
  }
}
