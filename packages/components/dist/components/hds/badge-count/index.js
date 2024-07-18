import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsBadgeCountSizeValues, HdsBadgeCountTypeValues, HdsBadgeCountColorValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} ...attributes>\n  {{@text}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const SIZES = Object.values(HdsBadgeCountSizeValues);
const TYPES = Object.values(HdsBadgeCountTypeValues);
const COLORS = Object.values(HdsBadgeCountColorValues);
const DEFAULT_SIZE = HdsBadgeCountSizeValues.Medium;
const DEFAULT_TYPE = HdsBadgeCountTypeValues.Filled;
const DEFAULT_COLOR = HdsBadgeCountColorValues.Neutral;
class HdsBadgeCountComponent extends Component {
  /**
   * Sets the size for the component
   * Accepted sizes: small, medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    const {
      size = DEFAULT_SIZE
    } = this.args;
    assert(`@size for "Hds::BadgeCount" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
  }

  /**
   * Sets the type of the component
   * Accepted values: filled, inverted, outlined
   *
   * @param type
   * @type {string}
   * @default 'filled'
   */
  get type() {
    const {
      type = DEFAULT_TYPE
    } = this.args;
    assert(`@type for "Hds::BadgeCount" must be one of the following: ${TYPES.join(', ')}; received: ${type}`, TYPES.includes(type));
    return type;
  }

  /**
   * Sets the color scheme for the component
   * Accepted colors: neutral, neutral-dark-mode
   *
   * @param color
   * @type {string}
   * @default 'neutral'
   */
  get color() {
    const {
      color = DEFAULT_COLOR
    } = this.args;
    assert(`@color for "Hds::BadgeCount" must be one of the following: ${COLORS.join(', ')}; received: ${color}`, COLORS.includes(color));
    return color;
  }

  /**
   * Get the class names to apply to the component.
   * @method BadgeCount#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-badge-count'];

    // add a class based on the @size argument
    classes.push(`hds-badge-count--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-badge-count--type-${this.type}`);

    // add a class based on the @color argument
    classes.push(`hds-badge-count--color-${this.color}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsBadgeCountComponent);

export { COLORS, DEFAULT_COLOR, DEFAULT_SIZE, DEFAULT_TYPE, SIZES, TYPES, HdsBadgeCountComponent as default };
//# sourceMappingURL=index.js.map
