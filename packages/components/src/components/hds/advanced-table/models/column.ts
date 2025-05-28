import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

import type { HdsAdvancedTableColumn as HdsAdvancedTableColumnType } from '../types';
import type { HdsAdvancedTableHorizontalAlignment } from '../types';
import type { HdsAdvancedTableTableColumnResizeCallback } from './table';

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
  @tracked isResizable?: boolean = false;
  @tracked isSortable?: boolean = false;
  @tracked isVisuallyHidden?: boolean = false;
  @tracked key?: string = undefined;
  @tracked minWidth?: `${number}px` = undefined;
  @tracked maxWidth?: `${number}px` = undefined;
  @tracked tooltip?: string = undefined;
  @tracked width?: string = undefined;

  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  private _originalWidth?: string = undefined;
  private _onColumnResize?: HdsAdvancedTableTableColumnResizeCallback;

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
    onColumnResize?: HdsAdvancedTableTableColumnResizeCallback;
  }) {
    const { column, onColumnResize } = args;

    // set column properties
    this.label = column.label;
    this.align = column.align;
    this.isExpandable = 'isExpandable' in column ? column.isExpandable : false;
    this.isSortable = column.isSortable;
    this.isVisuallyHidden = column.isVisuallyHidden;
    this.key = column.key;
    this.tooltip = column.tooltip;
    this._setWidthValues(column);
    this._setResizableValues(column);
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
    this._originalWidth = width;

    // TODO: discuss sensible defaults for minWidth and maxWidth
    this.minWidth = minWidth ?? '150px';
    this.maxWidth = maxWidth ?? '800px';
  }

  private _setResizableValues({
    isResizable,
  }: HdsAdvancedTableColumnType): void {
    if (isResizable) {
      assert(
        'width must be set a px value to use isResizable',
        isPxSize(this.width)
      );
    }

    this.isResizable = isResizable ?? false;
  }

  @action
  setPxWidth(newPxWidth: number): void {
    const pxMinWidth = this.pxMinWidth ?? 1;
    const minLimitedPxWidth = Math.max(newPxWidth, pxMinWidth);

    this.pxWidth =
      this.pxMaxWidth !== undefined
        ? Math.min(minLimitedPxWidth, this.pxMaxWidth)
        : minLimitedPxWidth;

    if (this.key === undefined || this.width === undefined) {
      return;
    }

    this._onColumnResize?.(this.key, this.width);
  }

  @action
  restoreWidth(): void {
    this.width = this._originalWidth;
  }
}
