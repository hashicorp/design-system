/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import type { HdsCopyButtonSignature } from '../../copy/button/index.ts';
import type { HdsFormVisibilityToggleSignature } from '../visibility-toggle/index.ts';
import { tracked } from '@glimmer/tracking';

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
  @tracked private _isContentMasked;

  constructor(owner: unknown, args: HdsFormMaskedInputBaseSignature['Args']) {
    super(owner, args);
    this._isContentMasked = this.args.isContentMasked ?? true;
  }

  @action
  onClickToggleMasking(): void {
    this._isContentMasked = !this._isContentMasked;
  }

  get id(): string {
    return getElementId(this);
  }

  get visibilityToggleAriaLabel(): string {
    if (this.args.visibilityToggleAriaLabel) {
      return this.args.visibilityToggleAriaLabel;
    } else if (this._isContentMasked) {
      return 'Show masked content';
    } else {
      return 'Hide masked content';
    }
  }

  get visibilityToggleAriaMessageText(): string {
    if (this.args.visibilityToggleAriaMessageText) {
      return this.args.visibilityToggleAriaMessageText;
    } else if (this._isContentMasked) {
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

    if (this._isContentMasked) {
      classes.push(`hds-form-masked-input--is-masked`);
    } else {
      classes.push(`hds-form-masked-input--is-not-masked`);
    }

    return classes.join(' ');
  }
}
