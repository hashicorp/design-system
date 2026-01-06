/**
 * Copyright IBM Corp. 2021, 2025
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

export const ALIGNS: HdsLayoutGridAligns[] = Object.values(
  HdsLayoutGridAlignValues
);
export const DEFAULT_GAP = HdsLayoutGridGapValues.Zero;
export const GAPS: HdsLayoutGridGaps[] = Object.values(HdsLayoutGridGapValues);

type ResponsiveColumnWidths = {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
};

export interface HdsLayoutGridSignature {
  Args: {
    tag?: AvailableTagNames;
    columnMinWidth?: string;
    columnWidth?: string | ResponsiveColumnWidths;
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
    const { gap = DEFAULT_GAP } = this.args;

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

     Default layout behavior:
     --hds-layout-grid-column-fill-type is set to auto-fit (fluid layout)

    If neither columnMinWidth nor columnWidth are passed in:
    - We do not set --hds-layout-grid-column-min-width (defaults to 0px)
    
    If columnMinWidth is passed in:
    - We set --hds-layout-grid-column-min-width to the passed in value

    If a columnWidth value is passed in:
    1) we set --hds-layout-grid-column-min-width to the passed in value for the view
    2) In the CSS, we use "auto-fill" for --hds-layout-grid-column-fill-type for the view (fixed layout)

    If both columnMinWidth & columnWidth are passed in:
    - We throw an error, as it doesn't make sense in the context of a CSS grid layout (too complex to determine which to use & desired behavior)
  */
  get inlineStyles(): Record<string, unknown> {
    const inlineStyles: {
      '--hds-layout-grid-column-min-width'?: string;
      '--hds-layout-grid-column-fill-type'?: string;

      // responsive
      '--hds-layout-grid-column-width-sm'?: string;
      '--hds-layout-grid-column-width-md'?: string;
      '--hds-layout-grid-column-width-lg'?: string;
      '--hds-layout-grid-column-width-xl'?: string;
      '--hds-layout-grid-column-width-xxl'?: string;
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
      if (typeof this.args.columnWidth === 'string') {
        inlineStyles['--hds-layout-grid-column-min-width'] =
          this.args.columnWidth;
      }
    }

    // Responsize column widths
    if (typeof this.args.columnWidth === 'object') {
      if (this.args.columnWidth.sm) {
        inlineStyles['--hds-layout-grid-column-width-sm'] =
          this.args.columnWidth.sm;
      }
      if (this.args.columnWidth.md) {
        inlineStyles['--hds-layout-grid-column-width-md'] =
          this.args.columnWidth.md;
      }
      if (this.args.columnWidth.lg) {
        inlineStyles['--hds-layout-grid-column-width-lg'] =
          this.args.columnWidth.lg;
      }
      if (this.args.columnWidth.xl) {
        inlineStyles['--hds-layout-grid-column-width-xl'] =
          this.args.columnWidth.xl;
      }
      if (this.args.columnWidth.xxl) {
        inlineStyles['--hds-layout-grid-column-width-xxl'] =
          this.args.columnWidth.xxl;
      }
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

    // If a single columnWidth string is passed in, set the respective CSS class (non-responsive view case)
    if (typeof this.args.columnWidth === 'string') {
      classes.push('hds-layout-grid--column-width-non-responsive');
    }

    // add classes based on responsive width arguments
    // If an object is passed in for the columnWidth arg, set the respective CSS classes
    if (typeof this.args.columnWidth === 'object') {
      if (this.args.columnWidth.sm) {
        classes.push('hds-layout-grid--column-width-sm');
      }
      if (this.args.columnWidth.md) {
        classes.push('hds-layout-grid--column-width-md');
      }
      if (this.args.columnWidth.lg) {
        classes.push('hds-layout-grid--column-width-lg');
      }
      if (this.args.columnWidth.xl) {
        classes.push('hds-layout-grid--column-width-xl');
      }
      if (this.args.columnWidth.xxl) {
        classes.push('hds-layout-grid--column-width-xxl');
      }
    }

    return classes.join(' ');
  }
}
