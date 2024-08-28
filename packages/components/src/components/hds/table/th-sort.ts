/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';

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
  labelId = guidFor(this);

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

    return classes.join(' ');
  }
}
