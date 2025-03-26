/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { ComponentLike } from '@glint/template';

import type { HdsLayoutFlexItemSignature } from './item.ts';

import {
  HdsLayoutFlexDirectionValues,
  HdsLayoutFlexJustifyValues,
  HdsLayoutFlexAlignValues,
  HdsLayoutFlexGapValues,
} from './types.ts';

import type {
  HdsLayoutFlexDirections,
  HdsLayoutFlexJustifys,
  HdsLayoutFlexAligns,
  HdsLayoutFlexGaps,
  AvailableTagNames,
  AvailableElements,
} from './types.ts';

export const DEFAULT_DIRECTION = HdsLayoutFlexDirectionValues.Row;
export const DIRECTIONS: string[] = Object.values(HdsLayoutFlexDirectionValues);
export const JUSTIFYS: string[] = Object.values(HdsLayoutFlexJustifyValues);
export const ALIGNS: string[] = Object.values(HdsLayoutFlexAlignValues);
export const GAPS: string[] = Object.values(HdsLayoutFlexGapValues);

export interface HdsLayoutFlexSignature {
  Args: {
    tag?: AvailableTagNames;
    direction?: HdsLayoutFlexDirections;
    justify?: HdsLayoutFlexJustifys;
    align?: HdsLayoutFlexAligns;
    wrap?: boolean;
    gap?: HdsLayoutFlexGaps | [HdsLayoutFlexGaps, HdsLayoutFlexGaps];
    isInline?: boolean;
  };
  Blocks: {
    default: [
      {
        Item?: ComponentLike<HdsLayoutFlexItemSignature>;
      },
    ];
  };
  Element: AvailableElements;
}

export default class HdsLayoutFlex extends Component<HdsLayoutFlexSignature> {
  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
  }

  get direction(): HdsLayoutFlexDirections {
    const { direction = DEFAULT_DIRECTION } = this.args;

    assert(
      `@direction for "Hds::Layout::Flex" must be one of the following: ${DIRECTIONS.join(
        ', '
      )}; received: ${direction}`,
      DIRECTIONS.includes(direction)
    );

    return direction;
  }

  get justify(): HdsLayoutFlexJustifys | undefined {
    const { justify } = this.args;

    if (justify) {
      assert(
        `@justify for "Hds::Layout::Flex" must be one of the following: ${JUSTIFYS.join(
          ', '
        )}; received: ${justify}`,
        JUSTIFYS.includes(justify)
      );
    }

    return justify;
  }

  get align(): HdsLayoutFlexAligns | undefined {
    const { align } = this.args;

    if (align) {
      assert(
        `@align for "Hds::Layout::Flex" must be one of the following: ${ALIGNS.join(
          ', '
        )}; received: ${align}`,
        ALIGNS.includes(align)
      );
    }

    return align;
  }

  get gap():
    | [HdsLayoutFlexGaps]
    | [HdsLayoutFlexGaps, HdsLayoutFlexGaps]
    | undefined {
    const { gap } = this.args;

    if (gap) {
      assert(
        `@gap for "Hds::Layout::Flex" must be a single value or an array of two values of one of the following: ${GAPS.join(
          ', '
        )}; received: ${gap}`,
        (!Array.isArray(gap) && GAPS.includes(gap)) ||
          (Array.isArray(gap) &&
            gap.length === 2 &&
            GAPS.includes(gap[0]) &&
            GAPS.includes(gap[1]))
      );
      return Array.isArray(gap) ? gap : [gap];
    } else {
      return undefined;
    }
  }

  get classNames() {
    const classes = ['hds-layout-flex'];

    // add a class based on the @direction argument
    classes.push(`hds-layout-flex--direction-${this.direction}`);

    // add a class based on the @justify argument
    if (this.justify) {
      classes.push(`hds-layout-flex--justify-content-${this.justify}`);
    }

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-layout-flex--align-items-${this.align}`);
    }

    // add a class based on the @gap argument
    if (this.gap) {
      if (this.gap.length === 2) {
        classes.push(`hds-layout-flex--row-gap-${this.gap[0]}`);
        classes.push(`hds-layout-flex--column-gap-${this.gap[1]}`);
      } else if (this.gap.length === 1) {
        classes.push(`hds-layout-flex--row-gap-${this.gap[0]}`);
        classes.push(`hds-layout-flex--column-gap-${this.gap[0]}`);
      }
    }

    // add a class based on the @wrap argument
    if (this.args.wrap) {
      classes.push('hds-layout-flex--has-wrapping');
    }

    // add a class based on the @isInline argument
    if (this.args.isInline) {
      classes.push('hds-layout-flex--is-inline');
    }

    return classes.join(' ');
  }
}
