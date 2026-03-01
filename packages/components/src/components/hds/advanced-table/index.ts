/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { cached, tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';
import { modifier } from 'ember-modifier';
import { TrackedSet } from 'tracked-built-ins';
import { HdsAdvancedTableThSortOrderValues } from './types.ts';

import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';
import type { ComponentLike } from '@glint/template';
import {
  HdsAdvancedTableDensityValues,
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
  HdsAdvancedTableColumnReorderCallback,
} from './types.ts';

import type { HdsFilterBarSignature } from '../filter-bar/index.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base.gts';
import type HdsAdvancedTableTd from './td.ts';
import type HdsAdvancedTableTh from './th.ts';
import type HdsAdvancedTableTr from './tr.ts';
import type HdsIntlService from '../../../services/hds-intl.ts';

export const DENSITIES: HdsAdvancedTableDensities[] = Object.values(
  HdsAdvancedTableDensityValues
);
export const DEFAULT_DENSITY = HdsAdvancedTableDensityValues.Medium;

export const VALIGNMENTS: HdsAdvancedTableVerticalAlignment[] = Object.values(
  HdsAdvancedTableVerticalAlignmentValues
);
export const DEFAULT_VALIGN = HdsAdvancedTableVerticalAlignmentValues.Top;

export const BORDER_WIDTH = 1;

const DEFAULT_SCROLL_DIMENSIONS = {
  bottom: '0px',
  height: '0px',
  left: '0px',
  right: '0px',
  width: '0px',
};

const getScrollIndicatorDimensions = (
  scrollWrapper: HTMLDivElement,
  theadElement: HTMLDivElement,
  hasStickyFirstColumn: boolean,
  isStickyColumnPinned: boolean
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

    // offsets the left: -1px position if there are multiple sticky columns or the first column has a fixed pixel width
    if (stickyColumnHeaders.length > 1) {
      leftOffset -= 1;
    }

    // offsets the left: -1px position if the sticky column is already pinned when the scroll indicator is calculated
    if (isStickyColumnPinned) {
      leftOffset -= 1;
    }
  }

  return {
    bottom: `${horizontalScrollBarHeight}px`,
    height: `${scrollWrapper.offsetHeight - horizontalScrollBarHeight}px`,
    left: `${leftOffset}px`,
    right: `${verticalScrollBarWidth}px`,
    width: `${scrollWrapper.offsetWidth - verticalScrollBarWidth}px`,
  };
};

const getStickyColumnLeftOffset = (
  theadElement: HTMLDivElement,
  hasRowSelection: boolean,
  isStickyColumnPinned: boolean
) => {
  // if there is no select checkbox column, the sticky column is all the way to the left
  if (!hasRowSelection) return '0px';

  const selectableCell = theadElement.querySelector(
    '.hds-advanced-table__th--is-selectable'
  ) as HTMLElement;

  let leftOffset = selectableCell?.offsetWidth ?? 0;

  // if the sticky column is pinned when the offset is calculated, we need to account for the increased width of the border
  if (isStickyColumnPinned && leftOffset > 0) {
    leftOffset -= 2;
  }

  return `${leftOffset}px`;
};

export interface HdsAdvancedTableSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    caption?: string;
    columns: HdsAdvancedTableColumn[];
    columnOrder?: string[];
    density?: HdsAdvancedTableDensities;
    identityKey?: string;
    isSelectable?: boolean;
    isStriped?: boolean;
    model: HdsAdvancedTableModel;
    reorderedMessageText?: string;
    selectionAriaLabelSuffix?: string;
    sortBy?: string;
    selectableColumnKey?: string;
    sortedMessageText?: string;
    sortOrder?: HdsAdvancedTableThSortOrder;
    valign?: HdsAdvancedTableVerticalAlignment;
    hasReorderableColumns?: boolean;
    hasResizableColumns?: boolean;
    hasStickyHeader?: boolean;
    hasStickyFirstColumn?: boolean;
    childrenKey?: string;
    maxHeight?: string;
    onColumnReorder?: HdsAdvancedTableColumnReorderCallback;
    onColumnResize?: (columnKey: string, newWidth?: string) => void;
    onSelectionChange?: (
      selection: HdsAdvancedTableOnSelectionChangeSignature
    ) => void;
    onSort?: (sortBy: string, sortOrder: HdsAdvancedTableThSortOrder) => void;
  };
  Blocks: {
    actions?: [
      {
        FilterBar?: ComponentLike<HdsFilterBarSignature>;
      },
    ];
    body?: [
      {
        Td?: WithBoundArgs<typeof HdsAdvancedTableTd, 'align'>;
        Tr?: WithBoundArgs<
          typeof HdsAdvancedTableTr,
          | 'selectionScope'
          | 'isLastRow'
          | 'isSelectable'
          | 'onSelectionChange'
          | 'didInsert'
          | 'willDestroy'
          | 'selectionAriaLabelSuffix'
          | 'hasStickyColumn'
          | 'isStickyColumnPinned'
          | 'isParentRow'
          | 'depth'
          | 'displayRow'
        >;
        Th?: WithBoundArgs<
          typeof HdsAdvancedTableTh,
          | 'depth'
          | 'isExpandable'
          | 'isExpanded'
          | 'newLabel'
          | 'parentId'
          | 'scope'
          | 'isStickyColumnPinned'
          | 'onClickToggle'
        >;
        data?: Record<string, unknown>;
        rowIndex?: number | string;
        isOpen?: HdsAdvancedTableExpandState;
      },
    ];
    emptyState?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTable extends Component<HdsAdvancedTableSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  @tracked
  private _selectAllCheckbox?: HdsFormCheckboxBaseSignature['Element'] =
    undefined;
  @tracked private _isSelectAllCheckboxSelected?: boolean = undefined;
  @tracked private _tableHeight = 0;
  private _selectableRows: HdsAdvancedTableSelectableRow[] = [];
  private _captionId = 'caption-' + guidFor(this);
  private _scrollHandler!: (event: Event) => void;
  private _resizeObserver!: ResizeObserver;
  private _theadElement!: HTMLDivElement;
  private _scrollWrapperElement!: HTMLDivElement;

  @tracked scrollIndicatorDimensions = DEFAULT_SCROLL_DIMENSIONS;
  @tracked isStickyColumnPinned = false;
  @tracked isStickyHeaderPinned = false;
  @tracked hasPinnedFirstColumn: boolean | undefined = undefined;
  @tracked reorderedMessageText = '';
  @tracked showScrollIndicatorLeft = false;
  @tracked showScrollIndicatorRight = false;
  @tracked showScrollIndicatorTop = false;
  @tracked showScrollIndicatorBottom = false;
  @tracked stickyColumnOffset = '0px';

  // sorting properties
  @tracked sortBy?: string;
  @tracked sortOrder?: HdsAdvancedTableThSortOrder;

  // row expansion properties
  expandedRowIds = new TrackedSet<string>();

  constructor(owner: Owner, args: HdsAdvancedTableSignature['Args']) {
    super(owner, args);

    const { hasStickyFirstColumn, model, sortBy, sortOrder } = args;

    this.sortBy = sortBy;
    this.sortOrder = sortOrder ?? HdsAdvancedTableThSortOrderValues.Asc;

    this._runAssertions();

    this._initializeExpandedRows(model);

    if (hasStickyFirstColumn) {
      this.hasPinnedFirstColumn = true;
    }
  }

  get childrenKey(): string {
    return this.args.childrenKey ?? 'children';
  }

  get hasRowsWithChildren(): boolean {
    const { model } = this.args;

    return model.some((record) => {
      const children = record[this.childrenKey] as
        | Record<string, unknown>[]
        | undefined;

      return Array.isArray(children) && children.length > 0;
    });
  }

  @cached
  get expandableRowIds(): string[] {
    const { model } = this.args;

    const ids: string[] = [];

    const collect = (items: Record<string, unknown>[]) => {
      items.forEach((item) => {
        const children = item[this.childrenKey] as
          | Record<string, unknown>
          | undefined;

        if (Array.isArray(children) && children.length > 0) {
          ids.push(guidFor(item));

          collect(children);
        }
      });
    };

    collect(model);

    return ids;
  }

  get isAllExpanded(): boolean {
    if (this.expandableRowIds.length === 0) {
      return false;
    }

    return this.expandableRowIds.every((id) => this.expandedRowIds.has(id));
  }

  get sortCriteria(): string | HdsAdvancedTableSortingFunction<unknown> {
    const { columns } = this.args;

    const currentColumn = columns.find((column) => column.key === this.sortBy);

    if (
      currentColumn?.sortingFunction &&
      typeof currentColumn.sortingFunction === 'function'
    ) {
      return currentColumn.sortingFunction;
    } else {
      return `${this.sortBy}:${this.sortOrder}`;
    }
  }

  get isEmpty(): boolean {
    const { model } = this.args;

    return model.length === 0;
  }

  get identityKey(): string | undefined {
    // we have to provide a way for the consumer to pass undefined because Ember tries to interpret undefined as missing an arg and therefore falls back to the default
    if (this.args.identityKey === 'none') {
      return undefined;
    } else {
      return this.args.identityKey ?? '@identity';
    }
  }

  get hasStickyFirstColumn(): boolean | undefined {
    // The user-controlled `hasPinnedFirstColumn` variable takes precedence over the model's `hasStickyFirstColumn` property.
    if (this.hasPinnedFirstColumn !== undefined) {
      return this.hasPinnedFirstColumn;
    } else if (this.args.hasStickyFirstColumn === false) {
      return this.args.hasStickyFirstColumn;
    }

    return undefined;
  }

  get sortedMessageText(): string {
    const { sortedMessageText } = this.args;

    if (sortedMessageText !== undefined) {
      return sortedMessageText;
    } else if (this.sortBy !== undefined && this.sortOrder !== undefined) {
      // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
      return `Sorted by ${this.sortBy} ${this.sortOrder}ending`;
    } else {
      return '';
    }
  }

  get isSelectable(): boolean {
    const { isSelectable = false } = this.args;

    if (this.hasRowsWithChildren) {
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

    if (this.hasRowsWithChildren) {
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

    if (this.hasRowsWithChildren) {
      classes.push(`hds-advanced-table--nested`);
    }

    return classes.join(' ');
  }

  get theadClassNames(): string {
    const { hasResizableColumns } = this.args;

    const classes = ['hds-advanced-table__thead'];

    if (this.hasStickyHeader) {
      classes.push('hds-advanced-table__thead--sticky');
    }

    if (this.isStickyHeaderPinned) {
      classes.push('hds-advanced-table__thead--is-pinned');
    }

    if (hasResizableColumns) {
      classes.push('hds-advanced-table__thead--has-resizable-columns');
    }

    return classes.join(' ');
  }

  private _initializeExpandedRows(
    model: HdsAdvancedTableSignature['Args']['model']
  ) {
    const traverse = (items: Record<string, unknown>[]) => {
      items.forEach((item) => {
        if (item['isOpen'] === true) {
          this.expandedRowIds.add(guidFor(item));
        }

        const children = item[this.childrenKey] as
          | Record<string, unknown>[]
          | undefined;

        if (Array.isArray(children) && children.length > 0) {
          traverse(children);
        }
      });
    };

    traverse(model);
  }

  private _setUpScrollWrapper = modifier((element: HTMLDivElement) => {
    this._scrollWrapperElement = element;

    const updateHorizontalScrollIndicators = () => {
      this.showScrollIndicatorRight = element.clientWidth < element.scrollWidth;
    };

    this._scrollHandler = () => {
      this._updateScrollIndicators(element);
    };

    element.addEventListener('scroll', this._scrollHandler);

    const updateMeasurements = () => {
      const { isSelectable = false } = this.args;

      const newTableHeight = element.offsetHeight;
      const newDimensions = getScrollIndicatorDimensions(
        element,
        this._theadElement,
        this.hasStickyFirstColumn ? true : false,
        this.isStickyColumnPinned
      );

      const setUpdatedMeasurements = () => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }

        const isSameLeft =
          this.scrollIndicatorDimensions.left === newDimensions.left;
        const isSameRight =
          this.scrollIndicatorDimensions.right === newDimensions.right;

        if (isSameLeft && isSameRight && this._tableHeight === newTableHeight) {
          return;
        }

        this._tableHeight = newTableHeight;
        this.scrollIndicatorDimensions = newDimensions;

        if (this.hasStickyFirstColumn) {
          this.stickyColumnOffset = getStickyColumnLeftOffset(
            this._theadElement,
            isSelectable,
            this.isStickyColumnPinned
          );
        }
      };

      window.requestAnimationFrame(setUpdatedMeasurements);
    };

    this._resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        updateMeasurements();
        updateHorizontalScrollIndicators();
      });
    });

    this._resizeObserver.observe(element);

    updateMeasurements();

    // on render check if should show right scroll indicator
    updateHorizontalScrollIndicators();

    // on render check if should show bottom scroll indicator
    if (element.clientHeight < element.scrollHeight) {
      this.showScrollIndicatorBottom = true;
    }

    return () => {
      element.removeEventListener('scroll', this._scrollHandler);
      this._resizeObserver.disconnect();
    };
  });

  private _runAssertions() {
    const {
      columns,
      hasReorderableColumns,
      hasResizableColumns,
      hasStickyFirstColumn,
    } = this.args;

    if (this.hasRowsWithChildren) {
      const sortableColumns = columns.filter((column) => column.isSortable);
      const sortableColumnLabels = sortableColumns.map(
        (column) => column.label
      );

      assert(
        'Cannot have reorderable columns if there are nested rows.',
        !hasReorderableColumns
      );

      assert(
        `Cannot have sortable columns if there are nested rows. Sortable columns are ${sortableColumnLabels.toString()}`,
        sortableColumns.length === 0
      );

      assert(
        'Cannot have a sticky first column if there are nested rows.',
        hasStickyFirstColumn === undefined
      );

      assert(
        `Cannot have resizable columns if there are nested rows.`,
        !hasResizableColumns
      );
    }

    if (hasReorderableColumns) {
      assert(
        'Cannot have both reorderable columns and a sticky first column.',
        hasStickyFirstColumn === undefined
      );
    }
  }

  private _setUpThead = modifier((element: HTMLDivElement) => {
    this._theadElement = element;
  });

  private _onColumnReorder: HdsAdvancedTableColumnReorderCallback = ({
    column,
    newOrder,
    insertedAt,
  }) => {
    // Guard against accessing hdsIntl service after component destruction
    if (this.isDestroying || this.isDestroyed) return;

    const { reorderedMessageText } = this.args;

    if (reorderedMessageText !== undefined) {
      this.reorderedMessageText = reorderedMessageText;
    } else {
      const newPosition = insertedAt + 1;
      const translatedReorderedMessageText = this.hdsIntl.t(
        'hds.advanced-table.reordered-message',
        {
          default: `Moved ${column.label} column to position ${newPosition}`,
          columnLabel: column.label,
          newPosition,
        }
      );

      this.reorderedMessageText = translatedReorderedMessageText;
    }

    this.args.onColumnReorder?.({
      column,
      newOrder,
      insertedAt,
    });
  };

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
  toggleExpandAll() {
    const allIds = this.expandableRowIds;
    const isAllExpanded = allIds.every((id) => this.expandedRowIds.has(id));

    if (isAllExpanded) {
      this.expandedRowIds.clear();
    } else {
      // Add all IDs efficiently
      allIds.forEach((id) => this.expandedRowIds.add(id));
    }
  }

  @action
  toggleRow(rowId: string) {
    if (this.expandedRowIds.has(rowId)) {
      this.expandedRowIds.delete(rowId);
    } else {
      this.expandedRowIds.add(rowId);
    }
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
    if (selectionKey === undefined) {
      return;
    }

    const index = this._selectableRows.findIndex(
      (row) => row.selectionKey === selectionKey
    );

    if (index === -1) {
      return;
    }

    this._selectableRows.splice(index, 1);

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

  @action
  setSortBy(columnKey: HdsAdvancedTableColumn['key']): void {
    const { onSort } = this.args;

    if (columnKey === undefined) {
      return;
    }

    if (this.sortBy === columnKey) {
      // check to see if the column is already sorted and invert the sort order if so
      this.sortOrder =
        this.sortOrder === HdsAdvancedTableThSortOrderValues.Asc
          ? HdsAdvancedTableThSortOrderValues.Desc
          : HdsAdvancedTableThSortOrderValues.Asc;
    } else {
      // otherwise, set the sort order to ascending
      this.sortBy = columnKey;
      this.sortOrder = HdsAdvancedTableThSortOrderValues.Asc;
    }

    if (typeof onSort === 'function') {
      onSort(this.sortBy, this.sortOrder);
    }
  }

  private _updateScrollIndicators(element: HTMLElement): void {
    // 6px as a buffer so the shadow doesn't appear over the border radius on the edge of the table
    const SCROLL_BUFFER = 6;

    // left scroll indicator and sticky column styles
    if (element.scrollLeft > SCROLL_BUFFER) {
      if (this.hasStickyFirstColumn) {
        this.isStickyColumnPinned = true;
      }
      if (!this.showScrollIndicatorLeft) {
        this.showScrollIndicatorLeft = true;
      }
    } else if (element.scrollLeft === 0 && this.showScrollIndicatorLeft) {
      this.isStickyColumnPinned = false;
      this.showScrollIndicatorLeft = false;
    }

    // the right edge is how far the user can scroll, which is the full width of the table - the visible section of the table (also subtract the buffer)
    const rightEdge = element.scrollWidth - element.clientWidth - SCROLL_BUFFER;

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
  }

  private _onPinFirstColumn = (): void => {
    this.hasPinnedFirstColumn = this.hasPinnedFirstColumn ? false : true;
    // we need to retrigger the scroll indicator updates if the pinned state is changed when the table is already scrolled
    this._updateScrollIndicators(this._scrollWrapperElement);
  };
}
