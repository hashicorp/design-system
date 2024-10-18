/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

import type { HdsTableHorizontalAlignment, HdsTableScope } from './types.ts';
import { HdsTableHorizontalAlignmentValues } from './types.ts';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;

export interface HdsTableThSignature {
  Args: {
    align?: HdsTableHorizontalAlignment;
    isVisuallyHidden?: boolean;
    scope?: HdsTableScope;
    tooltip?: string;
    width?: string;
    isGrid?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableCellElement;
}

export default class HdsTableTh extends Component<HdsTableThSignature> {
  labelId = guidFor(this);

  @action
  didInsert(element: HTMLTableCellElement): void {
    if (this.args.isGrid) {
      didInsertGridCell(element);
      element.addEventListener('keydown', handleGridCellKeyPress);
    }
  }

  get align(): HdsTableHorizontalAlignment {
    const { align = DEFAULT_ALIGN } = this.args;

    assert(
      `@align for "Hds::Table::Th" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );
    return align;
  }

  get classNames(): string {
    const classes = ['hds-table__th'];

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
