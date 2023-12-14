/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_TYPE = 'filled';
export const DEFAULT_COLOR = 'neutral';
export const SIZES = ['small', 'medium', 'large'];
export const TYPES = ['filled', 'inverted', 'outlined'];
export const COLORS = ['neutral', 'neutral-dark-mode'];

export default class HdsBadgeCountIndexComponent extends Component {
  /**
   * Sets the size for the component
   * Accepted sizes: small, medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::BadgeCount" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

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
    let { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::BadgeCount" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

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
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::BadgeCount" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * Get the class names to apply to the component.
   * @method BadgeCount#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-badge-count'];

    // add a class based on the @size argument
    classes.push(`hds-badge-count--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-badge-count--type-${this.type}`);

    // add a class based on the @color argument
    classes.push(`hds-badge-count--color-${this.color}`);

    return classes.join(' ');
  }
}
