import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

type HdsAdvancedTableExpandedState = boolean | null;

interface HdsAdvancedTableRowArgs {
  [key: string]: unknown;
  childrenKey?: string;
}

export default class HdsAdvancedTableRow {
  // row data
  [key: string]: unknown;

  @tracked isExpanded: boolean = false;

  children: HdsAdvancedTableRow[] = [];
  childrenKey: string;

  get expandedState(): HdsAdvancedTableExpandedState {
    if (!this.isExpanded) {
      return false;
    }

    if (this.children.length === 0) {
      return this.isExpanded;
    }

    return this.children.every((child) => child.expandedState) ? true : null;
  }

  get showChildren(): boolean {
    return this.isExpanded && this.children.length > 0;
  }

  constructor(args: HdsAdvancedTableRowArgs) {
    // set row data
    Object.assign(this, args);

    const childrenKey = args.childrenKey ?? 'children';

    this.childrenKey = childrenKey;

    const children = (
      (args[this.childrenKey] as HdsAdvancedTableRowArgs[]) ?? []
    ).map((child: HdsAdvancedTableRowArgs) => new HdsAdvancedTableRow(child));

    this.children = children;
  }

  @action
  toggleIsExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
