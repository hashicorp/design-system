/**
 * TODOs
 * - Make sure that removed keys are no longer tracked
 */

import Component from '@glimmer/component';
import { fn, hash } from '@ember/helper';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { scheduleOnce } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { TrackedMap } from 'tracked-built-ins';
import { HdsAdvancedTableColumnReorderSideValues } from '../types.ts';

import type {
  HdsAdvancedTableColumnReorderCallback,
  HdsAdvancedTableColumnReorderSide,
  HdsAdvancedTableNormalizedColumn,
} from '../types.ts';
import type { ModifierLike } from '@glint/template';

export interface HdsAdvancedTableSyncColumnOrderSignature {
  Element: HTMLDivElement;
  Args: {
    Positional: [HdsAdvancedTableNormalizedColumn[], string[] | undefined];
  };
}

interface HdsAdvancedTableColumnManagerOrderSignature {
  Args: {
    columns: HdsAdvancedTableNormalizedColumn[];
    columnOrder: string[] | undefined;
    hasReorderableColumns?: boolean;
    hasStickyFirstColumn?: boolean;
    onColumnReorder: HdsAdvancedTableColumnReorderCallback | undefined;
    getColumnByKey: (
      key: string
    ) => HdsAdvancedTableNormalizedColumn | undefined;
    thElements: TrackedMap<string, HTMLDivElement>;
  };
  Blocks: {
    default: [
      {
        orderedColumns: HdsAdvancedTableNormalizedColumn[];
        columnOrder: string[];
        draggedColumnKey: string | null;
        reorderHoveredColumnKey: string | null;
        firstColumnKey: string | undefined;
        lastColumnKey: string | undefined;
        syncColumnOrder: ModifierLike<HdsAdvancedTableSyncColumnOrderSignature>;
        moveColumnToDropTarget: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'],
          side: HdsAdvancedTableColumnReorderSide
        ) => void;
        moveColumnToTarget: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'],
          targetColumnKey: HdsAdvancedTableNormalizedColumn['key'],
          side: HdsAdvancedTableColumnReorderSide
        ) => void;
        moveColumnToTerminalPosition: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'],
          position: 'start' | 'end'
        ) => void;
        stepColumn: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'],
          step: number
        ) => void;
        setDraggedColumnKey: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'] | null
        ) => void;
        setReorderHoveredColumnKey: (
          key: HdsAdvancedTableNormalizedColumn['key'] | null
        ) => void;
      },
    ];
  };
}

export default class HdsAdvancedTableColumnManagerOrder extends Component<HdsAdvancedTableColumnManagerOrderSignature> {
  @tracked draggedColumnKey: HdsAdvancedTableNormalizedColumn['key'] | null =
    null;
  @tracked reorderHoveredColumnKey:
    | HdsAdvancedTableNormalizedColumn['key']
    | null = null;
  @tracked private _columnOrder: string[] = [];
  @tracked private _lastColumnOrder: string[] = [];

  get columnOrder(): string[] {
    return this._columnOrder.length > 0
      ? this._columnOrder
      : this.args.columns.map((column) => this._getColumnKey(column));
  }
  set columnOrder(value: string[]) {
    this._columnOrder = value;
  }

  get orderedColumns(): HdsAdvancedTableNormalizedColumn[] {
    const { hasReorderableColumns, columns } = this.args;

    if (hasReorderableColumns && this.columnOrder !== undefined) {
      const columnMap = new Map(columns.map((column) => [column.key, column]));

      return this.columnOrder.reduce<HdsAdvancedTableNormalizedColumn[]>(
        (acc, key) => {
          const column = columnMap.get(key);

          if (column !== undefined) {
            acc.push(column);
          }

          return acc;
        },
        []
      );
    } else {
      return columns;
    }
  }

  get firstColumnKey(): HdsAdvancedTableNormalizedColumn['key'] | undefined {
    const firstColumn = this.orderedColumns[0];

    return firstColumn?.key;
  }

  get lastColumnKey(): HdsAdvancedTableNormalizedColumn['key'] | undefined {
    const lastColumn = this.orderedColumns[this.orderedColumns.length - 1];

    return lastColumn?.key;
  }

  moveColumnToTerminalPosition = (
    columnKey: HdsAdvancedTableNormalizedColumn['key'],
    position: 'start' | 'end'
  ): void => {
    let targetColumnKey: HdsAdvancedTableNormalizedColumn['key'];
    let side: HdsAdvancedTableColumnReorderSide;

    const firstColumn = this.orderedColumns[0];
    const lastColumn = this.orderedColumns[this.orderedColumns.length - 1];

    if (firstColumn === undefined || lastColumn === undefined) {
      return;
    }

    if (position === 'start') {
      targetColumnKey = firstColumn.key!;
      side = HdsAdvancedTableColumnReorderSideValues.Left;
    } else {
      targetColumnKey = lastColumn.key!;
      side = HdsAdvancedTableColumnReorderSideValues.Right;
    }

    // Move the column to the target position
    this.moveColumnToTarget(columnKey, targetColumnKey, side);
  };

  stepColumn = (
    columnKey: HdsAdvancedTableNormalizedColumn['key'],
    step: number
  ): void => {
    const oldIndex = this.columnOrder.indexOf(columnKey);
    const newIndex = oldIndex + step;

    // Check if the new position is within the array bounds.
    if (newIndex < 0 || newIndex >= this.columnOrder.length) {
      return;
    }

    const targetColumnKey = this.columnOrder[newIndex];

    if (targetColumnKey === undefined) {
      return;
    }

    // Determine the side based on the step direction.
    const side: HdsAdvancedTableColumnReorderSide =
      step > 0
        ? HdsAdvancedTableColumnReorderSideValues.Right
        : HdsAdvancedTableColumnReorderSideValues.Left;

    this.moveColumnToTarget(columnKey, targetColumnKey, side);
  };

  moveColumnToDropTarget = (
    targetColumnKey: HdsAdvancedTableNormalizedColumn['key'],
    side: HdsAdvancedTableColumnReorderSide
  ): void => {
    const sourceColumnKey = this.draggedColumnKey;

    if (sourceColumnKey === null || sourceColumnKey === targetColumnKey) {
      return;
    }

    this.moveColumnToTarget(sourceColumnKey, targetColumnKey, side);
  };

  moveColumnToTarget = (
    sourceColumnKey: HdsAdvancedTableNormalizedColumn['key'],
    targetColumnKey: HdsAdvancedTableNormalizedColumn['key'],
    side: HdsAdvancedTableColumnReorderSide
  ): void => {
    const oldIndex = this.columnOrder.indexOf(sourceColumnKey);
    const newIndex = this.columnOrder.indexOf(targetColumnKey);

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

      updated.splice(adjustedIndex, 0, sourceColumnKey); // Insert at new position

      this.columnOrder = updated;

      // we need to wait until the reposition has finished
      requestAnimationFrame(() => {
        const thElement = this.args.thElements.get(sourceColumnKey);

        if (thElement === undefined) {
          return;
        }

        thElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });

        this.draggedColumnKey = null;

        const column = this.args.getColumnByKey(sourceColumnKey);

        assert('No column found with that key', column !== undefined);

        this.setColumnOrder({
          column,
          newOrder: updated,
          insertedAt: updated.indexOf(sourceColumnKey),
        });
      });
    }
  };

  setColumnOrder: HdsAdvancedTableColumnReorderCallback = ({
    column,
    newOrder,
    insertedAt,
  }) => {
    const { onColumnReorder } = this.args;

    this.columnOrder = newOrder;

    onColumnReorder?.({ column, newOrder, insertedAt });
  };

  private _getColumnKey(column: HdsAdvancedTableNormalizedColumn): string {
    return column.key ?? guidFor(column);
  }

  syncColumnOrder = modifier<HdsAdvancedTableSyncColumnOrderSignature>(
    (_element, [columns, columnOrder]) => {
      const columnKeys = columns.map((column) => this._getColumnKey(column));

      let nextOrder = this._columnOrder;

      if (columnOrder !== undefined) {
        const sameLength = columnOrder.length === this._lastColumnOrder.length;
        const sameOrder =
          sameLength &&
          columnOrder.every(
            (value, index) => value === this._lastColumnOrder[index]
          );

        if (!sameOrder) {
          nextOrder = [...columnOrder];
        }
      }

      if (nextOrder.length === 0) {
        nextOrder = [...columnKeys];
      }

      const missingKeys = columnKeys.filter((key) => !nextOrder.includes(key));

      if (missingKeys.length > 0) {
        nextOrder = [...nextOrder, ...missingKeys];
      }

      const isSame =
        nextOrder.length === this._columnOrder.length &&
        nextOrder.every((value, index) => value === this._columnOrder[index]);

      const setColumnOrder = () => {
        this.columnOrder = nextOrder;

        if (columnOrder !== undefined) {
          this._lastColumnOrder = [...columnOrder];
        }
      };

      if (!isSame) {
        // eslint-disable-next-line ember/no-runloop
        scheduleOnce('afterRender', this, setColumnOrder);
      }
    }
  );

  <template>
    {{yield
      (hash
        orderedColumns=this.orderedColumns
        columnOrder=this.columnOrder
        draggedColumnKey=this.draggedColumnKey
        reorderHoveredColumnKey=this.reorderHoveredColumnKey
        firstColumnKey=this.firstColumnKey
        lastColumnKey=this.lastColumnKey
        syncColumnOrder=this.syncColumnOrder
        moveColumnToDropTarget=this.moveColumnToDropTarget
        moveColumnToTarget=this.moveColumnToTarget
        moveColumnToTerminalPosition=this.moveColumnToTerminalPosition
        stepColumn=this.stepColumn
        setDraggedColumnKey=(fn (mut this.draggedColumnKey))
        setReorderHoveredColumnKey=(fn (mut this.reorderHoveredColumnKey))
      )
    }}
  </template>
}
