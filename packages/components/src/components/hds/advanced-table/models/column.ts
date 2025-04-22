import { tracked } from '@glimmer/tracking';

import type { HdsAdvancedTableHorizontalAlignment } from "../types";

export default class HdsAdvancedTableColumn {
  @tracked label: string = '';
  
  @tracked align?: HdsAdvancedTableHorizontalAlignment = 'left';
  @tracked isExpandable?: boolean = false;
  @tracked isSortable?: boolean = false;
  @tracked isVisuallyHidden?: boolean = false;
  @tracked key?: string = undefined;
  @tracked sortingFunction?: (a: unknown, b: unknown) => number = undefined;
  @tracked tooltip?: string = undefined;
  @tracked width?: string = undefined;

  constructor(args: HdsAdvancedTableColumn) {
    this.align = args.align ?? 'left';
    this.isVisuallyHidden = args.isVisuallyHidden ?? false;
    this.label = args.label;
    this.isSortable = args.isSortable ?? false;
    this.key = args.key;
    this.sortingFunction = args.sortingFunction;
    this.tooltip = args.tooltip;
    this.width = args.width;
  }
}