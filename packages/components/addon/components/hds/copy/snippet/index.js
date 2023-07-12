/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export const DEFAULT_COLOR = 'tertiary';
export const COLORS = ['tertiary', 'secondary'];
export const DEFAULT_ICON = 'clipboard-copy';
export const SUCCESS_ICON = 'clipboard-checked';

export default class HdsCopySnippetIndexComponent extends Component {
  @tracked isSuccess = false;
  @tracked isError = false;
  @tracked icon = DEFAULT_ICON;

  /**
   * @param color
   * @type {string}
   * @default tertiary
   * @description Determines the color of button to be used; acceptable values are `secondary` and `tertiary`
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
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-copy-snippet hds-typography-code-100'];

    // add a class based on the @size argument
    classes.push(`hds-copy-snippet--size-small`);

    // add a class based on the @color argument
    classes.push(`hds-copy-snippet--color-${this.color}`);

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
          this.icon = SUCCESS_ICON;
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
        this.icon = DEFAULT_ICON;
      }, 1500);
    }
  }
}
