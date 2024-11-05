/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

import {
  HdsAdvancedTableHorizontalAlignmentValues,
  HdsAdvancedTableThSortOrderValues,
  HdsAdvancedTableThSortOrderLabelValues,
} from './types.ts';
import type {
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableThSortOrder,
  HdsAdvancedTableThSortOrderLabels,
} from './types.ts';
import type { HdsAdvancedTableThButtonSortSignature } from './th-button-sort';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsAdvancedTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;

export interface HdsAdvancedTableThSortSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    onClickSort?: HdsAdvancedTableThButtonSortSignature['Args']['onClick'];
    sortOrder?: HdsAdvancedTableThSortOrder;
    tooltip?: string;
    width?: string;
    rowspan?: number;
    colspan?: number;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThSort extends Component<HdsAdvancedTableThSortSignature> {
  labelId = guidFor(this);

  @action
  didInsert(element: HTMLTableCellElement): void {
    didInsertGridCell(element);
    element.addEventListener('keydown', handleGridCellKeyPress);
  }

  /**
   * @param ariaSort
   * @type {HdsAdvancedTableThSortOrderLabels}
   * @private
   * @default none
   * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
   */
  get ariaSort(): HdsAdvancedTableThSortOrderLabels {
    switch (this.args.sortOrder) {
      case HdsAdvancedTableThSortOrderValues.Asc:
        return HdsAdvancedTableThSortOrderLabelValues.Asc;
      case HdsAdvancedTableThSortOrderValues.Desc:
        return HdsAdvancedTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsAdvancedTableThSortOrderLabelValues.None;
    }
  }

  get align(): HdsAdvancedTableHorizontalAlignment {
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
    const classes = ['hds-advanced-table__th', 'hds-advanced-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__th--align-${this.align}`);
    }

    return classes.join(' ');
  }
}
