import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import type { HdsAdvancedTableExpandState } from '../types';

interface HdsAdvancedTableRowArgs {
  [key: string]: unknown;
  id?: string;
  childrenKey?: string;
}

export default class HdsAdvancedTableRow {
  id = guidFor(this);

  // row data
  [key: string]: unknown;

  @tracked isOpen: boolean = false;
  @tracked isExpanded: HdsAdvancedTableExpandState = false;

  children: HdsAdvancedTableRow[] = [];
  childrenKey: string;

  get hasChildren(): boolean {
    return this.children.length > 0;
  }

  get showChildren(): boolean {
    return this.isOpen && this.hasChildren;
  }

  constructor(args: HdsAdvancedTableRowArgs) {
    // set row data
    Object.assign(this, args);

    this.childrenKey = args.childrenKey ?? 'children';

    const childModels = args[this.childrenKey];

    this.isExpanded = this.isOpen;

    if (Array.isArray(childModels)) {
      this.children = childModels.map(
        (child) => new HdsAdvancedTableRow(child)
      );
    }
  }

  @action
  openAll() {
    this.isOpen = true;
    this.children.forEach((child) => child.openAll());
  }

  @action
  collapseAll() {
    this.isOpen = false;
    this.children.forEach((child) => child.collapseAll());
  }

  @action
  onClickToggle(newValue?: HdsAdvancedTableExpandState) {
    if (newValue) {
      this.isExpanded = newValue;
    } else {
      this.isExpanded = !this.isExpanded;
    }
  }
}
