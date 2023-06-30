/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsAccordionItemButtonComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method ItemButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-accordion-item__button'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-accordion-item__button--is-open');
    }

    // if parentContainsInteractive is true, then the button itself is "interactive", otherwise the whole toggle block is interactive (not the button)
    // (In truth the button is always interactive, the visual styling and behavior is the only real difference)
    if (this.args.parentContainsInteractive === false) {
      classes.push('hds-accordion-item__button--is-not-interactive');
    } else {
      classes.push('hds-accordion-item__button--is-interactive');
    }
    return classes.join(' ');
  }
}
