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
import type Owner from '@ember/owner';

import HdsAdvancedTableTableModel from './models/table.ts';

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

export const DENSITIES: HdsAdvancedTableDensities[] = Object.values(
  HdsAdvancedTableDensityValues
);
export const DEFAULT_DENSITY = HdsAdvancedTableDensityValues.Medium;

export const VALIGNMENTS: HdsAdvancedTableVerticalAlignment[] = Object.values(
  HdsAdvancedTableVerticalAlignmentValues
);
export const DEFAULT_VALIGN = HdsAdvancedTableVerticalAlignmentValues.Top;

const DEFAULT_SCROLL_DIMENSIONS = {
  bottom: '0px',
  height: '0px',
  left: '0px',
  right: '0px',
  top: '0px',
  width: '0px',
};

const getScrollIndicatorDimensions = (
  scrollWrapper: HTMLDivElement,
  theadElement: HTMLDivElement,
  hasStickyHeader: boolean,
  hasStickyFirstColumn: boolean
) => {
  const horizontalScrollBarHeight =
    scrollWrapper.offsetHeight - scrollWrapper.clientHeight;
  const verticalScrollBarWidth =
    scrollWrapper.offsetWidth - scrollWrapper.clientWidth;

  let leftOffset = 0;

  if (hasStickyFirstColumn) {
    const stickyColumnHeaders = theadElement.querySelectorAll(
      '.hds-advanced-table__th--is-sticky-column'
    );

    stickyColumnHeaders?.forEach((el) => {
      // querySelectorAll returns Elements, which don't have offsetWidth
      // need to use offsetWidth to account for the cell borders
      const elAsHTMLElement = el as HTMLElement;
      leftOffset += elAsHTMLElement.offsetWidth;
    });

    // offsets the left: -1px position if there are multiple sticky columns
    if (stickyColumnHeaders.length > 1) {
      leftOffset -= 1;
    }
  }

  return {
    bottom: `${horizontalScrollBarHeight}px`,
    height: `${scrollWrapper.offsetHeight - horizontalScrollBarHeight}px`,
    left: `${leftOffset}px`,
    right: `${verticalScrollBarWidth}px`,
    top: hasStickyHeader ? `${theadElement.offsetHeight}px` : '0px',
    width: `${scrollWrapper.offsetWidth - verticalScrollBarWidth}px`,
  };
};

const getStickyColumnLeftOffset = (
  theadElement: HTMLDivElement,
  hasRowSelection: boolean
) => {
  // if there is no select checkbox column, the sticky column is all the way to the left
  if (!hasRowSelection) return '0px';

  const selectableCell = theadElement.querySelector(
    '.hds-advanced-table__th--is-selectable'
  ) as HTMLElement;

  return `${selectableCell?.offsetWidth}px`;
};

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
    hasStickyFirstColumn?: boolean;
    childrenKey?: string;
    maxHeight?: string;
    onColumnResize?: (columnKey: string, newWidth: string) => void;
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
  @tracked private _tableHeight = 0;
  private _selectableRows: HdsAdvancedTableSelectableRow[] = [];
  private _captionId = 'caption-' + guidFor(this);
  private _tableModel!: HdsAdvancedTableTableModel;
  private _scrollHandler!: (event: Event) => void;
  private _resizeObserver!: ResizeObserver;
  private _theadElement!: HTMLDivElement;

  @tracked scrollIndicatorDimensions = DEFAULT_SCROLL_DIMENSIONS;
  @tracked isStickyColumnPinned = false;
  @tracked isStickyHeaderPinned = false;
  @tracked showScrollIndicatorLeft = false;
  @tracked showScrollIndicatorRight = false;
  @tracked showScrollIndicatorTop = false;
  @tracked showScrollIndicatorBottom = false;
  @tracked stickyColumnOffset = '0px';

  constructor(owner: Owner, args: HdsAdvancedTableSignature['Args']) {
    super(owner, args);

    const {
      model,
      childrenKey,
      columns,
      hasStickyFirstColumn,
      onColumnResize,
    } = args;

    this._tableModel = new HdsAdvancedTableTableModel({
      model,
      childrenKey,
      columns,
      onColumnResize,
    });

    if (this._tableModel.hasResizableColumns) {
      assert(
        'Cannot have a sticky first column if there are resizable columns.',
        !hasStickyFirstColumn
      );
    }

    if (this._tableModel.hasRowsWithChildren) {
      const sortableColumns = columns.filter((column) => column.isSortable);
      const sortableColumnLabels = sortableColumns.map(
        (column) => column.label
      );

      assert(
        `Cannot have sortable columns if there are nested rows. Sortable columns are ${sortableColumnLabels.toString()}`,
        sortableColumns.length === 0
      );

      assert(
        'Cannot have a sticky first column if there are nested rows.',
        !hasStickyFirstColumn
      );
    }
  }

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

  get hasScrollIndicator(): boolean {
    if (this.args.hasStickyFirstColumn) {
      return true;
    }

    return false;
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

    if (this._tableModel.hasRowsWithChildren) {
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

    if (this._tableModel.hasRowsWithChildren) {
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

  get hasStickyHeader(): boolean {
    if (this.args.maxHeight && this.args.hasStickyHeader !== false) {
      return true;
    } else if (this.args.hasStickyHeader && !this.args.maxHeight) {
      assert('Must set @maxHeight to use @hasStickyHeader.', false);
    }

    return false;
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
    const { isSelectable } = this.args;
    const { columns } = this._tableModel;

    const DEFAULT_COLUMN_WIDTH = '1fr';

    // if there is a select checkbox, the first column has a 'min-content' width to hug the checkbox content
    let style = isSelectable ? 'min-content ' : '';

    const hasCustomColumnWidths = columns.some(
      (column) => column.width !== undefined
    );

    if (hasCustomColumnWidths) {
      // check the custom column widths, if the current column has a custom width use the custom width. otherwise take the available space.
      for (let i = 0; i < columns.length; i++) {
        style += ` ${columns[i]!.width ?? DEFAULT_COLUMN_WIDTH}`;
      }
    } else {
      // if there are no custom column widths, each column is the same width and they take up the available space
      style += `repeat(${columns.length}, ${DEFAULT_COLUMN_WIDTH})`;
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

    if (this._tableModel.hasRowsWithChildren) {
      classes.push(`hds-advanced-table--nested`);
    }

    return classes.join(' ');
  }

  get theadClassNames(): string {
    const classes = ['hds-advanced-table__thead'];

    if (this.hasStickyHeader) {
      classes.push('hds-advanced-table__thead--sticky');
    }

    if (this.isStickyHeaderPinned) {
      classes.push('hds-advanced-table__thead--is-pinned');
    }

    return classes.join(' ');
  }

  private _didUpdateModel = modifier(() => {
    this._tableModel.updateModel(this.args.model);
  });

  private _setUpScrollWrapper = modifier((element: HTMLDivElement) => {
    this._scrollHandler = () => {
      // 6px as a buffer so the shadow doesn't appear over the border radius on the edge of the table
      const SCROLL_BUFFER = 6;

      // left scroll indicator and sticky column styles
      if (element.scrollLeft > SCROLL_BUFFER && !this.showScrollIndicatorLeft) {
        if (this.args.hasStickyFirstColumn) {
          this.isStickyColumnPinned = true;
        }
        this.showScrollIndicatorLeft = true;
      } else if (element.scrollLeft === 0 && this.showScrollIndicatorLeft) {
        this.isStickyColumnPinned = false;
        this.showScrollIndicatorLeft = false;
      }

      // the right edge is how far the user can scroll, which is the full width of the table - the visible section of the table (also subtract the buffer)
      const rightEdge =
        element.scrollWidth - element.clientWidth - SCROLL_BUFFER;

      // right scroll indicator
      if (element.scrollLeft < rightEdge) {
        this.showScrollIndicatorRight = true;
      } else {
        this.showScrollIndicatorRight = false;
      }

      // sticky header
      if (element.scrollTop > 0) {
        if (this.hasStickyHeader) {
          this.isStickyHeaderPinned = true;
        }
        this.showScrollIndicatorTop = true;
      } else {
        if (this.hasStickyHeader) {
          this.isStickyHeaderPinned = false;
        }
        this.showScrollIndicatorTop = false;
      }

      // the bottom edge is how far the user can scroll, which is the full height of the table - the visible section of the table (also subtract the buffer)
      const bottomEdge =
        element.scrollHeight - element.clientHeight - SCROLL_BUFFER;

      // bottom scroll indicator
      if (element.scrollTop < bottomEdge) {
        this.showScrollIndicatorBottom = true;
      } else {
        this.showScrollIndicatorBottom = false;
      }
    };

    element.addEventListener('scroll', this._scrollHandler);

    const updateMeasurements = () => {
      this._tableHeight = element.clientHeight;

      this.scrollIndicatorDimensions = getScrollIndicatorDimensions(
        element,
        this._theadElement,
        this.hasStickyHeader,
        hasStickyFirstColumn
      );

      if (hasStickyFirstColumn) {
        this.stickyColumnOffset = getStickyColumnLeftOffset(
          this._theadElement,
          isSelectable
        );
      }
    };

    const { hasStickyFirstColumn = false, isSelectable = false } = this.args;

    this._resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        updateMeasurements();
      });
    });

    this._resizeObserver.observe(element);

    updateMeasurements();

    // on render check if should show right scroll indicator
    if (element.clientWidth < element.scrollWidth) {
      this.showScrollIndicatorRight = true;
    }

    // on render check if should show bottom scroll indicator
    if (element.clientHeight < element.scrollHeight) {
      this.showScrollIndicatorBottom = true;
    }

    return () => {
      element.removeEventListener('scroll', this._scrollHandler);
      this._resizeObserver.disconnect();
    };
  });

  private _setUpThead = modifier((element: HTMLDivElement) => {
    this._theadElement = element;
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
}
