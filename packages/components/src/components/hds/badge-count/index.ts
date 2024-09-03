/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import {
  HdsBadgeCountColorValues,
  HdsBadgeCountSizeValues,
  HdsBadgeCountTypeValues,
} from './types.ts';
import type {
  HdsBadgeCountColors,
  HdsBadgeCountSizes,
  HdsBadgeCountTypes,
} from './types.ts';

export const SIZES: string[] = Object.values(HdsBadgeCountSizeValues);
export const TYPES: string[] = Object.values(HdsBadgeCountTypeValues);
export const COLORS: string[] = Object.values(HdsBadgeCountColorValues);
export const DEFAULT_SIZE = HdsBadgeCountSizeValues.Medium;
export const DEFAULT_TYPE = HdsBadgeCountTypeValues.Filled;
export const DEFAULT_COLOR = HdsBadgeCountColorValues.Neutral;

export interface HdsBadgeCountSignature {
  Args: {
    size?: HdsBadgeCountSizes;
    type?: HdsBadgeCountTypes;
    color?: HdsBadgeCountColors;
    text: string;
  };
  Element: HTMLDivElement;
}

export default class HdsBadgeCount extends Component<HdsBadgeCountSignature> {
  /**
   * Sets the size for the component
   * Accepted sizes: small, medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size(): HdsBadgeCountSizes {
    const { size = DEFAULT_SIZE } = this.args;

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
  get type(): HdsBadgeCountTypes {
    const { type = DEFAULT_TYPE } = this.args;

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
  get color(): HdsBadgeCountColors {
    const { color = DEFAULT_COLOR } = this.args;

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
  get classNames(): string {
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
