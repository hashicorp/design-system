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

import type { HdsIconSignature } from '../../icon';
import type { HdsBadgeSignature } from '../../badge';
import type { HdsBadgeCountSignature } from '../../badge-count';
import type {
  HdsDropdownToggleButtonSizes,
  HdsDropdownToggleButtonColors,
} from './types';
import type { ModifierLike } from '@glint/template';
import type { SetupPrimitiveToggleModifier } from '../../popover-primitive/index.ts';

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
  private _toggleButtonId = 'toggle-button-' + guidFor(this);

  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::Toggle::Button" must have a valid value',
      text !== undefined
    );

    return text;
  }

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

  get isFullWidth(): boolean {
    return this.args.isFullWidth ?? false;
  }

  get badgeType(): HdsBadgeCountSignature['Args']['type'] {
    return this.color !== 'primary' ? 'inverted' : 'filled';
  }

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
