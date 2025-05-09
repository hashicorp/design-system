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

function getNumericalWidth(width?: CssSize, defaultWidth?: number): number {
  if (width === undefined) {
    return defaultWidth ?? 0;
  }

  // width is a css string
  return parseInt(width, 10);
}
export default class HdsAdvancedTableColumn {
  @tracked label: string = '';
  @tracked _isResizable: boolean = false;

  @tracked align?: HdsAdvancedTableHorizontalAlignment = 'left';
  @tracked key?: string = undefined;
  @tracked isExpandable?: boolean = false;
  @tracked isReorderable?: boolean = false;
  @tracked isSortable?: boolean = false;
  @tracked isVisuallyHidden?: boolean = false;
  @tracked tooltip?: string = undefined;
  @tracked width?: CssSize = undefined;
  @tracked minWidth?: CssSize = undefined;
  @tracked maxWidth?: CssSize = undefined;

  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  private _originalWidth?: CssSize = undefined;
  private _cssWidthUnit?: CssSizeUnit = CssSizeUnitValues.Px;

  get isResizable(): boolean | undefined {
    if (!this._isResizable) {
      return false;
    }

    assert('width must be set to use isResizable', this.width !== undefined);

    return this._isResizable;
  }

  get pixelWidth(): number | undefined {
    const numericalWidth = getNumericalWidth(this.width);

    if (this._cssWidthUnit === CssSizeUnitValues.Px) {
      return numericalWidth;
    }

    if (this._cssWidthUnit === CssSizeUnitValues.Percent) {
      return 0;
    }
  }

  get numericalWidth(): number {
    return getNumericalWidth(this.width);
  }
  set numericalWidth(value: number) {
    if (this._cssWidthUnit === CssSizeUnitValues.Px) {
      this.width = `${value}${CssSizeUnitValues.Px}`;
      console.log({ width: this.width });
      return;
    }
    if (this._cssWidthUnit === CssSizeUnitValues.Percent) {
      // TODO: actually calculate the width based on the table width
      this.width = `${value}${CssSizeUnitValues.Percent}`;
      return;
    }
  }

  get numericalMinWidth(): number {
    return getNumericalWidth(this.minWidth);
  }

  get numericalMaxWidth(): number {
    return getNumericalWidth(this.maxWidth);
  }

  constructor(
    args: HdsAdvancedTableColumnType & { table: HdsAdvancedTableTableModel }
  ) {
    this.label = args.label;
    this.align = args.align;
    this.key = args.key;
    this._isResizable = args.isResizable ?? false;
    this.isSortable = args.isSortable;
    this.isVisuallyHidden = args.isVisuallyHidden;
    this.tooltip = args.tooltip;

    this.sortingFunction = args.sortingFunction;

    this.setWidthValues(args);
  }

  setWidthValues({
    width,
    minWidth,
    maxWidth,
  }: HdsAdvancedTableColumnType): void {
    this.width = width;
    // set default minWidth and maxWidth if width is set
    this.minWidth = (minWidth ?? this.width !== undefined) ? '50px' : undefined;
    this.maxWidth =
      (maxWidth ?? this.width !== undefined) ? '800px' : undefined;

    // capture the width at the time of instantiation so it can be restored
    this._originalWidth = width;

    this._cssWidthUnit = getCssUnit(this.width);
  }

  @action
  setNumericalWidth(newNumericalWidth: number): void {
    this.numericalWidth = Math.min(
      Math.max(newNumericalWidth, this.numericalMinWidth),
      this.numericalMaxWidth
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
