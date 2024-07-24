/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { HdsDropdownListItemInteractiveColorValues } from './types.ts';

import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
import type { HdsInteractiveSignature } from '../../interactive';
import type { HdsDropdownListItemInteractiveColors } from './types.ts';

export const DEFAULT_COLOR = HdsDropdownListItemInteractiveColorValues.Action;
export const COLORS: string[] = Object.values(
  HdsDropdownListItemInteractiveColorValues
);

interface HdsDropdownListItemInteractiveSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color: HdsDropdownListItemInteractiveColors;
    icon?: FlightIconSignature['Args']['name'];
    isLoading?: boolean;
    text: string;
    trailingIcon?: FlightIconSignature['Args']['name'];
  };
  Element: HTMLDivElement | HdsInteractiveSignature['Element'];
}

export default class HdsDropdownListItemInteractiveComponent extends Component<HdsDropdownListItemInteractiveSignature> {
  /**
   * @param text
   * @type {string}
   * @description The text of the item. If no text value is defined an error will be thrown
   */
  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ListItem::Interactive" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of the item (when item is set to interactive)
   */
  get color(): HdsDropdownListItemInteractiveColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Dropdown::ListItem::Interactive" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = [
      'hds-dropdown-list-item',
      'hds-dropdown-list-item--variant-interactive',
    ];

    // add a class based on the @color argument
    classes.push(`hds-dropdown-list-item--color-${this.color}`);

    return classes.join(' ');
  }
}
