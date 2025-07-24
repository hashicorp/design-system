import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { g, i, n } from 'decorator-transforms/runtime';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAdvancedTableRow {
  id = guidFor(this);

  // row data
  static {
    g(this.prototype, "isOpen", [tracked], function () {
      return false;
    });
  }
  #isOpen = (i(this, "isOpen"), void 0);
  children = [];
  childrenKey;
  get hasChildren() {
    return this.children.length > 0;
  }
  get showChildren() {
    return this.isOpen && this.hasChildren;
  }
  constructor(args) {
    // set row data
    Object.assign(this, args);
    this.childrenKey = args.childrenKey ?? 'children';
    const childModels = args[this.childrenKey];
    if (Array.isArray(childModels)) {
      this.children = childModels.map(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      child => new HdsAdvancedTableRow(child));
    }
  }
  openAll() {
    this.isOpen = true;
    this.children.forEach(child => child.openAll());
  }
  static {
    n(this.prototype, "openAll", [action]);
  }
  collapseAll() {
    this.isOpen = false;
    this.children.forEach(child => child.collapseAll());
  }
  static {
    n(this.prototype, "collapseAll", [action]);
  }
  onClickToggle() {
    this.isOpen = !this.isOpen;
  }
  static {
    n(this.prototype, "onClickToggle", [action]);
  }
}

export { HdsAdvancedTableRow as default };
//# sourceMappingURL=row.js.map
