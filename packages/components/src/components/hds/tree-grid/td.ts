/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

import type { HdsTreeGridHorizontalAlignment } from './types.ts';
import { HdsTreeGridHorizontalAlignmentValues } from './types.ts';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsTreeGridHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsTreeGridHorizontalAlignmentValues.Left;

export interface HdsTreeGridTdSignature {
  Args: {
    align?: HdsTreeGridHorizontalAlignment;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableCellElement;
}
export default class HdsTreeGridTd extends Component<HdsTreeGridTdSignature> {
  @action
  didInsert(element: HTMLTableCellElement): void {
    console.log('did insert');
    didInsertGridCell(element);
    element.addEventListener('keydown', handleGridCellKeyPress);
  }

  get align(): HdsTreeGridHorizontalAlignment {
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

    return classes.join(' ');
  }
}
