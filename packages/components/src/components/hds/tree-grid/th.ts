/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.ts';

import type {
  HdsTreeGridHorizontalAlignment,
  HdsTreeGridScope,
} from './types.ts';
import { HdsTreeGridHorizontalAlignmentValues } from './types.ts';
import { tracked } from '@glimmer/tracking';

export const ALIGNMENTS: string[] = Object.values(
  HdsTreeGridHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsTreeGridHorizontalAlignmentValues.Left;

export interface HdsTreeGridThSignature {
  Args: {
    align?: HdsTreeGridHorizontalAlignment;
    isVisuallyHidden?: boolean;
    scope?: HdsTreeGridScope;
    tooltip?: string;
    width?: string;
    childrenKey?: string;
    data?: Record<string, unknown>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableCellElement;
}

export default class HdsTreeGridTh extends Component<HdsTreeGridThSignature> {
  labelId = guidFor(this);

  @tracked isExpanded = false;

  @action onClickExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  @action
  didInsert(element: HTMLTableCellElement): void {
    didInsertGridCell(element);
    element.addEventListener('keydown', handleGridCellKeyPress);
  }

  get isExpandable(): boolean {
    const { data, childrenKey } = this.args;
    const children = data && childrenKey ? data[childrenKey] : [];

    if (
      this.args.data &&
      this.args.childrenKey &&
      Array.isArray(children) &&
      children.length > 0
    ) {
      return true;
    }

    return false;
  }

  get align(): HdsTreeGridHorizontalAlignment {
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

    return classes.join(' ');
  }
}
