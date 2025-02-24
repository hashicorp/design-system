/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import type { HdsCopyButtonSignature } from '../../copy/button/index.ts';
import type { HdsFormVisibilityToggleSignature } from '../visibility-toggle/index.ts';

export interface HdsFormMaskedInputBaseSignature {
  Args: {
    copyButtonText?: HdsCopyButtonSignature['Args']['text'];
    hasCopyButton?: boolean;
    isContentMasked?: boolean;
    isInvalid?: boolean;
    isMultiline?: boolean;
    id?: string;
    value?: string;
    visibilityToggleAriaLabel?: HdsFormVisibilityToggleSignature['Args']['ariaLabel'];
    visibilityToggleAriaMessageText?: HdsFormVisibilityToggleSignature['Args']['ariaMessageText'];
    width?: string;
    height?: string;
  };
  Element: HTMLElement;
}

export default class HdsFormMaskedInputBase extends Component<HdsFormMaskedInputBaseSignature> {
  @tracked _isContentMasked = true;
  @tracked private _isControlled = this.args.isContentMasked !== undefined;

  get isContentMasked(): boolean {
    if (this._isControlled) {
      // if the state is controlled from outside, the argument overrides the internal state
      return this.args.isContentMasked ?? this._isContentMasked;
    } else {
      // if the state changes internally, the internal state overrides the argument
      return this._isContentMasked;
    }
  }

  set isContentMasked(value) {
    this._isContentMasked = value || false;
  }

  @action
  onClickToggleMasking(): void {
    this.isContentMasked = !this.isContentMasked;
    this._isControlled = false;
  }

  private _manageState = modifier(() => {
    if (this.args.isContentMasked !== undefined) {
      this.isContentMasked = this.args.isContentMasked;
    }
    this._isControlled = true;

    return () => {};
  });

  get id(): string {
    return getElementId(this);
  }

  get visibilityToggleAriaLabel(): string {
    if (this.args.visibilityToggleAriaLabel) {
      return this.args.visibilityToggleAriaLabel;
    } else if (this.isContentMasked) {
      return 'Show masked content';
    } else {
      return 'Hide masked content';
    }
  }

  get visibilityToggleAriaMessageText(): string {
    if (this.args.visibilityToggleAriaMessageText) {
      return this.args.visibilityToggleAriaMessageText;
    } else if (this.isContentMasked) {
      return 'Input content is hidden';
    } else {
      return 'Input content is visible';
    }
  }

  get copyButtonText(): string {
    if (this.args.copyButtonText) {
      return this.args.copyButtonText;
    } else {
      return 'Copy masked content';
    }
  }

  get classNames(): string {
    const classes = ['hds-form-masked-input'];

    if (this.isContentMasked) {
      classes.push(`hds-form-masked-input--is-masked`);
    } else {
      classes.push(`hds-form-masked-input--is-not-masked`);
    }

    return classes.join(' ');
  }
}
