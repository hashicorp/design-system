import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { CssSizeUnitValues } from '../types.ts';

import type { HdsAdvancedTableColumn as HdsAdvancedTableColumnType } from '../types';
import type { HdsAdvancedTableHorizontalAlignment } from '../types';
import type { CssSize, CssSizeUnit } from '../types';
import type HdsAdvancedTableTableModel from './table.ts';

function getCssUnit(cssString?: string): CssSizeUnit | undefined {
  if (cssString === undefined) {
    return undefined;
  }

  const match = cssString.match(/([a-zA-Z%]+)/);

  if (match) {
    return match[0] as CssSizeUnit;
  }
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
  @tracked minWidth?: CssSize = undefined;
  @tracked maxWidth?: CssSize = undefined;
  @tracked tooltip?: string = undefined;
  @tracked width?: CssSize = undefined;

  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  private _cssWidthUnit?: CssSizeUnit = CssSizeUnitValues.Px;
  private _originalWidth?: CssSize = undefined;
  private _table: HdsAdvancedTableTableModel;

  // setting the pixelWidth property will set the width property in the correct unit
  get pixelWidth(): number {
    return this._getPixelWidth(this.width) ?? 0;
  }
  set pixelWidth(value: number) {
    if (this._cssWidthUnit === CssSizeUnitValues.Px) {
      this.width = `${value}${CssSizeUnitValues.Px}`;

      return;
    }

    if (this._cssWidthUnit === CssSizeUnitValues.Percent) {
      const tableWidth = this._table.pixelWidth;

      if (tableWidth === 0) {
        return;
      }

      const percentage = (value / tableWidth) * 100;

      this.width = `${percentage}${CssSizeUnitValues.Percent}`;

      return;
    }
  }

  get pixelMinWidth(): number {
    return this._getPixelWidth(this.minWidth) ?? 0;
  }

  get pixelMaxWidth(): number {
    return this._getPixelWidth(this.maxWidth) ?? 0;
  }

  constructor(
    args: HdsAdvancedTableColumnType & { table: HdsAdvancedTableTableModel }
  ) {
    // set reference to parent table model
    this._table = args.table;

    // set column properties
    this.label = args.label;
    this.align = args.align;
    this.isSortable = args.isSortable;
    this.isVisuallyHidden = args.isVisuallyHidden;
    this.key = args.key;
    this.tooltip = args.tooltip;
    this._setResizableValues(args);
    this._setWidthValues(args);
    this.sortingFunction = args.sortingFunction;
  }

  private _getPixelWidth(width?: CssSize): number | undefined {
    if (width === undefined) {
      return;
    }

    const cssUnit = getCssUnit(width);
    const numericalWidth = parseInt(width, 10);

    if (cssUnit === CssSizeUnitValues.Px) {
      return numericalWidth;
    }

    if (cssUnit === CssSizeUnitValues.Percent) {
      const tableWidth = this._table.pixelWidth;

      return (numericalWidth / 100) * tableWidth;
    }
  }

  private _setResizableValues({
    isResizable,
  }: HdsAdvancedTableColumnType): void {
    this.isResizable = isResizable ?? false;

    if (this.isResizable) {
      assert('width must be set to use isResizable', this.width !== undefined);
    }
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

    this.minWidth = minWidth ?? '50px';
    this.maxWidth = maxWidth ?? '800px';

    this._cssWidthUnit = getCssUnit(this.width);
  }

  @action
  setPixelWidth(newPixelWidth: number): void {
    this.pixelWidth = Math.min(
      Math.max(newPixelWidth, this.pixelMinWidth),
      this.pixelMaxWidth
    );
  }

  @action
  restoreWidth(): void {
    if (this._originalWidth === undefined) {
      return;
    }

    this.width = this._originalWidth;
  }
}
