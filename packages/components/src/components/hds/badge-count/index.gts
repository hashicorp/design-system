/**
 * Copyright IBM Corp. 2021, 2025
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

export const SIZES: HdsBadgeCountSizes[] = Object.values(
  HdsBadgeCountSizeValues
);
export const TYPES: HdsBadgeCountTypes[] = Object.values(
  HdsBadgeCountTypeValues
);
export const COLORS: HdsBadgeCountColors[] = Object.values(
  HdsBadgeCountColorValues
);
export const DEFAULT_SIZE = HdsBadgeCountSizeValues.Medium;
export const DEFAULT_TYPE = HdsBadgeCountTypeValues.Filled;
export const DEFAULT_COLOR = HdsBadgeCountColorValues.Neutral;

export interface HdsBadgeCountSignature {
  Args: {
    size?: HdsBadgeCountSizes;
    type?: HdsBadgeCountTypes;
    color?: HdsBadgeCountColors;
    text: string | number;
  };
  Element: HTMLDivElement;
}

export default class HdsBadgeCount extends Component<HdsBadgeCountSignature> {
  get size() {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::BadgeCount" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  get type() {
    const { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::BadgeCount" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  get color() {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::BadgeCount" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  get classNames() {
    const classes = ['hds-badge-count'];

    classes.push(`hds-badge-count--size-${this.size}`);

    classes.push(`hds-badge-count--type-${this.type}`);

    classes.push(`hds-badge-count--color-${this.color}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{@text}}
    </div>
  </template>
}
