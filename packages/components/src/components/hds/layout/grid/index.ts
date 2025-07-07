/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { ComponentLike } from '@glint/template';
import type { HdsLayoutGridItemSignature } from '../grid/item.ts';

import { HdsLayoutGridAlignValues, HdsLayoutGridGapValues } from './types.ts';

import type {
  HdsLayoutGridAligns,
  HdsLayoutGridGaps,
  AvailableTagNames,
  AvailableElements,
} from './types.ts';

export const ALIGNS: string[] = Object.values(HdsLayoutGridAlignValues);
export const GAPS: string[] = Object.values(HdsLayoutGridGapValues);

export interface HdsLayoutGridSignature {
  Args: {
    tag?: AvailableTagNames;
    columnMinWidth?: string;
    columnWidth?: string;
    align?: HdsLayoutGridAligns;
    gap?: HdsLayoutGridGaps | [HdsLayoutGridGaps, HdsLayoutGridGaps];
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
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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

  /*
    LOGIC:

    If columnMinWidth is passed in:
    1) we set --hds-layout-grid-column-min-width to the passed in value
    2) We use the fallback value of "auto-fit" for --hds-layout-grid-column-fill-type (reults in a more fluid layout)

    If columnWidth is passed in:
    1) we set --hds-layout-grid-column-min-width to the passed in value
    2) we set --hds-layout-grid-column-fill-type to "auto-fill" (results in a more fixed layout)

    If both columnMinWidth & columnWidth are passed in:
    1) We throw an error, as it doesn't make sense in the context of a CSS grid layout (too complex to determine which to use & desired behavior)
  */
  get inlineStyles(): Record<string, unknown> {
    const inlineStyles: {
      '--hds-layout-grid-column-min-width'?: string;
      '--hds-layout-grid-column-fill-type'?: string;
    } = {};

    // if both columnMinWidth and columnWidth are passed in, we throw an error
    assert(
      `@columnMinWidth and @columnWidth for "Hds::Layout::Grid" cannot be used together`,
      !(this.args.columnMinWidth && this.args.columnWidth)
    );

    if (this.args.columnMinWidth) {
      inlineStyles['--hds-layout-grid-column-min-width'] =
        this.args.columnMinWidth;
    } else if (this.args.columnWidth) {
      inlineStyles['--hds-layout-grid-column-min-width'] =
        this.args.columnWidth;
      inlineStyles['--hds-layout-grid-column-fill-type'] = 'auto-fill';
    }

    return inlineStyles;
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
        classes.push(`hds-layout-grid--row-gap-${this.gap[0]}`);
        classes.push(`hds-layout-grid--column-gap-${this.gap[0]}`);
      }
    }

    return classes.join(' ');
  }
}
