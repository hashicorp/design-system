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
import HdsAdvancedTableTableModel from './models/table.ts';

import type Owner from '@ember/owner';
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
    hasStickyColumn?: boolean;
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

  private _selectableRows: HdsAdvancedTableSelectableRow[] = [];
  private _captionId = 'caption-' + guidFor(this);
  private _intersectionObserver: IntersectionObserver | undefined = undefined;
  private _tableModel!: HdsAdvancedTableTableModel;

  constructor(owner: Owner, args: HdsAdvancedTableSignature['Args']) {
    super(owner, args);

    const { model, childrenKey, columns } = args;

    this._tableModel = new HdsAdvancedTableTableModel({
      model,
      childrenKey,
    });

    if (this._tableModel.hasRowsWithChildren) {
      const sortableColumns = columns.filter((column) => column.isSortable);
      const sortableColumnLabels = sortableColumns.map(
        (column) => column.label
      );

      assert(
        `Cannot have sortable columns if there are nested rows. Sortable columns are ${sortableColumnLabels.toString()}`,
        sortableColumns.length === 0
      );
    }
  }
  // private _intersectionObserver: IntersectionObserver | undefined = undefined;
  private _scrollHandler!: (event: Event) => void;
  private _outerElement!: HTMLDivElement;
  private _gridElement!: HTMLDivElement;
  @tracked scrollIndicatorHeight= 0
  @tracked scrollIndicatorLeftOffset = 0;
  @tracked showScrollIndicatorLeft = false;
  @tracked initalScrollValueY = 0;
  @tracked initialScrollValueX  = 0;


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

  get hasScrollIndicator(): boolean {
    if (this.args.hasStickyColumn) {
      return true
    }

    return false;
  }

  // get scrollIndicatorHeight(): string | undefined {
  //   // console.log('hi')
  //   // console.log(this.args.hasStickyColumn)
  //   // console.log(this._element)
  //   if (this.args.hasStickyColumn && this._element) {

  //     console.log(this._element.parentElement)
  //     console.log(this._element.parentElement?.offsetHeight)
  //     return `${this._element.parentElement?.offsetHeight}px`
  //   }
  // }

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

    // if there is a select checkbox, the first column has a 'min-content' width to hug the checkbox content
    let style = isSelectable ? 'min-content ' : '';

    if (!this.columnWidths) {
      // if there are no custom column widths, each column is the same width and they take up the available space
      style += `repeat(${columns.length}, 1fr)`;
    } else {
      // check the custom column widths, if the current column has a custom width use the custom width. otherwise take the available space.
      for (let i = 0; i < this.columnWidths.length; i++) {
        style += ` ${this.columnWidths[i] ? this.columnWidths[i] : '1fr'}`;
      }
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

  private _setUpOuter = modifier((element: HTMLDivElement) => {
    this._outerElement = element;

    const scrollWrapper = element.querySelector('.hds-advanced-table__scroll-wrapper') as HTMLElement;

    const scrollbarHeight = scrollWrapper?.offsetHeight - scrollWrapper?.clientHeight;

    this.scrollIndicatorHeight =  element.clientHeight - scrollbarHeight;
  });

  private _setUpScrollWrapper = modifier((element: HTMLDivElement) => {
    this._scrollHandler = () => {
      const gridHeader = this._gridElement.querySelector(
        '.hds-advanced-table__thead'
      );

      // left scroll indicator
      if (this.args.hasStickyColumn) {
        if (element.scrollLeft > 0 && !this.showScrollIndicatorLeft) {
          gridHeader?.classList.add('hds-advanced-table__thead--column-is-pinned')
          this.showScrollIndicatorLeft = true
        } else if (element.scrollLeft === 0 && this.showScrollIndicatorLeft) {
          gridHeader?.classList.remove('hds-advanced-table__thead--column-is-pinned')
          this.showScrollIndicatorLeft = false;
        }
      }

      if (this.args.hasStickyHeader) {
        if (element.scrollTop > 0) {
          gridHeader?.classList.add('hds-advanced-table__thead--is-pinned')
        } else if (element.scrollTop === 0) {
          gridHeader?.classList.remove('hds-advanced-table__thead--is-pinned')
        }
      }


    }

    element.addEventListener('scroll', this._scrollHandler)

    return ()=> {
      element.removeEventListener('scroll', this._scrollHandler);
    }
  })


  private _setUpObservers = modifier((element: HTMLDivElement) => {
    this._gridElement = element;

    const gridHeader = element.querySelector(
      '.hds-advanced-table__thead'
    );

    const stickyColumnHeaders = gridHeader?.querySelectorAll('.hds-advanced-table__th--is-sticky-column')

    let newLeftOffset = 0;

    stickyColumnHeaders?.forEach((elem) => {
      newLeftOffset += elem.clientWidth
    })

    this.scrollIndicatorLeftOffset = newLeftOffset + 1;

    // if ((this.args.hasStickyHeader || this.args.hasStickyColumn) && gridHeader) {
    //   this._intersectionObserver = new IntersectionObserver(
    //     ([element]) => {
    //       console.log('hello')
    //       element?.target.classList.toggle(
    //         'hds-advanced-table__thead--is-pinned',
    //         element.intersectionRatio < 1
    //       )},
    //     { threshold: [1] }
    //   );

    //   // this._intersectionObserver.observe(gridHeader);
    // }

    return () => {
      // if (this._intersectionObserver) {
      //   this._intersectionObserver.disconnect();
      // }

      this.scrollIndicatorLeftOffset = 0;
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
}
