/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_ICONPOSITION = 'trailing';
export const ICONPOSITIONS = ['leading', 'trailing'];
export const SIZES = ['small', 'medium', 'large'];

export default class HdsRichTooltipToggleComponent extends Component {
  /**
   * @param isInline
   * @type {boolean}
   * @default true
   * @description sets display inline for the element
   */
  get isInline() {
    const { isInline = false } = this.args;
    return isInline;
  }

  /**
   * @param iconPosition
   * @type {string}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPosition() {
    const { iconPosition = DEFAULT_ICONPOSITION } = this.args;

    assert(
      `@iconPosition for "Hds::RichTooltip::Toggle" must be one of the following: ${ICONPOSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICONPOSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the "info" text; acceptable values are `small`, `medium`, `large`
   */
  get size() {
    let size;

    // we assing a "size" only if `@text` is provided
    if (this.args.text) {
      size = this.args.size;

      assert(
        `@size for "Hds::RichTooltip::Toggle" must be one of the following: ${SIZES.join(
          ', '
        )}; received: ${size}`,
        size === undefined || SIZES.includes(size)
      );
    }

    return size;
  }

  /**
   * Get the class names to apply to the component.
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-rich-tooltip__toggle'];

    // add a class based on the @isInline argument
    if (this.isInline) {
      classes.push('hds-rich-tooltip__toggle--is-inline');
    } else {
      classes.push('hds-rich-tooltip__toggle--is-block');
    }

    // add a class based on the @size argument (if provided)
    if (this.size) {
      classes.push(`hds-rich-tooltip__toggle--size-${this.size}`);
    }

    return classes.join(' ');
  }
}
