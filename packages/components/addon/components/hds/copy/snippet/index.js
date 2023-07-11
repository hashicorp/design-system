/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_COLOR = 'tertiary';
export const SIZES = ['small', 'medium'];
export const COLORS = ['tertiary'];

export default class HdsCopySnippetIndexComponent extends Component {
  @tracked isSuccess = false;
  @tracked isError = false;

  /**
   * @param text
   * @type {string}
   * @description The text of the button. If no text value is defined an error will be thrown
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Copy::Snippet" must have a valid value',
      text !== undefined
    );

    return text;
  }
  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small` and `medium`
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::CopySnippet" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * @param color
   * @type {string}
   * @default tertiary
   * @description Determines the color of button to be used; the only acceptable value is `tertiary`
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

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
   * @description Indicates that a button should take up the full width of the parent container. The default is false.
   */
  get isFullWidth() {
    return this.args.isFullWidth ?? false;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-copy-snippet'];

    // add a class based on the @size argument
    classes.push(`hds-copy-snippet--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-copy-snippet--color-${this.color}`);

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-copy-snippet--width-full');
    }

    return classes.join(' ');
  }

  @action
  async copyCode() {
    if (this.args.text) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard
      await navigator.clipboard.writeText(this.args.text);

      if (navigator.clipboard.readText) {
        const result = await navigator.clipboard.readText();

        if (result === this.args.text) {
          this.isSuccess = true;
        }
      } else {
        // idk if we ever hit this, need to test it
        this.isError = true;
        if (this.isError) {
          window.alert(
            'the copy was not successful, the browser requires your permission'
          );
        }
      }

      // make it fade back to the default state
      setTimeout(() => {
        this.isSuccess = false;
      }, 1500);
    }
  }
}
