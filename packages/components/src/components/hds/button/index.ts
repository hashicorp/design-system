/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import {
  HdsButtonSizeValues,
  HdsButtonColorValues,
  HdsButtonIconPositionValues,
} from './types.ts';

import type {
  HdsButtonSizes,
  HdsButtonColors,
  HdsButtonIconPositions,
} from './types.ts';
import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsIconSignature } from '../icon';

export const SIZES: HdsButtonSizes[] = Object.values(HdsButtonSizeValues);
export const COLORS: HdsButtonColors[] = Object.values(HdsButtonColorValues);
export const ICON_POSITIONS: HdsButtonIconPositions[] = Object.values(
  HdsButtonIconPositionValues
);
export const DEFAULT_SIZE = HdsButtonSizeValues.Medium;
export const DEFAULT_COLOR = HdsButtonColorValues.Primary;
export const DEFAULT_ICON_POSITION = HdsButtonIconPositionValues.Leading;

export interface HdsButtonSignature {
  Args: HdsInteractiveSignature['Args'] & {
    size?: HdsButtonSizes;
    color?: HdsButtonColors;
    text: string;
    icon?: HdsIconSignature['Args']['name'];
    iconPosition?: HdsButtonIconPositions;
    isIconOnly?: boolean;
    isFullWidth?: boolean;
    isInline?: boolean;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsButton extends Component<HdsButtonSignature> {
  /**
   * @param text
   * @type {string}
   * @description The text of the button or value of `aria-label` if `isIconOnly` is set to `true`. If no text value is defined an error will be thrown.
   */
  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Button" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small`, `medium`, and `large`
   */
  get size(): HdsButtonSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Button" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of button to be used; acceptable values are `primary`, `secondary`, and `critical`
   */
  get color(): HdsButtonColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Button" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  get icon(): HdsIconSignature['Args']['name'] | undefined {
    assert(
      `when the "Hds::Button" @color is "tertiary" an @icon is required`,
      !(this.color === 'tertiary' && !this.args.icon)
    );

    return this.args.icon ?? undefined;
  }

  /**
   * @param isIconOnly
   * @type {boolean}
   * @default false
   * @description Indicates if the button will only contain an icon; component will also ensure that accessible text is still applied to the component.
   */
  get isIconOnly(): boolean {
    if (this.icon) {
      return this.args.isIconOnly ?? false;
    }
    return false;
  }

  /**
   * @param iconPosition
   * @type {string}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPosition(): HdsButtonIconPositions {
    const { iconPosition = DEFAULT_ICON_POSITION } = this.args;

    assert(
      `@iconPosition for "Hds::Button" must be one of the following: ${ICON_POSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICON_POSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  /**
   * @param iconSize
   * @type {string}
   * @default 16
   * @description ensures that the correct icon size is used. Automatically calculated.
   */
  get iconSize(): HdsIconSignature['Args']['size'] {
    if (this.args.size === 'large') {
      return '24';
    } else {
      return '16';
    }
  }

  /**
   * @param isFullWidth
   * @type {boolean}
   * @default false
   * @description Indicates that a button should take up the full width of the parent container. The default is false.
   */
  get isFullWidth(): boolean {
    return this.args.isFullWidth ?? false;
  }

  /**
   * Get the class names to apply to the component.
   * @method Button#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-button'];

    // add a class based on the @color argument
    classes.push(`hds-button--color-${this.color}`);

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-button--width-full');
    }

    // add a class based on isIconOnly argument
    if (this.isIconOnly) {
      classes.push('hds-button--is-icon-only');
    }

    // add a class based on the @isInline argument
    if (this.args.isInline) {
      classes.push('hds-button--is-inline');
    }

    // add a class based on the @size argument
    classes.push(`hds-button--size-${this.size}`);

    return classes.join(' ');
  }
}
