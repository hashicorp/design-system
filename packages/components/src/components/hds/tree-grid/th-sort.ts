/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

import { didInsertGridCell, handleGridCellKeyPress } from './helpers.ts';

import {
  HdsTreeGridHorizontalAlignmentValues,
  HdsTreeGridThSortOrderValues,
  HdsTreeGridThSortOrderLabelValues,
} from './types.ts';
import type {
  HdsTreeGridHorizontalAlignment,
  HdsTreeGridThSortOrder,
  HdsTreeGridThSortOrderLabels,
} from './types.ts';
import type { HdsTreeGridThButtonSortSignature } from './th-button-sort';

export const ALIGNMENTS: string[] = Object.values(
  HdsTreeGridHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsTreeGridHorizontalAlignmentValues.Left;

export interface HdsTreeGridThSortSignature {
  Args: {
    align?: HdsTreeGridHorizontalAlignment;
    onClickSort?: HdsTreeGridThButtonSortSignature['Args']['onClick'];
    sortOrder?: HdsTreeGridThSortOrder;
    tooltip?: string;
    width?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsTreeGridThSort extends Component<HdsTreeGridThSortSignature> {
  labelId = guidFor(this);

  @action
  didInsert(element: HTMLTableCellElement): void {
    didInsertGridCell(element);
    element.addEventListener('keydown', handleGridCellKeyPress);
  }

  /**
   * @param ariaSort
   * @type {HdsTreeGridThSortOrderLabels}
   * @private
   * @default none
   * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
   */
  get ariaSort(): HdsTreeGridThSortOrderLabels {
    switch (this.args.sortOrder) {
      case HdsTreeGridThSortOrderValues.Asc:
        return HdsTreeGridThSortOrderLabelValues.Asc;
      case HdsTreeGridThSortOrderValues.Desc:
        return HdsTreeGridThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsTreeGridThSortOrderLabelValues.None;
    }
  }

  get align(): HdsTreeGridHorizontalAlignment {
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

    return classes.join(' ');
  }
}
