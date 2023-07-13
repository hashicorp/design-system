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

export default class HdsCopyButtonComponent extends Component {
  @tracked isSuccess = false;
  @tracked isError = false;

  get icon() {
    let icon = DEFAULT_ICON;
    if (this.isSuccess) {
      icon = SUCCESS_ICON;
    }
    return icon;
  }
  /**
   * @param clipboardTarget
   * @type {string}
   * @description The ID of the element containing the text to be copied. If no clipboardTarget value is defined `isError` will be set to true.
   */
  get clipboardTarget() {
    let { clipboardTarget } = this.args;
    return clipboardTarget;
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

  /**
   * Get the class names to apply to the component.
   * @method CopyButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-copy-button'];

    // add a class based on the @size argument
    classes.push(`hds-button--size-${this.size}`);

    return classes.join(' ');
  }

  @action
  async copyCode() {
    let textToCopy;
    if (this.args.clipboardTarget) {
      let clipboardTargetContent = document
        .querySelector(this.args.clipboardTarget)
        .innerHTML.trim();
      textToCopy = clipboardTargetContent;
      // leaving this in while development
      console.log(`${textToCopy} is copied to the clipboard`);
    } else {
      this.isError = true;
      // leaving this in while in development
      console.log(
        `something went wrong, nothing was copied to the keyboard. isError is ${this.isError}, isSuccess is ${this.isSuccess}.`
      );
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard
    await navigator.clipboard.writeText(textToCopy);

    if (navigator.clipboard.readText) {
      const result = await navigator.clipboard.readText();

      if (result === textToCopy) {
        this.isSuccess = true;
      }
    } else {
      // I don't think it ever gets here...
      this.isError = true;
      console.log(
        'the copy was not successful, the browser requires your permission'
      );
    }

    // make it fade back to the default state
    setTimeout(() => {
      this.isSuccess = false;
    }, 1500);
  }
}
