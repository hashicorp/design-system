import { tracked } from '@glimmer/tracking';

import type { HdsAdvancedTableColumn as HdsAdvancedTableColumnType } from '../types';
import type { HdsAdvancedTableHorizontalAlignment } from '../types';

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
  @tracked width?: string = undefined;
  @tracked minWidth?: string = undefined;
  @tracked maxWidth?: string = undefined;

  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  constructor(args: HdsAdvancedTableColumnType) {
    this.label = args.label;
    this.align = args.align;
    this.key = args.key;
    this.isResizable = args.isResizable;
    this.isSortable = args.isSortable;
    this.isVisuallyHidden = args.isVisuallyHidden;
    this.tooltip = args.tooltip;
    this.width = args.width;
    this.minWidth = args.minWidth;
    this.maxWidth = args.maxWidth;

    this.sortingFunction = args.sortingFunction;
  }
}