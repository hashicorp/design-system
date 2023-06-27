/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsAccordionItemIndexComponent extends Component {
  @tracked isOpen = this.args.isOpen ?? false;

  /**
   * Generates a unique ID for the Content
   *
   * @param contentId
   */
  contentId = 'content-' + guidFor(this);

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Toggle display'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Toggle display';
  }

  /**
   * @param isInteractive
   * @type {boolean}
   * @default true
   */
  get isInteractive() {
    return this.args.isInteractive ?? true;
  }

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
    let classes = ['hds-accordion-item'];

    // add a class based on the @isOpen argument
    if (this.isOpen) {
      classes.push('hds-accordion-item--is-open');
    }

    if (this.isInteractive) {
      // Entire accordion item including the chevron is interactive:
      classes.push('hds-accordion-item--is-interactive');
    } else {
      // Only chevron is clickable:
      classes.push('hds-accordion-item--is--not-interactive');
    }

    return classes.join(' ');
  }
}
