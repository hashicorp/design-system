/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';

import type { HdsTableHorizontalAlignment } from './types.ts';
import {
  HdsTableHorizontalAlignmentValues,
  HdsTableThSortOrder,
  HdsTableThSortOrderLabels,
} from './types.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;

export interface HdsTableThSortArgs {
  Args: {
    align?: HdsTableHorizontalAlignment;
    onClickSort?: () => void;
    sortOrder?: HdsTableThSortOrder;
    tooltip?: string;
    width?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsTableThSortComponent extends Component<HdsTableThSortArgs> {
  /**
   * Generates a unique ID for the <span> element ("label")
   *
   * @param labelId
   */
  labelId = guidFor(this);

  /**
   * @param ariaSort
   * @type {HdsTableThSortOrderLabels}
   * @private
   * @default none
   * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
   */
  get ariaSort(): HdsTableThSortOrderLabels {
    switch (this.args.sortOrder) {
      case HdsTableThSortOrder.Asc:
        return HdsTableThSortOrderLabels.Asc;
      case HdsTableThSortOrder.Desc:
        return HdsTableThSortOrderLabels.Desc;
      default:
        // none is the default per the spec.
        return HdsTableThSortOrderLabels.None;
    }
  }

  /**
   * @param align
   * @type {HdsTableHorizontalAlignment}
   * @default left
   * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
   */
  get align(): HdsTableHorizontalAlignment {
    const { align = DEFAULT_ALIGN } = this.args;

    assert(
      `@align for "Hds::Table" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );
    return align;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-table__th', 'hds-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__th--align-${this.align}`);
    }

    return classes.join(' ');
  }
}
