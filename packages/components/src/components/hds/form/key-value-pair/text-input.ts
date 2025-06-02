/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import type Owner from '@ember/owner';

import type { HdsFormFieldSignature } from '../field';
import type { HdsFormTextInputBaseSignature } from '../text-input/base';
import type { HdsFormVisibilityToggleSignature } from '../visibility-toggle';

export interface HdsFormKeyValuePairTextInputSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> &
      HdsFormTextInputBaseSignature['Args'] & {
        ariaDescribedBy?: string;
    visibilityToggleAriaLabel?: HdsFormVisibilityToggleSignature['Args']['ariaLabel'];
          visibilityToggleAriaMessageText?: HdsFormVisibilityToggleSignature['Args']['ariaMessageText'];
  };
  Element: HTMLInputElement;
}

export default class HdsFormKeyValuePairTextInput extends Component<HdsFormKeyValuePairTextInputSignature> {
  @tracked private _isPasswordMasked = true;
  @tracked type;

  constructor(owner: Owner, args: HdsFormKeyValuePairTextInputSignature['Args']) {
    super(owner, args);
    this.type = this.args.type ?? 'text';
  }

  get hasVisibilityToggle(): boolean {
    return this.args.hasVisibilityToggle ?? true;
  }

  get showVisibilityToggle(): boolean {
    return this.args.type === 'password' && this.hasVisibilityToggle;
  }

  get visibilityToggleAriaLabel(): string | undefined {
    if (this.args.visibilityToggleAriaLabel) {
      return this.args.visibilityToggleAriaLabel;
    } else if (this._isPasswordMasked) {
      return 'Show password';
    } else {
      return 'Hide password';
    }
  }

  get visibilityToggleAriaMessageText(): string | undefined {
    if (this.args.visibilityToggleAriaMessageText) {
      return this.args.visibilityToggleAriaMessageText;
    } else if (this._isPasswordMasked) {
      return 'Password is hidden';
    } else {
      return 'Password is visible';
    }
  }

  @action
  onClickTogglePasswordReadability(): void {
    this._isPasswordMasked = !this._isPasswordMasked;
    this.type = this._isPasswordMasked ? 'password' : 'text';
  }
}
