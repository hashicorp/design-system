/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import {
  HdsBadgeColorValues,
  HdsBadgeSizeValues,
  HdsBadgeTypeValues,
} from './types.ts';

import type { HdsBadgeColors, HdsBadgeSizes, HdsBadgeTypes } from './types.ts';
import type { HdsIconSignature } from '../icon';

export const SIZES: HdsBadgeSizes[] = Object.values(HdsBadgeSizeValues);
export const TYPES: HdsBadgeTypes[] = Object.values(HdsBadgeTypeValues);
export const COLORS: HdsBadgeColors[] = Object.values(HdsBadgeColorValues);
export const DEFAULT_SIZE = HdsBadgeSizeValues.Medium;
export const DEFAULT_TYPE = HdsBadgeTypeValues.Filled;
export const DEFAULT_COLOR = HdsBadgeColorValues.Neutral;

export interface HdsBadgeSignature {
  Args: {
    size?: HdsBadgeSizes;
    type?: HdsBadgeTypes;
    color?: HdsBadgeColors;
    text: string | number;
    icon?: HdsIconSignature['Args']['name'];
    isIconOnly?: boolean;
  };
  Element: HTMLDivElement;
}

export default class HdsBadge extends Component<HdsBadgeSignature> {
  /**
   * Sets the size for the component
   * Accepted values: small, medium, large
   *
   * @param size
   * @type {HdsBadgeSizes}
   * @default 'medium'
   */
  get size(): HdsBadgeSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Badge" must be one of the following: ${SIZES.join(
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
   * @type {HdsBadgeTypes}
   * @default 'filled'
   */
  get type(): HdsBadgeTypes {
    const { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Badge" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  /**
   * Sets the color scheme for the component
   * Accepted values: neutral, neutral-dark-mode, highlight, success, warning, critical
   *
   * @param color
   * @type {HdsBadgeColors}
   * @default 'neutral'
   */
  get color(): HdsBadgeColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Badge" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param text
   * @type {string}
   * @description The text of the badge. If `isIconOnly` is set to `true`, the text will be visually hidden but still available to assistive technology. If no text value is defined, an error will be thrown.
   */
  get text(): string | number {
    const { text } = this.args;

    assert(
      '@text for "Hds::Badge" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param isIconOnly
   * @type {boolean}
   * @default false
   * @description Indicates if the badge will only contain an icon; component will also ensure that accessible text is still applied to the component.
   */
  get isIconOnly(): boolean {
    if (this.args.icon) {
      return this.args.isIconOnly ?? false;
    }

    return false;
  }

  /**
   * Get the class names to apply to the component.
   * @method Badge#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-badge'];

    // add a class based on the @size argument
    classes.push(`hds-badge--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-badge--type-${this.type}`);

    // add a class based on the @color argument
    classes.push(`hds-badge--color-${this.color}`);

    return classes.join(' ');
  }
}
