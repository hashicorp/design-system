/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import {assert} from '@ember/debug';
import {type Color, ColorValues, type Size, SizeValues, type Type, TypeValues} from "./types.ts";

export interface HdsBadgeSignature {
  Args: {
    size: Size;
    type: Type;
    color: Color;
    text: string;
    icon: string | null;
    isIconOnly: boolean | null;
  },
  Element: HTMLDivElement;
}
export const SIZES: string[] = Object.values(SizeValues);
export const TYPES: string[] = Object.values(TypeValues);
export const COLORS: string[] = Object.values(ColorValues);
export const DEFAULT_SIZE = SizeValues.MEDIUM;
export const DEFAULT_TYPE = TypeValues.FILLED;
export const DEFAULT_COLOR = ColorValues.NEUTRAL;

export default class HdsBadgeIndexComponent extends Component<HdsBadgeSignature> {
  /**
   * Sets the size for the component
   * Accepted values: small, medium, large
   *
   * @param size
   * @type {Size}
   * @default 'medium'
   */
  get size(): Size {
    let { size = DEFAULT_SIZE } = this.args;

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
   * @type {Type}
   * @default 'filled'
   */
  get type(): Type {
    let { type = DEFAULT_TYPE } = this.args;

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
   * @type {Color}
   * @default 'neutral'
   */
  get color(): Color {
    let { color = DEFAULT_COLOR } = this.args;

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
  get text(): string {
    let { text } = this.args;

    assert(
      '@text for "Hds::Badge" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * Sets the icon name if there is one
   *
   * @param icon
   * @type {string|null}
   * @default null
   */
  get icon(): string | null {
    return this.args.icon ?? null;
  }

  /**
   * @param isIconOnly
   * @type {boolean}
   * @default false
   * @description Indicates if the badge will only contain an icon; component will also ensure that accessible text is still applied to the component.
   */
  get isIconOnly(): boolean {
    if (this.icon) {
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
    let classes = ['hds-badge'];

    // add a class based on the @size argument
    classes.push(`hds-badge--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-badge--type-${this.type}`);

    // add a class based on the @color argument
    classes.push(`hds-badge--color-${this.color}`);

    return classes.join(' ');
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Hds::Badge': typeof HdsBadgeIndexComponent;
    'hds/badge': typeof HdsBadgeIndexComponent;
    'HdsBadge': typeof HdsBadgeIndexComponent;
  }
}