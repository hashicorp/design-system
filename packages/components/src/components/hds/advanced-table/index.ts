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
import { modifier } from 'ember-modifier';
import { next } from '@ember/runloop';

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
  HdsAdvancedTableExpandState,
} from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base.ts';
import type { HdsAdvancedTableTdSignature } from './td.ts';
import type { HdsAdvancedTableThSignature } from './th.ts';
import type { HdsAdvancedTableTrSignature } from './tr.ts';
import { updateLastRowClass } from '../../../modifiers/hds-advanced-table-cell/dom-management.ts';

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
    childrenKey?: string;
  };
  Blocks: {
    body?: [
      {
        Td?: ComponentLike<HdsAdvancedTableTdSignature>;
        Tr?: ComponentLike<HdsAdvancedTableTrSignature>;
        Th?: ComponentLike<HdsAdvancedTableThSignature>;
        data?: Record<string, unknown>;
        rowIndex?: number | string;
        isOpen?: HdsAdvancedTableExpandState;
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
  @tracked _expandAllButton?: HTMLButtonElement = undefined;
  @tracked private _expandAllButtonState?: boolean | 'mixed' = undefined;
  @tracked private _expandButtons: HTMLButtonElement[] = [];

  private _selectableRows: HdsAdvancedTableSelectableRow[] = [];
  private _expandableRows: HTMLButtonElement[] = [];
  private _captionId = 'caption-' + guidFor(this);
  private _intersectionObserver: IntersectionObserver | undefined = undefined;
  private _element!: HTMLDivElement;

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

  get childrenKey(): string {
    const { childrenKey = 'children' } = this.args;

    return childrenKey;
  }

  get hasNestedRows(): boolean {
    const { model, columns } = this.args;
    let hasNestedRows = false;
    let isSortable = false;
    const sortableColumns: string[] = [];

    // if the model is not an array, assume there are no nested rows
    if (!Array.isArray(model)) return false;

    for (const column of columns) {
      if (column.isSortable) {
        isSortable = true;
        sortableColumns.push(column.label);
      }
    }

    for (const obj of model) {
      if (this.childrenKey in obj) {
        hasNestedRows = true;
        break;
      }
    }

    if (hasNestedRows) {
      assert(
        `Cannot have sortable columns if there are nested rows. Sortable columns are ${sortableColumns.toString()}`,
        !isSortable
      );
    }

    return hasNestedRows;
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

    if (this.hasNestedRows) {
      assert(
        '@isSelectable must not be true if there are nested rows.',
        !isSelectable
      );
      return isSelectable;
    }

    return isSelectable;
  }

  get isStriped(): boolean {
    const { isStriped = false } = this.args;

    if (this.hasNestedRows) {
      assert(
        '@isStriped must not be true if there are nested rows.',
        !isStriped
      );
      return isStriped;
    }

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

  // returns the grid-template-columns CSS attribute for the grid
  get gridTemplateColumns(): string {
    const { isSelectable, columns } = this.args;

    // if there is no custom column widths, each column is the same width and they take up the available space (except the select checkbox)
    if (!this.columnWidths) {
      return `${isSelectable ? 'auto ' : ''}repeat(${columns.length}, 1fr)`;
    }

    // if there is a select checkbox, the first column is 'auto' width to hug the checkbox content
    let style = isSelectable ? 'auto' : '';

    // check the custom column widths, if the current column has a custom width use the custom width. otherwise take the available space.
    for (let i = 0; i < this.columnWidths.length; i++) {
      style += ` ${this.columnWidths[i] ? this.columnWidths[i] : '1fr'}`;
    }

    return style;
  }

  get classNames(): string {
    const classes = ['hds-advanced-table'];

    if (this.isStriped) {
      classes.push('hds-advanced-table--striped');
    }

    if (this.density) {
      classes.push(`hds-advanced-table--density-${this.density}`);
    }

    if (this.valign) {
      classes.push(`hds-advanced-table--valign-${this.valign}`);
    }

    if (this.hasNestedRows) {
      classes.push(`hds-advanced-table--nested`);
    }

    return classes.join(' ');
  }

  private _setUpObservers = modifier((element: HTMLDivElement) => {
    const stickyGridHeader = element.querySelector(
      '.hds-advanced-table__thead.hds-advanced-table__thead--sticky'
    );

    this._element = element;
    this.setExpandAllState();

    if (stickyGridHeader !== null) {
      this._intersectionObserver = new IntersectionObserver(
        ([element]) =>
          element?.target.classList.toggle(
            'hds-advanced-table__thead--is-pinned',
            element.intersectionRatio < 1
          ),
        { threshold: [1] }
      );

      this._intersectionObserver.observe(stickyGridHeader);
    }

    updateLastRowClass(element);

    return () => {
      if (this._intersectionObserver) {
        this._intersectionObserver.disconnect();
      }
    };
  });

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

    if (typeof onSelectionChange !== 'function') return;

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

  @action
  onSelectionAllChange(): void {
    this._selectableRows.forEach((row) => {
      row.checkbox.checked = this._selectAllCheckbox?.checked ?? false;
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
    }
  }

  @action didInsertExpandAllButton(button: HTMLButtonElement): void {
    this._expandAllButton = button;
  }

  @action willDestroyExpandAllButton(): void {
    this._expandAllButton = undefined;
  }

  @action
  didInsertExpandButton(button: HTMLButtonElement): void {
    this._expandableRows.push(button);
    this.setExpandAllState();
  }

  @action
  willDestroyExpandButton(button: HTMLButtonElement): void {
    this._expandableRows.filter((btn) => button === btn);
    this.setExpandAllState();
  }

  @action
  registerExpandButton(button: HTMLButtonElement): void {
    this._expandButtons.push(button);
  }

  @action
  unregisterExpandButton(button: HTMLButtonElement): void {
    this._expandButtons = this._expandButtons.filter(
      (expandButton) => expandButton !== button
    );
  }

  @action
  setExpandAllState(): void {
    if (this._expandAllButton && this._element) {
      // eslint-disable-next-line ember/no-runloop
      next(() => {
        const parentRowsCount = this._expandableRows.length;
        const expandedRowsCount = this._expandableRows.filter(
          (button) => button.getAttribute('aria-expanded') === 'true'
        ).length;

        let expandAllState: HdsAdvancedTableExpandState;

        if (parentRowsCount === expandedRowsCount) expandAllState = true;
        else if (expandedRowsCount === 0) expandAllState = false;
        else expandAllState = 'mixed';

        this._expandAllButtonState = expandAllState;
        updateLastRowClass(this._element);
      });
    }
  }

  @action
  onExpandAllClick(): void {
    if (this._expandAllButton && this._element) {
      const newState = this._expandAllButtonState === true ? false : true;

      this._expandableRows.forEach((button) => {
        button.setAttribute('aria-expanded', `${newState}`);
        button.dispatchEvent(new Event('toggle', { bubbles: false }));
      });

      this._expandAllButtonState = newState;
      updateLastRowClass(this._element);
    }
  }
}
