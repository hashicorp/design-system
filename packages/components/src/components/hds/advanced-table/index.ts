/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import type { ComponentLike } from '@glint/template';
import { guidFor } from '@ember/object/internals';

import {
  HdsAdvancedTableDensityValues,
  HdsAdvancedTableThSortOrderValues,
  HdsAdvancedTableVerticalAlignmentValues,
} from './types.ts';
import type {
  HdsAdvancedTableColumn,
  HdsAdvancedTableDensities,
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableOnSelectionChangeSignature,
  HdsAdvancedTableSelectableRow,
  HdsAdvancedTableSortingFunction,
  HdsAdvancedTableThSortOrder,
  HdsAdvancedTableVerticalAlignment,
  HdsAdvancedTableModel,
} from './types';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsAdvancedTableTdSignature } from './td.ts';
import type { HdsAdvancedTableThSignature } from './th.ts';
import type { HdsAdvancedTableTrSignature } from './tr.ts';

export const DENSITIES: HdsAdvancedTableDensities[] = Object.values(
  HdsAdvancedTableDensityValues
);
export const DEFAULT_DENSITY = HdsAdvancedTableDensityValues.Medium;

export const VALIGNMENTS: HdsAdvancedTableVerticalAlignment[] = Object.values(
  HdsAdvancedTableVerticalAlignmentValues
);
export const DEFAULT_VALIGN = HdsAdvancedTableVerticalAlignmentValues.Top;

export interface HdsAdvancedTableSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    caption?: string;
    columns: HdsAdvancedTableColumn[];
    density?: HdsAdvancedTableDensities;
    identityKey?: string;
    isSelectable?: boolean;
    isStriped?: boolean;
    model: HdsAdvancedTableModel;
    onSelectionChange?: (
      selection: HdsAdvancedTableOnSelectionChangeSignature
    ) => void;
    onSort?: (sortBy: string, sortOrder: HdsAdvancedTableThSortOrder) => void;
    selectionAriaLabelSuffix?: string;
    sortBy?: string;
    selectableColumnKey?: string;
    sortedMessageText?: string;
    sortOrder?: HdsAdvancedTableThSortOrder;
    valign?: HdsAdvancedTableVerticalAlignment;
    hasStickyHeader?: boolean;
  };
  Blocks: {
    body?: [
      {
        Td?: ComponentLike<HdsAdvancedTableTdSignature>;
        Tr?: ComponentLike<HdsAdvancedTableTrSignature>;
        Th?: ComponentLike<HdsAdvancedTableThSignature>;
        data?: Record<string, unknown>;
        rowIndex?: number;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTable extends Component<HdsAdvancedTableSignature> {
  @tracked private _sortBy = this.args.sortBy ?? undefined;
  @tracked private _sortOrder =
    this.args.sortOrder || HdsAdvancedTableThSortOrderValues.Asc;
  @tracked
  private _selectAllCheckbox?: HdsFormCheckboxBaseSignature['Element'] =
    undefined;
  @tracked private _isSelectAllCheckboxSelected?: boolean = undefined;

  private _selectableRows: HdsAdvancedTableSelectableRow[] = [];
  private _captionId = 'caption-' + guidFor(this);

  get getSortCriteria(): string | HdsAdvancedTableSortingFunction<unknown> {
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

  get columnWidths(): string[] | undefined {
    const { columns } = this.args;
    const widths: string[] = new Array(columns.length);
    let hasCustomColumnWidth = false;

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];

      if (column?.['width']) {
        widths[i] = column.width;
        if (!hasCustomColumnWidth) hasCustomColumnWidth = true;
      }
    }

    return hasCustomColumnWidth ? widths : undefined;
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

  get isSelectable(): boolean {
    const { isSelectable = false } = this.args;

    return isSelectable;
  }

  get isStriped(): boolean {
    const { isStriped = false } = this.args;

    return isStriped;
  }

  get density(): HdsAdvancedTableDensities {
    const { density = DEFAULT_DENSITY } = this.args;

    assert(
      `@density for "Hds::Table" must be one of the following: ${DENSITIES.join(
        ', '
      )}; received: ${density}`,
      DENSITIES.includes(density)
    );

    return density;
  }

  get valign(): HdsAdvancedTableVerticalAlignment {
    const { valign = DEFAULT_VALIGN } = this.args;

    assert(
      `@valign for "Hds::Table" must be one of the following: ${VALIGNMENTS.join(
        ', '
      )}; received: ${valign}`,
      VALIGNMENTS.includes(valign)
    );

    return valign;
  }

  get gridTemplateColumns(): string {
    if (!this.args.isSelectable && !this.columnWidths) {
      return `repeat(${this.args.columns.length}, 1fr)`;
    }

    let style = this.args.isSelectable ? 'auto' : '';

    if (this.columnWidths) {
      for (let i = 0; i < this.columnWidths.length; i++) {
        style = `${style} ${this.columnWidths[i] ? this.columnWidths[i] : '1fr'}`;
      }
    } else {
      for (let i = 0; i < this.args.columns.length; i++) {
        style = `${style} 1fr`;
      }
    }

    return style;
  }

  get classNames(): string {
    const classes = ['hds-advanced-table'];

    // add a class based on the @isStriped argument
    if (this.isStriped) {
      classes.push('hds-advanced-table--striped');
    }

    // add a class based on the @density argument
    if (this.density) {
      classes.push(`hds-advanced-table--density-${this.density}`);
    }

    // add a class based on the @valign argument
    if (this.valign) {
      classes.push(`hds-advanced-table--valign-${this.valign}`);
    }

    return classes.join(' ');
  }

  @action didInsert(element: HTMLDivElement): void {
    const stickyGridHeader = element.querySelector(
      '.hds-advanced-table__thead.hds-advanced-table__thead--sticky'
    );

    console.log(stickyGridHeader);

    if (stickyGridHeader !== null) {
      const observer = new IntersectionObserver(
        ([element]) =>
          element?.target.classList.toggle(
            'hds-advanced-table__thead--is-pinned',
            element.intersectionRatio < 1
          ),
        { threshold: [1] }
      );

      observer.observe(stickyGridHeader);
    }
  }

  @action
  setSortBy(column: string): void {
    if (this._sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this._sortOrder =
        this._sortOrder === HdsAdvancedTableThSortOrderValues.Asc
          ? HdsAdvancedTableThSortOrderValues.Desc
          : HdsAdvancedTableThSortOrderValues.Asc;
    } else {
      // otherwise, set the sort order to ascending
      this._sortBy = column;
      this._sortOrder = HdsAdvancedTableThSortOrderValues.Asc;
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
