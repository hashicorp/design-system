/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { HdsCopyButtonSizeValues } from './types';
import type { HdsCopyButtonSizes, HdsCopyButtonItemToCopy } from './types';

export const DEFAULT_SIZE = HdsCopyButtonSizeValues.Medium;
export const SIZES: string[] = Object.values(HdsCopyButtonSizeValues);
export const DEFAULT_ICON = 'clipboard-copy';
export const SUCCESS_ICON = 'clipboard-checked';
export const ERROR_ICON = 'clipboard-x';
export const DEFAULT_STATUS = 'idle';

export interface HdsCopyButtonSignature {
  Args: {
    size?: HdsCopyButtonSizes;
    isIconOnly?: boolean;
    isFullWidth?: boolean;
    text: string;
    textToCopy?: HdsCopyButtonItemToCopy;
    targetToCopy?: HdsCopyButtonItemToCopy;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError?: (...args: any[]) => void;
  };
  Element: HTMLElement;
}

export default class HdsCopyButtonComponent extends Component<HdsCopyButtonSignature> {
  @tracked status = DEFAULT_STATUS;
  @tracked timer: ReturnType<typeof setTimeout> | undefined;

  /**
   * @param icon
   * @type {string}
   * @description The icon to be displayed for each status; automatically calculated based on the tracked property `status`.
   */
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
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Copy::Button" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * Get the class names to apply to the component.
   * @method CopyButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-copy-button'];

    // add a class based on the @size argument
    classes.push(`hds-button--size-${this.size}`);

    classes.push(`hds-copy-button--status-${this.status}`);

    return classes.join(' ');
  }

  @action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess(args: any) {
    this.status = 'success';
    this.resetStatusDelayed();

    const { onSuccess } = this.args;

    if (typeof onSuccess === 'function') {
      onSuccess(args);
    }
  }

  @action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError(args: any) {
    this.status = 'error';
    this.resetStatusDelayed();

    const { onError } = this.args;

    if (typeof onError === 'function') {
      onError(args);
    }
  }

  resetStatusDelayed() {
    clearTimeout(this.timer);
    // make it fade back to the default state
    this.timer = setTimeout(() => {
      this.status = DEFAULT_STATUS;
    }, 1500);
  }
}
