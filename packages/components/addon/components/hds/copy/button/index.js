/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export const DEFAULT_SIZE = 'medium';
export const SIZES = ['small', 'medium'];
export const DEFAULT_ICON = 'clipboard-copy';
export const SUCCESS_ICON = 'clipboard-checked';
export const ERROR_ICON = 'clipboard';
export const DEFAULT_STATUS = 'idle';

export default class HdsCopyButtonComponent extends Component {
  @tracked isSuccess = false;
  @tracked isError = false;
  @tracked status = DEFAULT_STATUS;
  @tracked timer;

  get icon() {
    let icon = DEFAULT_ICON;
    if (this.status === 'success') {
      icon = SUCCESS_ICON;
    } else if (this.status === 'error') {
      icon = ERROR_ICON;
    }
    return icon;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the copy/button; acceptable values are `small` and `medium`
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Copy::Button" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  get textToCopy() {
    return this.args.encoded
      ? decodeURI(this.args.textToCopy)
      : this.args.textToCopy;
  }

  get targetToCopy() {
    return this.args.targetToCopy;
  }

  /**
   * Get the class names to apply to the component.
   * @method CopyButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-copy-button'];

    // add a class based on the @size argument
    classes.push(`hds-button--size-${this.size}`);

    classes.push(`hds-copy-button--${this.status}`);

    return classes.join(' ');
  }

  @action
  onSuccess() {
    this.status = 'success';
    this.resetStatusDelayed();
  }

  @action
  onError() {
    this.status = 'error';
    this.resetStatusDelayed();
  }

  resetStatusDelayed() {
    clearTimeout(this.timer);
    // make it fade back to the default state
    this.timer = setTimeout(() => {
      this.status = DEFAULT_STATUS;
    }, 1500);
  }
}
