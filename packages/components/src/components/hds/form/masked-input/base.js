/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getElementId } from '../../../../utils/hds-get-element-id';

export default class HdsFormMaskedInputBaseComponent extends Component {
  @tracked isContentMasked = this.args.isContentMasked ?? true;

  @action
  onClickToggleMasking() {
    this.isContentMasked = !this.isContentMasked;
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
  get visibilityToggleAriaLabel() {
    if (this.args.visibilityToggleAriaLabel) {
      return this.args.visibilityToggleAriaLabel;
    } else if (this.isContentMasked) {
      return 'Show masked content';
    } else {
      return 'Hide masked content';
    }
  }

  /**
   * @param ariaMessageText
   * @type {string}
   * @default 'Input content is now hidden'
   */
  get visibilityToggleAriaMessageText() {
    if (this.args.visibilityToggleAriaMessageText) {
      return this.args.visibilityToggleAriaMessageText;
    } else if (this.isContentMasked) {
      return 'Input content is hidden';
    } else {
      return 'Input content is visible';
    }
  }

  /**
   * @param copyButtonText
   * @type {string}
   * @default 'Copy masked content'
   */
  get copyButtonText() {
    if (this.args.copyButtonText) {
      return this.args.copyButtonText;
    } else {
      return 'Copy masked content';
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-masked-input'];

    if (this.isContentMasked) {
      classes.push(`hds-form-masked-input--is-masked`);
    } else {
      classes.push(`hds-form-masked-input--is-not-masked`);
    }

    return classes.join(' ');
  }
}
