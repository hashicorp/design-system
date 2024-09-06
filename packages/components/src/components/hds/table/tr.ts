/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTableScopeValues } from './types.ts';
import type { HdsTableScope, HdsTableThSortOrder } from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export interface BaseHdsTableTrArgs {
  Args: {
    sortBySelectedItemKey?: string;
    isSelectable?: boolean;
    isSelected?: false;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string;
    selectionScope: HdsTableScope;
    sortOrder?: HdsTableThSortOrder;
    didInsert: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    onSelectionChange: (
      checkbox?: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    willDestroy: () => void;
    onClickSort?: (sortBy?: string) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableRowElement;
}

// Extended interface for selectable rows
export interface SelectableHdsTableTrArgs extends BaseHdsTableTrArgs {
  Args: BaseHdsTableTrArgs['Args'] & {
    isSelectable: true;
    selectionScope: HdsTableScopeValues.Row;
    selectionKey: string; // Now required for selectable rows
  };
}

// Union type to combine both possible states
export type HdsTableTrArgs = BaseHdsTableTrArgs | SelectableHdsTableTrArgs;

function getRowContainerElement(
  element: HTMLTableRowElement
): HTMLElement | null {
  let parent = element.parentElement;

  while (parent && parent.tagName !== 'TABLE') {
    if (['TBODY', 'THEAD'].includes(parent.tagName)) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return parent;
}
export default class HdsTableTr extends Component<HdsTableTrArgs> {
  @tracked isHeaderRow = false;

  get selectionKey(): string | undefined {
    if (this.args.isSelectable && this.args.selectionScope === 'row') {
      assert(
        `@selectionKey must be defined on Table::Tr or B.Tr when @isSelectable is true`,
        this.args.selectionKey
      );
      return this.args.selectionKey;
    }
    return undefined;
  }

  get showSortButton(): boolean {
    return (
      this.isHeaderRow && typeof this.args.sortBySelectedItemKey === 'string'
    );
  }

  @action
  didInsert(element: HdsTableTrArgs['Element']) {
    const rowContainer = getRowContainerElement(element);

    this.isHeaderRow = rowContainer?.tagName === 'THEAD';
  }
}
