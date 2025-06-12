import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type HdsAdvancedTableModel from './table.ts';
import type {
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableColumnResizeCallback,
  HdsAdvancedTableColumn as HdsAdvancedTableColumnType,
} from '../types';

const DEFAULT_MIN_WIDTH = '150px';
const DEFAULT_MAX_WIDTH = '800px';

function isPxSize(value?: string): boolean {
  if (value === undefined) {
    return false;
  }

  return /^-?\d+(\.\d+)?px$/.test(value);
}

function pxToNumber(pxString: string): number {
  return parseFloat(pxString.slice(0, -2));
}

export default class HdsAdvancedTableColumn {
  @tracked label: string = '';
  @tracked align?: HdsAdvancedTableHorizontalAlignment = 'left';
  @tracked isExpandable?: boolean = false;
  @tracked isReorderable?: boolean = false;
  @tracked isSortable?: boolean = false;
  @tracked isVisuallyHidden?: boolean = false;
  @tracked key?: string = undefined;
  @tracked minWidth?: `${number}px` = DEFAULT_MIN_WIDTH;
  @tracked maxWidth?: `${number}px` = DEFAULT_MAX_WIDTH;
  @tracked tooltip?: string = undefined;
  @tracked width?: string = undefined;
  @tracked originalWidth?: string = undefined;
  @tracked imposedWidthDelta: number = 0;

  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  private _onColumnResize?: HdsAdvancedTableColumnResizeCallback;

  table: HdsAdvancedTableModel;

  get pxWidth(): number | undefined {
    if (isPxSize(this.width)) {
      return pxToNumber(this.width!);
    }
  }
  set pxWidth(value: number) {
    this.width = `${value}px`;
  }

  get pxMinWidth(): number | undefined {
    if (isPxSize(this.minWidth)) {
      return pxToNumber(this.minWidth!);
    }
  }

  get pxMaxWidth(): number | undefined {
    if (isPxSize(this.maxWidth)) {
      return pxToNumber(this.maxWidth!);
    }
  }

  constructor(args: {
    column: HdsAdvancedTableColumnType;
    table: HdsAdvancedTableModel;
    onColumnResize?: HdsAdvancedTableColumnResizeCallback;
  }) {
    const { column, table, onColumnResize } = args;

    // set reference to table model
    this.table = table;

    // set column properties
    this.label = column.label;
    this.align = column.align ?? 'left';
    this.isExpandable = 'isExpandable' in column ? column.isExpandable : false;
    this.isSortable = column.isSortable ?? false;
    this.isVisuallyHidden = column.isVisuallyHidden ?? false;
    this.key = column.key;
    this.tooltip = column.tooltip;
    this._setWidthValues(column);
    this.sortingFunction = column.sortingFunction;

    // set resize callback
    this._onColumnResize = onColumnResize;
  }

  private _setWidthValues({
    width,
    minWidth,
    maxWidth,
  }: HdsAdvancedTableColumnType): void {
    if (width === undefined) {
      return;
    }

    this.width = width;

    // capture the width at the time of instantiation so it can be restored
    this.originalWidth = width;

    this.minWidth = minWidth ?? DEFAULT_MIN_WIDTH;
    this.maxWidth = maxWidth ?? DEFAULT_MAX_WIDTH;
  }

  @action
  setPxWidth(newPxWidth: number): void {
    const pxMinWidth = this.pxMinWidth ?? 1;
    const minLimitedPxWidth = Math.max(newPxWidth, pxMinWidth);

    this.pxWidth =
      this.pxMaxWidth !== undefined
        ? Math.min(minLimitedPxWidth, this.pxMaxWidth)
        : minLimitedPxWidth;

    if (this.key === undefined) {
      return;
    }

    this._onColumnResize?.(this.key, this.width);
  }

  @action
  onPreviousColumnWidthRestored(): void {
    const restoredWidth = (this.pxWidth ?? 0) + this.imposedWidthDelta;
    console.log(this.pxWidth, this.imposedWidthDelta, restoredWidth);
    this.setPxWidth(restoredWidth);
    this.imposedWidthDelta = 0;
  }

  @action
  onNextColumnWidthRestored(imposedWidthDelta: number): void {
    this.setPxWidth((this.pxWidth ?? 0) - imposedWidthDelta);
  }

  @action
  restoreWidth(): void {
    this.width = this.originalWidth;

    if (this.key === undefined) {
      return;
    }

    this._onColumnResize?.(this.key, this.width);
  }
}
