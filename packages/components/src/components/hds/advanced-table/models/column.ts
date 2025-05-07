import { tracked } from '@glimmer/tracking';

import type { HdsAdvancedTableColumn as HdsAdvancedTableColumnType } from '../types';
import type { HdsAdvancedTableHorizontalAlignment } from '../types';

function getNumericalWidth(width: string | undefined): number {
  if (width === undefined) {
    return 0;
  }

  // width is a css string
  return parseInt(width, 10);
}
export default class HdsAdvancedTableColumn {
  @tracked label: string = '';
  @tracked align?: HdsAdvancedTableHorizontalAlignment = 'left';
  @tracked key?: string = undefined;
  @tracked isExpandable?: boolean = false;
  @tracked isReorderable?: boolean = false;
  @tracked isResizable?: boolean = false;
  @tracked isSortable?: boolean = false;
  @tracked isVisuallyHidden?: boolean = false;
  @tracked tooltip?: string = undefined;
  @tracked width?: string = undefined; // css width like `100px`
  @tracked minWidth?: string = undefined; // css width like `100px`
  @tracked maxWidth?: string = undefined; // css width like `100px`

  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  get numericalWidth(): number {
    return getNumericalWidth(this.width);
  }
  set numericalWidth(value: number) {
    this.width = `${value}px`;
  }

  get numericalMinWidth(): number {
    return getNumericalWidth(this.minWidth);
  }

  get numericalMaxWidth(): number {
    return getNumericalWidth(this.maxWidth);
  }

  constructor(args: HdsAdvancedTableColumnType) {
    this.label = args.label;
    this.align = args.align;
    this.key = args.key;
    this.isResizable = args.isResizable;
    this.isSortable = args.isSortable;
    this.isVisuallyHidden = args.isVisuallyHidden;
    this.tooltip = args.tooltip;

    this.width = args.width;
    this.minWidth = args.minWidth ?? `100px`; // default min width
    this.maxWidth = args.maxWidth ?? `500px`; // default max width

    this.sortingFunction = args.sortingFunction;
  }
}
