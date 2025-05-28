import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

import type { HdsAdvancedTableColumn as HdsAdvancedTableColumnType } from '../types';
import type { HdsAdvancedTableHorizontalAlignment } from '../types';

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

  constructor(args: HdsAdvancedTableColumnType) {
    // set column properties
    this.label = args.label;
    this.align = args.align;
    this.isExpandable = 'isExpandable' in args ? args.isExpandable : false;
    this.isSortable = args.isSortable;
    this.isVisuallyHidden = args.isVisuallyHidden;
    this.key = args.key;
    this.tooltip = args.tooltip;
    this._setWidthValues(args);
    this._setResizableValues(args);
    this.sortingFunction = args.sortingFunction;
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
  }

  @action
  restoreWidth(): void {
    this.width = this._originalWidth;
  }
}
