/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_ICONPOSITION = 'trailing';
export const DEFAULT_COLOR = 'primary';
export const ICONPOSITIONS = ['leading', 'trailing'];
export const COLORS = ['primary', 'secondary'];

export default class HdsXxxComponent extends Component {
  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Xxx" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param iconPosition
   * @type {string}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPosition() {
    let { iconPosition = DEFAULT_ICONPOSITION } = this.args;

    assert(
      `@iconPosition for "Hds::Xxx" must be one of the following: ${ICONPOSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICONPOSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  /**
   * Get the class names to apply to the component.
   * @method LinkInline#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-xxx'];

    // add a class based on the @color argument
    classes.push(`hds-xxx--color-${this.color}`);

    // add a class based on the @iconPosition argument
    classes.push(`hds-xxx--icon-${this.iconPosition}`);

    return classes.join(' ');
  }
}
