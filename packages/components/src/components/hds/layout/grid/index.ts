/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { ComponentLike } from '@glint/template';
// TODO: Determine if "GridItem" should be created & used instead of "FlexItem"
import type { HdsLayoutFlexItemSignature } from '../flex/item.ts';

import {
  HdsLayoutGridJustifyValues,
  HdsLayoutGridAlignValues,
  HdsLayoutGridGapValues,
} from './types.ts';

import type {
  HdsLayoutGridJustifys,
  HdsLayoutGridAligns,
  HdsLayoutGridGaps,
} from './types.ts';

export const JUSTIFYS: string[] = Object.values(HdsLayoutGridJustifyValues);
export const ALIGNS: string[] = Object.values(HdsLayoutGridAlignValues);
export const GAPS: string[] = Object.values(HdsLayoutGridGapValues);

// A list of all existing tag names in the HTMLElementTagNameMap interface
type AvailableTagNames = keyof HTMLElementTagNameMap;
// A union of all types in the HTMLElementTagNameMap interface
type AvailableElements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

export interface HdsLayoutGridSignature {
  Args: {
    tag?: AvailableTagNames;
    justify?: HdsLayoutGridJustifys;
    align?: HdsLayoutGridAligns;
    gap?: HdsLayoutGridGaps | [HdsLayoutGridGaps, HdsLayoutGridGaps];
    isInline?: boolean;
  };
  Blocks: {
    default: [
      {
        // TODO: Determine if "GridItem" should be created & used instead of "FlexItem"
        Item?: ComponentLike<HdsLayoutFlexItemSignature>;
      },
    ];
  };
  Element: AvailableElements;
}
// More info on types and signatures: https://hashicorp.atlassian.net/wiki/spaces/HDS/pages/3245932580/Using+Typescript

export default class HdsLayoutGrid extends Component<HdsLayoutGridSignature> {
  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
  }

  get justify(): HdsLayoutGridJustifys | undefined {
    const { justify } = this.args;

    if (justify) {
      assert(
        `@justify for "Hds::Layout::Grid" must be one of the following: ${JUSTIFYS.join(
          ', '
        )}; received: ${justify}`,
        JUSTIFYS.includes(justify)
      );
    }

    return justify;
  }

  get align(): HdsLayoutGridAligns | undefined {
    const { align } = this.args;

    if (align) {
      assert(
        `@align for "Hds::Layout::Grid" must be one of the following: ${ALIGNS.join(
          ', '
        )}; received: ${align}`,
        ALIGNS.includes(align)
      );
    }

    return align;
  }

  get gap():
    | [HdsLayoutGridGaps]
    | [HdsLayoutGridGaps, HdsLayoutGridGaps]
    | undefined {
    const { gap } = this.args;

    if (gap) {
      assert(
        `@gap for "Hds::Layout::Grid" must be a single value or an array of two values of one of the following: ${GAPS.join(
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

  get classNames(): string {
    const classes = ['hds-layout-grid'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-layout-grid--align-items-${this.align}`);
    }

    // add a class based on the @gap argument
    if (this.gap) {
      if (this.gap.length === 2) {
        classes.push(`hds-layout-grid--row-gap-${this.gap[0]}`);
        classes.push(`hds-layout-grid--column-gap-${this.gap[1]}`);
      } else if (this.gap.length === 1) {
        classes.push(`hds-layout-grid--gap-${this.gap[0]}`);
      }
    }

    // add a class based on the @isInline argument
    if (this.args.isInline) {
      classes.push('hds-layout-grid--is-inline');
    }

    return classes.join(' ');
  }
}
