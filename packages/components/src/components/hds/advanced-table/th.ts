/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

import type {
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableScope,
} from './types.ts';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.ts';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsAdvancedTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;

export interface HdsAdvancedTableThSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    isVisuallyHidden?: boolean;
    scope?: HdsAdvancedTableScope;
    tooltip?: string;
    width?: string;
    rowspan?: number;
    colspan?: number;
    isExpandable?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableCellElement;
}

export default class HdsAdvancedTableTh extends Component<HdsAdvancedTableThSignature> {
  labelId = guidFor(this);

  @action
  didInsert(element: HTMLTableCellElement): void {
    didInsertGridCell(element);
    element.addEventListener('keydown', handleGridCellKeyPress);
  }

  get scope(): HdsAdvancedTableScope {
    const { scope = 'col' } = this.args;
    return scope;
  }

  get role(): string {
    if (this.scope === 'col') return 'columnheader';
    else return 'rowheader';
  }

  get align(): HdsAdvancedTableHorizontalAlignment {
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
    const classes = ['hds-advanced-table__th'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__th--align-${this.align}`);
    }

    return classes.join(' ');
  }
}
