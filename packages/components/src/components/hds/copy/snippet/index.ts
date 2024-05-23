/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { HdsCopySnippetColorValues } from './types.ts';
import type { HdsCopySnippetColors } from './types.ts';
import type { HdsClipboardModifierSignature } from '../../../../modifiers/hds-clipboard.ts';

export const DEFAULT_COLOR = HdsCopySnippetColorValues.Primary;
export const COLORS: string[] = Object.values(HdsCopySnippetColorValues);

export const DEFAULT_ICON = 'clipboard-copy';
export const SUCCESS_ICON = 'clipboard-checked';
export const ERROR_ICON = 'clipboard-x';
export const DEFAULT_STATUS = 'idle';

interface HdsCopySnippetSignature {
  Args: {
    color?: HdsCopySnippetColors;
    isFullWidth?: boolean;
    textToCopy: HdsClipboardModifierSignature['Args']['Named']['text'];
    isTruncated?: boolean;
    onSuccess?: HdsClipboardModifierSignature['Args']['Named']['onSuccess'];
    onError?: HdsClipboardModifierSignature['Args']['Named']['onError'];
  };
  Element: HTMLButtonElement;
}

export default class HdsCopySnippetComponent extends Component<HdsCopySnippetSignature> {
  @tracked status = DEFAULT_STATUS;
  @tracked timer: ReturnType<typeof setTimeout> | undefined;

  /**
   * @param textToCopy
   * @type {string | number | bigint | undefined} ???
   */
  get textToShow() {
    const { textToCopy = '' } = this.args;

    if (typeof textToCopy === 'string') {
      return textToCopy;
    } else {
      return textToCopy.toString();
    }
  }

  /**
   * @param icon
   * @type {string}
   * @default DEFAULT_ICON
   * @description Determines the icon to be used, based on the success state. Note that this is auto-tracked because it depends on a tracked property (status).
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
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of button to be used; acceptable values are `primary` and `secondary`
   */
  get color() {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Copy::Snippet" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param isFullWidth
   * @type {boolean}
   * @default false
   * @description Indicates that the component should take up the full width of the parent container.
   */
  get isFullWidth() {
    return this.args.isFullWidth ?? false;
  }

  /**
   * @param isTruncated
   * @type {boolean}
   * @default false
   * @description Indicates that the component should be truncated instead of wrapping text and using multiple lines.
   */
  get isTruncated() {
    return this.args.isTruncated ?? false;
  }

  /**
   * Get the class names to apply to the component.
   * @method CopySnippet#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-copy-snippet'];

    // add a class based on the @color argument
    classes.push(`hds-copy-snippet--color-${this.color}`);

    // add a class based on the tracked status (idle/success/error)
    classes.push(`hds-copy-snippet--status-${this.status}`);

    // add a class based on the @isTruncated argument
    if (this.isTruncated) {
      classes.push('hds-copy-snippet--is-truncated');
    }

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-copy-snippet--width-full');
    }

    return classes.join(' ');
  }

  @action
  onSuccess(args: HdsClipboardModifierSignature['Args']['Named']['onSuccess']) {
    this.status = 'success';
    this.resetStatusDelayed();

    const { onSuccess } = this.args;

    if (typeof onSuccess === 'function') {
      onSuccess(args);
    }
  }

  @action
  onError(args: HdsClipboardModifierSignature['Args']['Named']['onError']) {
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
