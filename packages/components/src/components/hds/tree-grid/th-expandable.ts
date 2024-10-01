/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
// import { action } from '@ember/object';

import { HdsTreeGridHorizontalAlignmentValues } from './types.ts';
import type { HdsTreeGridHorizontalAlignment } from './types.ts';
import type { HdsTreeGridThButtonExpandSignature } from './th-button-expand.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsTreeGridHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsTreeGridHorizontalAlignmentValues.Left;

export interface HdsTreeGridThExpandSignature {
  Args: {
    align?: HdsTreeGridHorizontalAlignment;
    onClickExpand?: HdsTreeGridThButtonExpandSignature['Args']['onClick'];
    tooltip?: string;
    width?: string;
    isGrid?: boolean;
    isExpanded?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsTreeGridThExpand extends Component<HdsTreeGridThExpandSignature> {
  labelId = guidFor(this);

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
    const classes = ['hds-table__th', 'hds-table__td--expand'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__td--expand-${this.align}`);
    }

    if (this.args.isGrid) {
      classes.push(`hds-table__td--gridcell`);
    }

    return classes.join(' ');
  }
}
