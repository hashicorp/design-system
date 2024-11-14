/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

import type { HdsAdvancedTableHorizontalAlignment } from './types.ts';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.ts';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsAdvancedTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;

export interface HdsAdvancedTableTdSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    rowspan?: number;
    colspan?: number;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}
export default class HdsAdvancedTableTd extends Component<HdsAdvancedTableTdSignature> {
  @action
  didInsert(element: HTMLDivElement): void {
    didInsertGridCell(element);
    element.addEventListener('keydown', handleGridCellKeyPress);
  }

  // rowspan and colspan have to return 'auto' if not defined because otherwise the style modifier sets grid-area: undefined on the cell, which breaks the grid styles
  get rowspan(): string {
    if (this.args.rowspan) {
      return `span ${this.args.rowspan}`;
    }
    return 'auto';
  }

  get colspan(): string | undefined {
    if (this.args.colspan) {
      return `span ${this.args.colspan}`;
    }
    return 'auto';
  }

  get align(): HdsAdvancedTableHorizontalAlignment {
    const { align = DEFAULT_ALIGN } = this.args;

    assert(
      `@align for "Hds::AdvancedTable::Td" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );
    return align;
  }

  get classNames(): string {
    const classes = [
      'hds-advanced-table__td',
      'hds-typography-body-200',
      'hds-font-weight-regular',
    ];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__td--align-${this.align}`);
    }

    return classes.join(' ');
  }
}
