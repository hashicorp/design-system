/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_ICONPOSITION = 'leading';
export const ICONPOSITIONS = ['leading', 'trailing'];
export const SIZES = ['small', 'medium', 'large'];

export default class HdsRichTooltipToggleInfoTextComponent extends Component {
  /**
   * @param iconPosition
   * @type {string}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPosition() {
    let { iconPosition = DEFAULT_ICONPOSITION } = this.args;

    assert(
      `@iconPosition for "Hds::RichTooltip::Toggle::InfoText" must be one of the following: ${ICONPOSITIONS.join(
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
   * @description The size of the text; acceptable values are `small`, `medium`, `large`, `inherit`
   */
  get size() {
    const { size } = this.args;

    assert(
      `@size for "Hds::RichTooltip::Toggle::InfoText" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      size === undefined || SIZES.includes(size)
    );

    return size;
  }

  /**
   * @param isInline
   * @type {boolean}
   * @default true
   * @description sets display for the container and toggle elements
   */
  get isInline() {
    let { isInline = false } = this.args;
    return isInline;
  }

  /**
   * @param iconIsInlineBlock
   * @type {boolean}
   * @default true
   * @description sets the value for the `@isInlineBlock` argument of the icon
   */
  get iconIsInlineBlock() {
    return this.isInline;
  }

  /**
   * Get the class names to apply to the component.
   * @method LinkInline#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-rich-tooltip__toggle-info-text'];

    // add a class based on the @size argument (if provided)
    if (this.size) {
      classes.push(`hds-rich-tooltip__toggle-info-text--size-${this.size}`);
    }

    // add a class based on the @isInline argument
    if (this.isInline) {
      classes.push('hds-rich-tooltip__toggle-info-text--is-inline');
    } else {
      classes.push('hds-rich-tooltip__toggle-info-text--is-block');
    }

    return classes.join(' ');
  }
}
