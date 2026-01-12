/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { HdsAdvancedTableColumnReorderSideValues } from './types.ts';

import type Owner from '@ember/owner';
import type {
  HdsAdvancedTableColumn,
  HdsAdvancedTableColumnReorderSide,
} from './types';
import type { HdsAdvancedTableSignature } from './index';

type HdsAdvancedTableColumnManagerColumn = HdsAdvancedTableColumn & {
  key: string;
  thElement?: HTMLDivElement;
};

export interface HdsAdvancedTableColumnManagerSignature {
  Args: {
    columns: HdsAdvancedTableSignature['Args']['columns'];
    columnOrder: HdsAdvancedTableSignature['Args']['columnOrder'];
    hasReorderableColumns: HdsAdvancedTableSignature['Args']['hasReorderableColumns'];
  };
  Blocks: {
    default?: [
      {
        orderedColumns: HdsAdvancedTableColumn[];
      },
    ];
  };
}

export default class HdsAdvancedTableColumnManager extends Component<HdsAdvancedTableColumnManagerSignature> {
  @tracked columns: HdsAdvancedTableColumnManagerColumn[] = [];
  @tracked columnOrder: string[] = [];

  get orderedColumns(): HdsAdvancedTableColumnManagerColumn[] {
    const { hasReorderableColumns } = this.args;

    if (hasReorderableColumns) {
      return this.columnOrder.reduce<HdsAdvancedTableColumnManagerColumn[]>(
        (acc, key) => {
          const column = this.columns.find((column) => column.key === key);

          if (column !== undefined) {
            acc.push(column);
          }

          return acc;
        },
        []
      );
    } else {
      return this.columns;
    }
  }

  constructor(
    owner: Owner,
    args: HdsAdvancedTableColumnManagerSignature['Args']
  ) {
    super(owner, args);

    this.setupColumns();

    this.columnOrder = args.columnOrder ?? this.columns.map((col) => col.key);
  }

  setupColumns() {
    this.columns = this.args.columns.map((column) => {
      return {
        ...column,
        align: column.align ?? 'left',
        isExpandable: 'isExpandable' in column ? column.isExpandable : false,
        isSortable: column.isSortable ?? false,
        isVisuallyHidden: column.isVisuallyHidden ?? false,
        key: column.key ?? guidFor(column),
      };
    });
  }

  @action
  moveColumnToTarget(
    sourceColumn: HdsAdvancedTableColumnManagerColumn,
    targetColumn: HdsAdvancedTableColumnManagerColumn,
    side: HdsAdvancedTableColumnReorderSide
  ): void {
    const sourceKey = sourceColumn.key;
    const targetKey = targetColumn.key;

    const oldIndex = this.columnOrder.indexOf(sourceKey);
    const newIndex = this.columnOrder.indexOf(targetKey);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updated = [...this.columnOrder];

      updated.splice(oldIndex, 1); // Remove from old position

      // Calculate the insertion index based on the side
      // If dropping to the right of the target, insert after the target
      // If dropping to the left of the target, insert before the target
      // Adjust for the shift in indices caused by removing the source column
      const adjustedIndex =
        side === HdsAdvancedTableColumnReorderSideValues.Right
          ? newIndex > oldIndex
            ? newIndex
            : newIndex + 1
          : newIndex > oldIndex
            ? newIndex - 1
            : newIndex;

      updated.splice(adjustedIndex, 0, sourceColumn.key); // Insert at new position

      this.columnOrder = updated;

      // we need to wait until the reposition has finished
      requestAnimationFrame(() => {
        sourceColumn.thElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });

        sourceColumn.isBeingDragged = false;

        this.onColumnReorder?.({
          column: sourceColumn,
          newOrder: updated,
          insertedAt: updated.indexOf(sourceColumn.key),
        });
      });
    }
  }

  @action
  stepColumn(column: HdsAdvancedTableColumnManagerColumn, step: number): void {
    const oldIndex = this.orderedColumns.indexOf(column);
    const newIndex = oldIndex + step;

    // Check if the new position is within the array bounds.
    if (newIndex < 0 || newIndex >= this.orderedColumns.length) {
      return;
    }

    const targetColumn = this.orderedColumns[newIndex];

    if (targetColumn === undefined) {
      return;
    }

    // Determine the side based on the step direction.
    const side: HdsAdvancedTableColumnReorderSide =
      step > 0
        ? HdsAdvancedTableColumnReorderSideValues.Right
        : HdsAdvancedTableColumnReorderSideValues.Left;

    this.moveColumnToTarget(column, targetColumn, side);
  }
}
