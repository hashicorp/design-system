/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { service } from '@ember/service';
import { modifier } from 'ember-modifier';
import { isDestroyed, isDestroying } from '@ember/destroyable';
import HdsAdvancedTableTableModel from './models/table.ts';

import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';
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
  HdsAdvancedTableThSortOrder,
  HdsAdvancedTableVerticalAlignment,
  HdsAdvancedTableModel,
  HdsAdvancedTableExpandState,
  HdsAdvancedTableColumnReorderCallback,
} from './types.ts';
import type HdsAdvancedTableColumnType from './models/column.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base.ts';
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
  hasFirstColumnPxWidth: boolean,
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
    if (stickyColumnHeaders.length > 1 || hasFirstColumnPxWidth) {
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
          | 'isStickyColumn'
          | 'isStickyColumnPinned'
          | 'onClickToggle'
        >;
        data?: Record<string, unknown>;
        rowIndex?: number | string;
        isOpen?: HdsAdvancedTableExpandState;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTable extends Component<HdsAdvancedTableSignature> {
  @service hdsIntl!: HdsIntlService;

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

  constructor(owner: Owner, args: HdsAdvancedTableSignature['Args']) {
    super(owner, args);

    const {
      model,
      columns,
      columnOrder,
      childrenKey,
      hasReorderableColumns,
      hasResizableColumns,
      sortBy,
      sortOrder,
      hasStickyFirstColumn,
      onSort,
    } = args;

    this._tableModel = new HdsAdvancedTableTableModel({
      model,
      columns,
      columnOrder,
      childrenKey,
      hasReorderableColumns,
      hasResizableColumns,
      sortBy,
      sortOrder,
      onColumnReorder: this._onColumnReorder.bind(this),
      onSort,
    });

    this._runAssertions();

    if (hasStickyFirstColumn) {
      this.hasPinnedFirstColumn = true;
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

  get hasStickyFirstColumn(): boolean | undefined {
    // The user-controlled `hasPinnedFirstColumn` variable takes precedence over the model's `hasStickyFirstColumn` property.
    if (this.hasPinnedFirstColumn !== undefined) {
      return this.hasPinnedFirstColumn;
    } else if (this.args.hasStickyFirstColumn === false) {
      return this.args.hasStickyFirstColumn;
    }

    return undefined;
  }

  get hasScrollIndicator(): boolean {
    if (this.hasStickyFirstColumn) {
      return true;
    }

    return false;
  }

  get sortedMessageText(): string {
    const { sortedMessageText } = this.args;
    const { sortBy, sortOrder } = this._tableModel;

    if (sortedMessageText !== undefined) {
      return sortedMessageText;
    } else if (sortBy !== undefined && sortOrder !== undefined) {
      // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
      return `Sorted by ${sortBy} ${sortOrder}ending`;
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
    const { orderedColumns } = this._tableModel;

    // if there is a select checkbox, the first column has a 'min-content' width to hug the checkbox content
    let style = isSelectable ? 'min-content ' : '';

    for (let i = 0; i < orderedColumns.length; i++) {
      style += ` ${orderedColumns[i]!.appliedWidth}`;
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

    if (this._tableModel.hasResizableColumns) {
      classes.push('hds-advanced-table__thead--has-resizable-columns');
    }

    return classes.join(' ');
  }

  private _registerGridElement = modifier((element: HTMLDivElement) => {
    this._tableModel.gridElement = element;
  });

  private _registerThElement = modifier(
    (element: HTMLDivElement, [column]: [HdsAdvancedTableColumnType]) => {
      if (column === undefined) {
        return;
      }

      column.thElement = element;
    }
  );

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
      this._tableHeight = element.offsetHeight;

      const hasFirstColumnPxWidth =
        this._tableModel.columns[0]?.pxWidth !== undefined;

      this.scrollIndicatorDimensions = getScrollIndicatorDimensions(
        element,
        this._theadElement,
        this.hasStickyFirstColumn ? true : false,
        hasFirstColumnPxWidth,
        this.isStickyColumnPinned
      );

      if (this.hasStickyFirstColumn) {
        this.stickyColumnOffset = getStickyColumnLeftOffset(
          this._theadElement,
          isSelectable,
          this.isStickyColumnPinned
        );
      }
    };

    const { isSelectable = false } = this.args;

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

    if (this._tableModel.hasRowsWithChildren) {
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
    const { reorderedMessageText } = this.args;

    if (reorderedMessageText !== undefined) {
      this.reorderedMessageText = reorderedMessageText;
    } else if (!isDestroyed(this) && !isDestroying(this)) {
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
  setupTableModelData(): void {
    const { columns, model, sortBy, sortOrder } = this.args;

    this._tableModel.setupData({
      columns,
      model,
      sortBy,
      sortOrder,
    });
  }

  @action
  updateTableModelColumnOrder(): void {
    if (this.args.columnOrder === undefined) {
      return;
    }

    this._tableModel.columnOrder = this.args.columnOrder;
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

  private _isStickyColumn = (
    column: HdsAdvancedTableColumnType
  ): boolean | undefined => {
    if (column.isFirst && this.hasStickyFirstColumn !== undefined) {
      return this.hasStickyFirstColumn;
    }
    return undefined;
  };
}
