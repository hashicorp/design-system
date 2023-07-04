/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getElementId } from '@hashicorp/design-system-components/utils/hds-get-element-id';

export default class HdsFormSensitiveInputBaseComponent extends Component {
  @tracked isObfuscated = this.args.isObfuscated ?? true;

  @action
  onClickToggle() {
    this.isObfuscated = !this.isObfuscated;
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
   * @default 'Show sensitive content'
   */
  get ariaLabel() {
    if (this.args.ariaLabel) {
      return this.args.ariaLabel;
    } else if (this.isObfuscated) {
      return 'Show sensitive content';
    } else {
      return 'Hide sensitive content';
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
    } else if (this.isObfuscated) {
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
    let classes = ['hds-form-sensitive-input'];

    if (this.isObfuscated) {
      classes.push(`hds-form-sensitive-input--obfuscated`);
    } else {
      classes.push(`hds-form-sensitive-input--not-obfuscated`);
    }

    return classes.join(' ');
  }
}
