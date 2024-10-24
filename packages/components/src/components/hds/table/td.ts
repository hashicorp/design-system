/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

import type { HdsTableHorizontalAlignment } from './types.ts';
import { HdsTableHorizontalAlignmentValues } from './types.ts';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;

export interface HdsTableTdSignature {
  Args: {
    align?: HdsTableHorizontalAlignment;
    isGrid?: boolean;
    isActiveGridCell?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableCellElement;
}
export default class HdsTableTd extends Component<HdsTableTdSignature> {
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
      `@align for "Hds::Table::Td" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );
    return align;
  }

  get classNames(): string {
    const classes = [
      'hds-table__td',
      'hds-typography-body-200',
      'hds-font-weight-regular',
    ];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__td--align-${this.align}`);
    }

    if (this.args.isGrid) {
      classes.push(`hds-table__td--gridcell`);
    }

    if (this.args.isActiveGridCell) {
      classes.push(`hds-table__td--gridcell-active`);
    }

    return classes.join(' ');
  }
}
