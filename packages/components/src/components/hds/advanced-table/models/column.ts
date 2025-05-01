import { tracked } from '@glimmer/tracking';

import type { HdsAdvancedTableHorizontalAlignment } from "../types";

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
  
  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;

  constructor(args: HdsAdvancedTableColumn) {
    this.label = args.label;
    this.align = args.align;
    this.key = args.key;
    this.isExpandable = args.isExpandable;
    this.isReorderable = args.isReorderable;
    this.isResizable = args.isResizable;
    this.isSortable = args.isSortable;
    this.isVisuallyHidden = args.isVisuallyHidden;
    this.tooltip = args.tooltip;
    this.width = args.width;

    this.sortingFunction = args.sortingFunction;
  }
}