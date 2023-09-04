/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsFormTextInputFieldComponent extends Component {
  @tracked isPasswordReadable = this.args.isPasswordReadable ?? false;
  @tracked hasVisibilityToggle = this.args.hasVisibilityToggle ?? true;
  @tracked type = this.args.type ?? 'text';

  /**
   * @param showVisibilityToggle
   * @type {boolean}
   * @default false
   */
  get showVisibilityToggle() {
    return this.args.type === 'password' && this.hasVisibilityToggle;
  }

  /**
   * @param visibilityToggleAriaLabel
   * @type {string}
   * @default 'Show password'
   */
  get visibilityToggleAriaLabel() {
    if (this.args.visibilityToggleAriaLabel) {
      return this.args.visibilityToggleAriaLabel;
    } else if (this.isPasswordReadable) {
      return 'Hide password';
    } else {
      return 'Show password';
    }
  }

  /**
   * @param visibilityToggleAriaMessageText
   * @type {string}
   * @default 'Password is now hidden'
   */
  get visibilityToggleAriaMessageText() {
    if (this.args.visibilityToggleAriaMessageText) {
      return this.args.visibilityToggleAriaMessageText;
    } else if (this.isPasswordReadable) {
      return 'Password is now visible';
    } else {
      return 'Password is now hidden';
    }
  }

  @action
  onClickTogglePasswordReadability() {
    this.isPasswordReadable = !this.isPasswordReadable;
    this.type = this.isPasswordReadable ? 'text' : 'password';
  }
}
