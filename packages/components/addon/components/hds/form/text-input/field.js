/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsFormTextInputFieldComponent extends Component {
  @tracked isPasswordMasked = true;
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
    } else if (this.isPasswordMasked) {
      return 'Show password';
    } else {
      return 'Hide password';
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
    } else if (this.isPasswordMasked) {
      return 'Password is hidden';
    } else {
      return 'Password is visible';
    }
  }

  @action
  onClickTogglePasswordReadability() {
    this.isPasswordMasked = !this.isPasswordMasked;
    this.type = this.isPasswordMasked ? 'password' : 'text';
  }
}
