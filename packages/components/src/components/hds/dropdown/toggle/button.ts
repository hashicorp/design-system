/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import {
  HdsDropdownToggleButtonSizeValues,
  HdsDropdownToggleButtonColorValues,
} from './types.ts';

import type { HdsIconSignature } from '../../icon.ts';
import type { HdsBadgeSignature } from '../../badge.ts';
import type { HdsBadgeCountSignature } from '../../badge-count.ts';
import type {
  HdsDropdownToggleButtonSizes,
  HdsDropdownToggleButtonColors,
} from './types';
import type { ModifierLike } from '@glint/template';
import type { SetupPrimitiveToggleModifier } from '../../popover-primitive.ts';

export const DEFAULT_SIZE = HdsDropdownToggleButtonSizeValues.Medium;
export const DEFAULT_COLOR = HdsDropdownToggleButtonColorValues.Primary;
export const SIZES: string[] = Object.values(HdsDropdownToggleButtonSizeValues);
export const COLORS: string[] = Object.values(
  HdsDropdownToggleButtonColorValues
);

export interface HdsDropdownToggleButtonSignature {
  Args: {
    badge?: HdsBadgeSignature['Args']['text'];
    badgeIcon?: HdsBadgeSignature['Args']['icon'];
    color?: HdsDropdownToggleButtonColors;
    count?: HdsBadgeCountSignature['Args']['text'];
    icon?: HdsIconSignature['Args']['name'];
    isFullWidth?: boolean;
    isOpen?: boolean;
    size?: HdsDropdownToggleButtonSizes;
    text: string;
    setupPrimitiveToggle?: ModifierLike<SetupPrimitiveToggleModifier>;
  };
  Element: HTMLButtonElement;
}

export default class HdsDropdownToggleButton extends Component<HdsDropdownToggleButtonSignature> {
  /**
   * Generates a unique ID for the button
   *
   * @param toggleButtonId
   */
  toggleButtonId = 'toggle-button-' + guidFor(this);

  /**
   * @param text
   * @type {string}
   * @description The text of the button. If no text value is defined an error will be thrown.
   */
  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::Toggle::Button" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small` and `medium`
   */
  get size(): HdsDropdownToggleButtonSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Dropdown::Toggle::Button" must be one of the following: ${SIZES.join(
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
   * @description Determines the color of button to be used; acceptable values are `primary` and  `secondary`
   */
  get color(): HdsDropdownToggleButtonColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Dropdown::Toggle::Button" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
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
   * @param badgeType
   * @type {string}
   * @default 'filled'
   * @description ensures that the correct Badge/BadgeCount type is used to meet contrast requirements
   */
  get badgeType(): HdsBadgeCountSignature['Args']['type'] {
    return this.color !== 'primary' ? 'inverted' : 'filled';
  }

  /**
   * Get the class names to apply to the component.
   * @method ToggleButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-dropdown-toggle-button'];

    // add a class based on the @size argument
    classes.push(`hds-dropdown-toggle-button--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-dropdown-toggle-button--color-${this.color}`);

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-dropdown-toggle-button--width-full');
    }

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-dropdown-toggle-button--is-open');
    }

    return classes.join(' ');
  }
}
