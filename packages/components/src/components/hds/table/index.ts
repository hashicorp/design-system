/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import type { ComponentLike } from '@glint/template';

import {
  HdsTableDensityValues,
  HdsTableThSortOrderValues,
  HdsTableVerticalAlignmentValues,
} from './types.ts';
import type {
  HdsTableColumn,
  HdsTableDensities,
  HdsTableHorizontalAlignment,
  HdsTableOnSelectionChangeSignature,
  HdsTableSelectableRow,
  HdsTableSortingFunction,
  HdsTableThSortOrder,
  HdsTableVerticalAlignment,
  HdsTableModel,
} from './types';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsTableTdSignature } from './td.ts';
import type { HdsTableThSignature } from './th.ts';
import type { HdsTableThSortSignature } from './th-sort.ts';
import type { HdsTableTrSignature } from './tr.ts';

export const DENSITIES: HdsTableDensities[] = Object.values(
  HdsTableDensityValues
);
export const DEFAULT_DENSITY = HdsTableDensityValues.Medium;

export const VALIGNMENTS: HdsTableVerticalAlignment[] = Object.values(
  HdsTableVerticalAlignmentValues
);
export const DEFAULT_VALIGN = HdsTableVerticalAlignmentValues.Top;

export interface HdsTableSignature {
  Args: {
    align?: HdsTableHorizontalAlignment;
    caption?: string;
    columns?: HdsTableColumn[];
    density?: HdsTableDensities;
    identityKey?: string;
    isFixedLayout?: boolean;
    isSelectable?: boolean;
    isStriped?: boolean;
    model?: HdsTableModel;
    onSelectionChange?: (selection: HdsTableOnSelectionChangeSignature) => void;
    onSort?: (sortBy: string, sortOrder: HdsTableThSortOrder) => void;
    selectionAriaLabelSuffix?: string;
    sortBy?: string;
    selectableColumnKey?: string;
    sortedMessageText?: string;
    sortOrder?: HdsTableThSortOrder;
    valign?: HdsTableVerticalAlignment;
  };
  Blocks: {
    head?: [
      {
        Tr?: ComponentLike<HdsTableTrSignature>;
        Th?: ComponentLike<HdsTableThSignature>;
        ThSort?: ComponentLike<HdsTableThSortSignature>;
        sortBy?: string;
        sortOrder?: HdsTableThSortOrder;
        setSortBy?: (column: string) => void;
      },
    ];
    body?: [
      {
        Td?: ComponentLike<HdsTableTdSignature>;
        Tr?: ComponentLike<HdsTableTrSignature>;
        Th?: ComponentLike<HdsTableThSignature>;
        data?: Record<string, unknown>;
        rowIndex?: number;
        sortBy?: string;
        sortOrder?: HdsTableThSortOrder;
      },
    ];
  };
  Element: HTMLTableElement;
}

export default class HdsTable extends Component<HdsTableSignature> {
  @tracked private _sortBy;
  @tracked private _sortOrder;
  @tracked
  private _selectAllCheckbox?: HdsFormCheckboxBaseSignature['Element'] =
    undefined;
  private _selectableRows: HdsTableSelectableRow[] = [];
  @tracked private _isSelectAllCheckboxSelected?: boolean = undefined;

  constructor(owner: unknown, args: HdsTableSignature['Args']) {
    super(owner, args);
    this._sortBy = this.args.sortBy ?? undefined;
    this._sortOrder = this.args.sortOrder ?? HdsTableThSortOrderValues.Asc;
  }

  get getSortCriteria(): string | HdsTableSortingFunction<unknown> {
    // get the current column
    const currentColumn = this.args?.columns?.find(
      (column) => column.key === this._sortBy
    );
    if (
      // check if there is a custom sorting function associated with the current `sortBy` column (we assume the column has `isSortable`)
      currentColumn?.sortingFunction &&
      typeof currentColumn.sortingFunction === 'function'
    ) {
      return currentColumn.sortingFunction;
    } else {
      // otherwise fallback to the default format "sortBy:sortOrder"
      return `${this._sortBy}:${this._sortOrder}`;
    }
  }

  get identityKey(): string | undefined {
    // we have to provide a way for the consumer to pass undefined because Ember tries to interpret undefined as missing an arg and therefore falls back to the default
    if (this.args.identityKey === 'none') {
      return undefined;
    } else {
      return this.args.identityKey ?? '@identity';
    }
  }

  get sortedMessageText(): string {
    if (this.args.sortedMessageText) {
      return this.args.sortedMessageText;
    } else if (this._sortBy && this._sortOrder) {
      // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
      return `Sorted by ${this._sortBy} ${this._sortOrder}ending`;
    } else {
      return '';
    }
  }

  get isStriped(): boolean {
    return this.args.isStriped ?? false;
  }

  get isFixedLayout(): boolean {
    return this.args.isFixedLayout ?? false;
  }

  get density(): HdsTableDensities {
    const { density = DEFAULT_DENSITY } = this.args;

    assert(
      `@density for "Hds::Table" must be one of the following: ${DENSITIES.join(
        ', '
      )}; received: ${density}`,
      DENSITIES.includes(density)
    );

    return density;
  }

  get valign(): HdsTableVerticalAlignment {
    const { valign = DEFAULT_VALIGN } = this.args;

    assert(
      `@valign for "Hds::Table" must be one of the following: ${VALIGNMENTS.join(
        ', '
      )}; received: ${valign}`,
      VALIGNMENTS.includes(valign)
    );

    return valign;
  }

  get classNames(): string {
    const classes = ['hds-table'];

    // add a class based on the @isStriped argument
    if (this.isStriped) {
      classes.push('hds-table--striped');
    }

    // add a class based on the @isFixedLayout argument
    if (this.isFixedLayout) {
      classes.push('hds-table--layout-fixed');
    }

    // add a class based on the @density argument
    if (this.density) {
      classes.push(`hds-table--density-${this.density}`);
    }

    // add a class based on the @valign argument
    if (this.valign) {
      classes.push(`hds-table--valign-${this.valign}`);
    }

    return classes.join(' ');
  }

  @action
  setSortBy(column: string): void {
    if (this._sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this._sortOrder =
        this._sortOrder === HdsTableThSortOrderValues.Asc
          ? HdsTableThSortOrderValues.Desc
          : HdsTableThSortOrderValues.Asc;
    } else {
      // otherwise, set the sort order to ascending
      this._sortBy = column;
      this._sortOrder = HdsTableThSortOrderValues.Asc;
    }

    const { onSort } = this.args;

    if (typeof onSort === 'function') {
      onSort(this._sortBy, this._sortOrder);
    }
  }

  onSelectionChangeCallback(
    checkbox?: HdsFormCheckboxBaseSignature['Element'],
    selectionKey?: string
  ): void {
    const { onSelectionChange } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange({
        selectionKey: selectionKey,
        selectionCheckboxElement: checkbox,
        selectedRowsKeys: this._selectableRows.reduce<string[]>((acc, row) => {
          if (row.checkbox.checked) {
            acc.push(row.selectionKey);
          }
          return acc;
        }, []),
        selectableRowsStates: this._selectableRows.reduce(
          (
            acc: { selectionKey: string; isSelected: boolean | undefined }[],
            row
          ) => {
            acc.push({
              selectionKey: row.selectionKey,
              isSelected: row.checkbox.checked,
            });
            return acc;
          },
          []
        ),
      });
    }
  }

  @action
  onSelectionAllChange(): void {
    this._selectableRows.forEach((row) => {
      row.checkbox.checked = this._selectAllCheckbox?.checked ?? false;
      row.checkbox.dispatchEvent(new Event('toggle', { bubbles: false }));
    });
    this._isSelectAllCheckboxSelected =
      this._selectAllCheckbox?.checked ?? false;
    this.onSelectionChangeCallback(this._selectAllCheckbox, 'all');
  }

  @action
  onSelectionRowChange(
    checkbox?: HdsFormCheckboxBaseSignature['Element'],
    selectionKey?: string
  ): void {
    this.setSelectAllState();
    this.onSelectionChangeCallback(checkbox, selectionKey);
  }

  @action
  didInsertSelectAllCheckbox(
    checkbox: HdsFormCheckboxBaseSignature['Element']
  ): void {
    this._selectAllCheckbox = checkbox;
  }

  @action
  willDestroySelectAllCheckbox(): void {
    this._selectAllCheckbox = undefined;
  }

  @action
  didInsertRowCheckbox(
    checkbox: HdsFormCheckboxBaseSignature['Element'],
    selectionKey?: string
  ): void {
    if (selectionKey) {
      this._selectableRows.push({ selectionKey, checkbox });
    }
    this.setSelectAllState();
  }

  @action
  willDestroyRowCheckbox(selectionKey?: string): void {
    this._selectableRows = this._selectableRows.filter(
      (row) => row.selectionKey !== selectionKey
    );
    this.setSelectAllState();
  }

  @action
  setSelectAllState(): void {
    if (this._selectAllCheckbox) {
      const selectableRowsCount = this._selectableRows.length;
      const selectedRowsCount = this._selectableRows.filter(
        (row) => row.checkbox.checked
      ).length;

      this._selectAllCheckbox.checked =
        selectedRowsCount === selectableRowsCount;
      this._selectAllCheckbox.indeterminate =
        selectedRowsCount > 0 && selectedRowsCount < selectableRowsCount;
      this._isSelectAllCheckboxSelected = this._selectAllCheckbox.checked;
      this._selectAllCheckbox.dispatchEvent(
        new Event('toggle', { bubbles: false })
      );
    }
  }
}
