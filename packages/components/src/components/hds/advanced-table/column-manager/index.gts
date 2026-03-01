/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { cached } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { TrackedMap } from 'tracked-built-ins';
import { hash } from '@ember/helper';

import HdsAdvancedTableColumnManagerWidth from './width.gts';
import HdsAdvancedTableColumnManagerOrder from './order.gts';

import type { ModifierLike } from '@glint/template';
import type { HdsAdvancedTableSyncWidthValuesSignature } from './width.gts';
import type { HdsAdvancedTableSyncColumnOrderSignature } from './order.gts';
import type {
  HdsAdvancedTableColumn,
  HdsAdvancedTableColumnReorderSide,
  HdsAdvancedTableNormalizedColumn,
} from '../types.ts';
import type { HdsAdvancedTableSignature } from '../index.ts';

export interface HdsAdvancedTableSyncThElementsSignature {
  Element: HTMLDivElement;
  Args: {
    Positional: [HdsAdvancedTableColumn['key']];
  };
}

export interface HdsAdvancedTableColumnManagerSignature {
  Args: {
    columns: HdsAdvancedTableColumn[];
    columnOrder: HdsAdvancedTableSignature['Args']['columnOrder'];
    hasReorderableColumns?: HdsAdvancedTableSignature['Args']['hasReorderableColumns'];
    hasStickyFirstColumn?: HdsAdvancedTableSignature['Args']['hasStickyFirstColumn'];
    isSelectable?: HdsAdvancedTableSignature['Args']['isSelectable'];
    onColumnReorder: HdsAdvancedTableSignature['Args']['onColumnReorder'];
  };
  Blocks: {
    default: [
      {
        columns: HdsAdvancedTableNormalizedColumn[];
        columnOrder: HdsAdvancedTableSignature['Args']['columnOrder'];
        draggedColumnKey: HdsAdvancedTableNormalizedColumn['key'] | null;
        firstColumnKey: HdsAdvancedTableNormalizedColumn['key'] | undefined;
        gridTemplateColumns: string;
        lastColumnKey: HdsAdvancedTableNormalizedColumn['key'] | undefined;
        orderedColumns: HdsAdvancedTableNormalizedColumn[];
        reorderHoveredColumnKey: HdsAdvancedTableNormalizedColumn['key'] | null;
        syncColumnOrder: ModifierLike<HdsAdvancedTableSyncColumnOrderSignature>;
        syncThElements: ModifierLike<HdsAdvancedTableSyncThElementsSignature>;
        syncWidthValues: ModifierLike<HdsAdvancedTableSyncWidthValuesSignature>;
        applyTransientWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => void;
        getAppliedWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => HdsAdvancedTableNormalizedColumn['width'];
        getColumnByKey: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => HdsAdvancedTableNormalizedColumn | undefined;
        getSiblingColumnKeys: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => {
          previous?: HdsAdvancedTableNormalizedColumn['key'];
          next?: HdsAdvancedTableNormalizedColumn['key'];
        };
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
        restoreColumnWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key']
        ) => void;
        setDraggedColumnKey: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'] | null
        ) => void;
        setReorderHoveredColumnKey: (
          key: HdsAdvancedTableNormalizedColumn['key'] | null
        ) => void;
        setTransientColumnWidths: (options: { roundValues?: boolean }) => void;
        setTransientColumnWidth: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'],
          width: `${number}px`,
          clamped?: boolean
        ) => void;
        resetTransientColumnWidths: () => void;
        stepColumn: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'],
          step: number
        ) => void;
        updateResizeDebt: (
          columnKey: HdsAdvancedTableNormalizedColumn['key'],
          delta: number
        ) => void;
      },
    ];
  };
}

export default class HdsAdvancedTableColumnManager extends Component<HdsAdvancedTableColumnManagerSignature> {
  thElements = new TrackedMap<string, HTMLDivElement>();

  @cached
  get normalizedColumns(): HdsAdvancedTableNormalizedColumn[] {
    return this.args.columns.map((column) => {
      return column.key !== undefined
        ? (column as HdsAdvancedTableNormalizedColumn)
        : { ...column, key: guidFor(column) };
    });
  }

  getColumnByKey = (
    key: HdsAdvancedTableColumn['key']
  ): HdsAdvancedTableNormalizedColumn | undefined => {
    if (key === undefined) {
      return;
    }

    return this.normalizedColumns.find((column) => column.key === key);
  };

  syncThElements = modifier<HdsAdvancedTableSyncThElementsSignature>(
    (element, [key]) => {
      if (key !== undefined) {
        this.thElements.set(key, element);
      }
    }
  );

  <template>
    <HdsAdvancedTableColumnManagerOrder
      @columns={{this.normalizedColumns}}
      @columnOrder={{@columnOrder}}
      @hasReorderableColumns={{@hasReorderableColumns}}
      @hasStickyFirstColumn={{@hasStickyFirstColumn}}
      @onColumnReorder={{@onColumnReorder}}
      @getColumnByKey={{this.getColumnByKey}}
      @thElements={{this.thElements}}
      as |Order|
    >
      <HdsAdvancedTableColumnManagerWidth
        @columns={{this.normalizedColumns}}
        @orderedColumns={{Order.orderedColumns}}
        @columnOrder={{Order.columnOrder}}
        @isSelectable={{@isSelectable}}
        @getColumnByKey={{this.getColumnByKey}}
        @thElements={{this.thElements}}
        as |Width|
      >
        {{yield
          (hash
            columns=this.normalizedColumns
            columnOrder=Order.columnOrder
            draggedColumnKey=Order.draggedColumnKey
            firstColumnKey=Order.firstColumnKey
            gridTemplateColumns=Width.gridTemplateColumns
            lastColumnKey=Order.lastColumnKey
            orderedColumns=Order.orderedColumns
            syncColumnOrder=Order.syncColumnOrder
            syncThElements=this.syncThElements
            syncWidthValues=Width.syncWidthValues
            applyTransientWidth=Width.applyTransientWidth
            getAppliedWidth=Width.getAppliedWidth
            getColumnByKey=this.getColumnByKey
            getSiblingColumnKeys=Width.getSiblingColumnKeys
            reorderHoveredColumnKey=Order.reorderHoveredColumnKey
            restoreColumnWidth=Width.restoreColumnWidth
            moveColumnToDropTarget=Order.moveColumnToDropTarget
            moveColumnToTarget=Order.moveColumnToTarget
            moveColumnToTerminalPosition=Order.moveColumnToTerminalPosition
            setTransientColumnWidths=Width.setTransientColumnWidths
            setTransientColumnWidth=Width.setTransientColumnWidth
            resetTransientColumnWidths=Width.resetTransientColumnWidths
            stepColumn=Order.stepColumn
            setDraggedColumnKey=Order.setDraggedColumnKey
            setReorderHoveredColumnKey=Order.setReorderHoveredColumnKey
            updateResizeDebt=Width.updateResizeDebt
          )
        }}
      </HdsAdvancedTableColumnManagerWidth>
    </HdsAdvancedTableColumnManagerOrder>
  </template>
}
