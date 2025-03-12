/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { ComponentLike } from '@glint/template';
import type { HdsLayoutGridItemSignature } from '../grid/item.ts';

import { HdsLayoutGridAlignValues, HdsLayoutGridGapValues } from './types.ts';

import type { HdsLayoutGridAligns, HdsLayoutGridGaps } from './types.ts';

export const ALIGNS: string[] = Object.values(HdsLayoutGridAlignValues);
export const GAPS: string[] = Object.values(HdsLayoutGridGapValues);

// A list of all existing tag names in the HTMLElementTagNameMap interface
type AvailableTagNames = keyof HTMLElementTagNameMap;
// A union of all types in the HTMLElementTagNameMap interface
type AvailableElements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

export interface HdsLayoutGridSignature {
  Args: {
    tag?: AvailableTagNames;
    columnMinWidth?: string;
    align?: HdsLayoutGridAligns;
    gap?: HdsLayoutGridGaps | [HdsLayoutGridGaps, HdsLayoutGridGaps];
    isInline?: boolean;
  };
  Blocks: {
    default: [
      {
        Item?: ComponentLike<HdsLayoutGridItemSignature>;
      },
    ];
  };
  Element: AvailableElements;
}

export default class HdsLayoutGrid extends Component<HdsLayoutGridSignature> {
  get columnMinWidthStyle(): Record<string, string> {
    const columnMinWidthStyle: { [key: string]: string } = {};

    // Note: "Unitless 0" <length>s aren’t supported in math functions so we use 0px as the default col min width
    // https://drafts.csswg.org/css-values/#calc-type-checking
    columnMinWidthStyle['--hds-layout-grid-column-min-width'] =
      this.args.columnMinWidth ?? '0px';

    return columnMinWidthStyle;
  }

  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
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
