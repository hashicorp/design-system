/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { HdsCopyButtonSizeValues } from './types.ts';
import type { HdsCopyButtonSizes } from './types.ts';
import type { HdsButtonSignature } from '../../button/';
import type { HdsClipboardModifierSignature } from '../../../../modifiers/hds-clipboard.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';

export const DEFAULT_SIZE = HdsCopyButtonSizeValues.Medium;
export const SIZES: string[] = Object.values(HdsCopyButtonSizeValues);
export const DEFAULT_ICON = 'clipboard-copy';
export const SUCCESS_ICON = 'clipboard-checked';
export const ERROR_ICON = 'clipboard-x';
export const DEFAULT_STATUS = 'idle';

export interface HdsCopyButtonSignature {
  Args: HdsButtonSignature['Args'] & {
    size?: HdsCopyButtonSizes;
    textToCopy?: HdsClipboardModifierSignature['Args']['Named']['text'];
    targetToCopy?: HdsClipboardModifierSignature['Args']['Named']['target'];
    onSuccess?: HdsClipboardModifierSignature['Args']['Named']['onSuccess'];
    onError?: HdsClipboardModifierSignature['Args']['Named']['onError'];
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsCopyButtonComponent extends Component<HdsCopyButtonSignature> {
  @tracked status = DEFAULT_STATUS;
  @tracked timer: ReturnType<typeof setTimeout> | undefined;

  /**
   * @param icon
   * @type {string}
   * @description The icon to be displayed for each status; automatically calculated based on the tracked property `status`.
   */
  get icon(): FlightIconSignature['Args']['name'] {
    let icon: FlightIconSignature['Args']['name'] = DEFAULT_ICON;
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
  get size(): HdsCopyButtonSizes {
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
  get classNames(): string {
    const classes = ['hds-copy-button'];

    // add a class based on the @size argument
    classes.push(`hds-button--size-${this.size}`);

    classes.push(`hds-copy-button--status-${this.status}`);

    return classes.join(' ');
  }

  @action
  onSuccess(
    args: HdsClipboardModifierSignature['Args']['Named']['onSuccess']
  ): void {
    this.status = 'success';
    this.resetStatusDelayed();

    const { onSuccess } = this.args;

    if (typeof onSuccess === 'function') {
      onSuccess(args);
    }
  }

  @action
  onError(
    args: HdsClipboardModifierSignature['Args']['Named']['onError']
  ): void {
    this.status = 'error';
    this.resetStatusDelayed();

    const { onError } = this.args;

    if (typeof onError === 'function') {
      onError(args);
    }
  }

  resetStatusDelayed(): void {
    clearTimeout(this.timer);
    // make it fade back to the default state
    this.timer = setTimeout((): void => {
      this.status = DEFAULT_STATUS;
    }, 1500);
  }
}
