/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert, deprecate } from '@ember/debug';

import { HdsDropdownListItemInteractiveColorValues } from './types.ts';

import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive';
import type { HdsDropdownListItemInteractiveColors } from './types.ts';
import type { ComponentLike } from '@glint/template';
import type { HdsBadgeSignature } from '../../badge/index.ts';

export const DEFAULT_COLOR = HdsDropdownListItemInteractiveColorValues.Action;
export const COLORS: string[] = Object.values(
  HdsDropdownListItemInteractiveColorValues
);

export interface HdsDropdownListItemInteractiveSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color: HdsDropdownListItemInteractiveColors;
    icon?: HdsIconSignature['Args']['name'];
    isLoading?: boolean;
    text: string;
    trailingIcon?: HdsIconSignature['Args']['name'];
  };
  Blocks: {
    default?: [
      {
        Badge?: ComponentLike<HdsBadgeSignature>;
      },
    ];
  };
  Element: HTMLDivElement | HdsInteractiveSignature['Element'];
}

export default class HdsDropdownListItemInteractiveComponent extends Component<HdsDropdownListItemInteractiveSignature> {
  constructor(
    owner: unknown,
    args: HdsDropdownListItemInteractiveSignature['Args']
  ) {
    super(owner, args);

    if (args.text !== undefined) {
      deprecate(
        'The `@text` argument for "Hds::Dropdown::ListItem::Interactive" has been deprecated. Please put text in the yielded block.',
        false,
        {
          id: 'hds.dropdown.list-item.interactive',
          until: '5.0.0',
          url: '',
          for: '@hashicorp/design-system-components',
          since: {
            available: '4.10.0',
            enabled: '5.0.0',
          },
        }
      );
    }
  }

  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ListItem::Interactive" must have a valid value',
      text !== undefined
    );

    return text;
  }

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
