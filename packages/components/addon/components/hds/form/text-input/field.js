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
   * @param ariaLabel
   * @type {string}
   * @default 'Show password'
   */
  get ariaLabel() {
    if (this.args.ariaLabel) {
      return this.args.ariaLabel;
    } else if (this.isPasswordReadable) {
      return 'Hide password';
    } else {
      return 'Show password';
    }
  }

  /**
   * @param ariaMessageText
   * @type {string}
   * @default 'Password is now hidden'
   */
  get ariaMessageText() {
    if (this.args.ariaMessageText) {
      return this.args.ariaMessageText;
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
