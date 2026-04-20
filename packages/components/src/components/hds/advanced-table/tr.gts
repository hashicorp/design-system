/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import HdsAdvancedTableThSelectable from './th-selectable.gts';

import type {
  HdsAdvancedTableCell,
  HdsAdvancedTableScope,
  HdsAdvancedTableThSortOrder,
} from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base.gts';
import type { HdsAdvancedTableSignature } from './index.gts';
import type { HdsCompositeSignature } from '../composite/index.gts';
import type { HdsAdvancedTableThSelectableSignature } from './th-selectable.gts';

type HdsCompositeDefaultBlock = HdsCompositeSignature['Blocks']['default'][0];

export interface BaseHdsAdvancedTableTrSignature<T> {
  Args: {
    columnOrder?: HdsAdvancedTableSignature['Args']['columnOrder'];
    compositeGroup?: HdsCompositeDefaultBlock['group'];
    compositeItem?: HdsCompositeDefaultBlock['item'];
    displayRow?: boolean;
    selectableColumnKey?: HdsAdvancedTableSignature['Args']['selectableColumnKey'];
    isCompositeItemDisabled?: boolean;
    isLastRow?: boolean;
    isSelectable?: boolean;
    isSelected?: boolean;
    isParentRow?: boolean;
    hasReorderableColumns?: HdsAdvancedTableSignature['Args']['hasReorderableColumns'];
    data?: T;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string;
    selectionScope?: HdsAdvancedTableScope;
    sortBySelectedOrder?: HdsAdvancedTableThSortOrder;
    depth?: number;
    didInsert?: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    onSelectionChange?: (
      checkbox?: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    willDestroy?: () => void;
    onClickSortBySelected?: HdsAdvancedTableThSelectableSignature['Args']['onClickSortBySelected'];
    hasStickyColumn?: boolean;
    isStickyColumnPinned?: boolean;
  };
  Blocks: {
    default?: [
      {
        orderedCells?: HdsAdvancedTableCell<T>[];
      },
    ];
  };
  Element: HTMLDivElement;
}

/*
 * NOTE: There is currently an issue with `WithBoundArgs` or Glint that causes a typing error where @selectionKey is set as always required.
 *
 * Until this is fixed, we are holding off on doing a union with the SelectableHdsAdvancedTableTrArgs
 */

// Extended interface for selectable rows
// export interface SelectableHdsAdvancedTableTrArgs
//   extends BaseHdsAdvancedTableTrSignature {
//   Args: BaseHdsAdvancedTableTrSignature['Args'] & {
//     isSelectable: true;
//     selectionScope?: HdsAdvancedTableScopeValues.Row;
//     selectionKey: string; // Now required for selectable rows
//   };
// }

// Union type to combine both possible states
export type HdsAdvancedTableTrSignature<T> = BaseHdsAdvancedTableTrSignature<T>;
// | SelectableHdsAdvancedTableTrArgs;

export default class HdsAdvancedTableTr<T> extends Component<
  HdsAdvancedTableTrSignature<T>
> {
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

  get classNames(): string {
    const { depth, isLastRow, isParentRow, displayRow } = this.args;
    const classes = ['hds-advanced-table__tr'];

    if (depth && depth > 0) {
      classes.push('hds-advanced-table__tr--nested');
    }

    if (isParentRow) {
      classes.push('hds-advanced-table__tr--parent-row');
    }

    if (displayRow === false) {
      classes.push('hds-advanced-table__tr--hidden');
    }

    if (isLastRow) {
      classes.push('hds-advanced-table__tr--last-row');
    }

    return classes.join(' ');
  }

  get cells(): HdsAdvancedTableCell<T>[] {
    const { columnOrder, data } = this.args;

    if (columnOrder === undefined || data == null) {
      return [];
    }

    return columnOrder.map((columnKey) => ({
      columnKey,
      content: data[columnKey as keyof T] as HdsAdvancedTableCell<T>['content'],
    }));
  }

  get orderedCells(): HdsAdvancedTableCell<T>[] | undefined {
    const { columnOrder, data, hasReorderableColumns } = this.args;

    if (columnOrder === undefined || data === undefined) {
      return this.cells;
    }

    if (hasReorderableColumns) {
      return columnOrder.reduce<HdsAdvancedTableCell<T>[]>((acc, key) => {
        const cell = this.cells.find((cell) => cell.columnKey === key);

        if (cell !== undefined) {
          acc.push(cell);
        }

        return acc;
      }, []);
    } else {
      return this.cells;
    }
  }

  <template>
    <div class={{this.classNames}} role="row" {{@compositeGroup}} ...attributes>
      {{#if @isSelectable}}
        <HdsAdvancedTableThSelectable
          role={{if (eq @selectionScope "row") "gridcell" "columnheader"}}
          @compositeItem={{@compositeItem}}
          @isSelected={{@isSelected}}
          @selectionScope={{@selectionScope}}
          @selectionKey={{this.selectionKey}}
          @selectionAriaLabelSuffix={{@selectionAriaLabelSuffix}}
          @sortBySelectedOrder={{@sortBySelectedOrder}}
          @didInsert={{@didInsert}}
          @willDestroy={{@willDestroy}}
          @onClickSortBySelected={{@onClickSortBySelected}}
          @onSelectionChange={{@onSelectionChange}}
          @isStickyColumn={{@hasStickyColumn}}
          @isStickyColumnPinned={{@isStickyColumnPinned}}
        />
      {{/if}}

      {{yield (hash orderedCells=this.orderedCells)}}
    </div>
  </template>
}
