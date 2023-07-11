/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getElementId } from '@hashicorp/design-system-components/utils/hds-get-element-id';

export default class HdsFormMaskedInputBaseComponent extends Component {
  @tracked isMasked = this.args.isMasked ?? true;

  @action
  onClickToggle() {
    this.isMasked = !this.isMasked;
  }

  /**
   * Calculates the unique ID to assign to the form control
   */
  get id() {
    return getElementId(this);
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Show masked content'
   */
  get ariaLabel() {
    if (this.args.ariaLabel) {
      return this.args.ariaLabel;
    } else if (this.isMasked) {
      return 'Show masked content';
    } else {
      return 'Hide masked content';
    }
  }

  /**
   * @param ariaMessageText
   * @type {string}
   * @default ''
   */
  get ariaMessageText() {
    if (this.args.ariaMessageText) {
      return this.args.ariaMessageText;
    } else if (this.isMasked) {
      return 'Input content is now hidden';
    } else {
      return 'Input content is now visible';
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-masked-input'];

    if (this.isMasked) {
      classes.push(`hds-form-masked-input--is-masked`);
    } else {
      classes.push(`hds-form-masked-input--is-not-masked`);
    }

    return classes.join(' ');
  }
}
