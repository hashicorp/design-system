/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_COLOR = 'secondary';
export const SIZES = ['small', 'medium'];
export const COLORS = ['secondary', 'tertiary'];

export default class HdsDropdownListItemCopyItemComponent extends Component {
  @tracked isSuccess = false;
  @tracked isError = false;

  /**
   * @param text
   * @type {string}
   * @description The text of the button. If no text value is defined an error will be thrown
   */
  get text() {
    // this doesn't do what I want really, it just returns the ID value which isn't the same as the target id's text value. But we'll use it for the assertion for now, until I figure out how to do the right thing.
    let validText = this.args.clipboardText ?? this.args.text;
    // for now this still is what's returned.
    let text = this.args.text ?? 'give me an accessible name';

    assert(
      '@text for "Hds::CopyButton" must have a valid value',
      validText !== undefined
    );

    return text;
  }
  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small`, `medium`, and `large`
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::CopyButton" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * @param color
   * @type {string}
   * @default secondary
   * @description Determines the color of button to be used; acceptable values are `secondary`, `tertiary`
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::CopyButton" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param isIconOnly
   * @type {boolean}
   * @default false
   * @description Indicates if the button will only contain an icon; component will also ensure that accessible text is still applied to the component.
   */
  get isIconOnly() {
    return this.args.isIconOnly ?? false;
  }

  /**
   * @param isCode
   * @type {boolean}
   * @default false
   * @description Indicates if the button text should be formatted as code or regular text.
   */
  get isCode() {
    return this.args.isCode ?? false;
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
    let classes = ['hds-copy-button'];

    // add a class based on the @size argument
    classes.push(`hds-copy-button--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-copy-button--color-${this.color}`);

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-copy-button--width-full');
    }

    return classes.join(' ');
  }

  @action
  async copyCode() {
    let textToCopy;

    if (this.args.clipboardText) {
      let clipboardTextContent = document
        .querySelector(this.args.clipboardText)
        .innerHTML.trim();
      textToCopy = clipboardTextContent;
      // leaving this in while dev mode
      console.log(`textToCopy is clipboardText arg value: ${textToCopy}`);
    } else if (this.args.text) {
      textToCopy = this.args.text;
      // leaving this in while dev mode
      console.log(`textToCopy is text arg value: ${textToCopy}`);
    } else {
      console.log(`something else`);
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard
    await navigator.clipboard.writeText(textToCopy);

    if (navigator.clipboard.readText) {
      const result = await navigator.clipboard.readText();

      if (result === textToCopy) {
        this.isSuccess = true;
      }
    } else {
      this.isError = true;
    }

    // make it fade back to the default state
    setTimeout(() => {
      this.isSuccess = false;
    }, 1500);
  }
}
