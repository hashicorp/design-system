/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

import {
  HdsTableHorizontalAlignmentValues,
  HdsTableThSortOrderValues,
  HdsTableThSortOrderLabelValues,
} from './types.ts';
import type {
  HdsTableHorizontalAlignment,
  HdsTableThSortOrder,
  HdsTableThSortOrderLabels,
} from './types.ts';
import type { HdsTableThButtonSortSignature } from './th-button-sort';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;

export interface HdsTableThSortSignature {
  Args: {
    align?: HdsTableHorizontalAlignment;
    onClickSort?: HdsTableThButtonSortSignature['Args']['onClick'];
    sortOrder?: HdsTableThSortOrder;
    tooltip?: string;
    width?: string;
    isGrid?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsTableThSort extends Component<HdsTableThSortSignature> {
  labelId = guidFor(this);

  @action
  didInsert(element: HTMLTableCellElement): void {
    if (this.args.isGrid) {
      didInsertGridCell(element);
      element.addEventListener('keydown', handleGridCellKeyPress);
    }
  }

  /**
   * @param ariaSort
   * @type {HdsTableThSortOrderLabels}
   * @private
   * @default none
   * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
   */
  get ariaSort(): HdsTableThSortOrderLabels {
    switch (this.args.sortOrder) {
      case HdsTableThSortOrderValues.Asc:
        return HdsTableThSortOrderLabelValues.Asc;
      case HdsTableThSortOrderValues.Desc:
        return HdsTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsTableThSortOrderLabelValues.None;
    }
  }

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

  get classNames(): string {
    const classes = ['hds-table__th', 'hds-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__th--align-${this.align}`);
    }

    if (this.args.isGrid) {
      classes.push(`hds-table__td--gridcell`);
    }

    return classes.join(' ');
  }
}
