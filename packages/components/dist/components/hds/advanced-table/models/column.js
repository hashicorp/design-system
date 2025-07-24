import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { g, i, n } from 'decorator-transforms/runtime';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_MIN_WIDTH = '150px';
const DEFAULT_MAX_WIDTH = '800px';
function isPxSize(value) {
  if (value === undefined) {
    return false;
  }
  return /^-?\d+(\.\d+)?px$/.test(value);
}
function pxToNumber(pxString) {
  return parseFloat(pxString.slice(0, -2));
}
class HdsAdvancedTableColumn {
  static {
    g(this.prototype, "label", [tracked], function () {
      return '';
    });
  }
  #label = (i(this, "label"), void 0);
  static {
    g(this.prototype, "align", [tracked], function () {
      return 'left';
    });
  }
  #align = (i(this, "align"), void 0);
  static {
    g(this.prototype, "isExpandable", [tracked], function () {
      return false;
    });
  }
  #isExpandable = (i(this, "isExpandable"), void 0);
  static {
    g(this.prototype, "isReorderable", [tracked], function () {
      return false;
    });
  }
  #isReorderable = (i(this, "isReorderable"), void 0);
  static {
    g(this.prototype, "isSortable", [tracked], function () {
      return false;
    });
  }
  #isSortable = (i(this, "isSortable"), void 0);
  static {
    g(this.prototype, "isVisuallyHidden", [tracked], function () {
      return false;
    });
  }
  #isVisuallyHidden = (i(this, "isVisuallyHidden"), void 0);
  static {
    g(this.prototype, "key", [tracked], function () {
      return undefined;
    });
  }
  #key = (i(this, "key"), void 0);
  static {
    g(this.prototype, "minWidth", [tracked], function () {
      return DEFAULT_MIN_WIDTH;
    });
  }
  #minWidth = (i(this, "minWidth"), void 0);
  static {
    g(this.prototype, "maxWidth", [tracked], function () {
      return DEFAULT_MAX_WIDTH;
    });
  }
  #maxWidth = (i(this, "maxWidth"), void 0);
  static {
    g(this.prototype, "tooltip", [tracked], function () {
      return undefined;
    });
  }
  #tooltip = (i(this, "tooltip"), void 0);
  static {
    g(this.prototype, "width", [tracked], function () {
      return undefined;
    });
  }
  #width = (i(this, "width"), void 0);
  static {
    g(this.prototype, "originalWidth", [tracked], function () {
      return undefined;
    });
  }
  #originalWidth = (i(this, "originalWidth"), void 0);
  static {
    g(this.prototype, "imposedWidthDelta", [tracked], function () {
      return 0;
    });
  }
  #imposedWidthDelta = (i(this, "imposedWidthDelta"), void 0); // used to restore the width when resetting
  static {
    g(this.prototype, "sortingFunction", [tracked], function () {
      return undefined;
    });
  }
  #sortingFunction = (i(this, "sortingFunction"), void 0); // used to track the width change imposed by the previous column
  table;
  get pxWidth() {
    if (isPxSize(this.width)) {
      return pxToNumber(this.width);
    }
  }
  set pxWidth(value) {
    this.width = `${value}px`;
  }
  get pxMinWidth() {
    if (isPxSize(this.minWidth)) {
      return pxToNumber(this.minWidth);
    }
  }
  get pxMaxWidth() {
    if (isPxSize(this.maxWidth)) {
      return pxToNumber(this.maxWidth);
    }
  }
  get index() {
    const {
      columns
    } = this.table;
    if (columns.length === 0) {
      return -1;
    }
    return columns.findIndex(column => column.key === this.key);
  }
  get isFirst() {
    return this.index === 0;
  }
  get isLast() {
    return this.index !== -1 && this.index === this.table.columns.length - 1;
  }
  get siblings() {
    const {
      index,
      table
    } = this;
    const {
      columns
    } = table;
    if (index === -1) {
      return {};
    }
    return {
      previous: this.isFirst ? undefined : columns[index - 1],
      next: this.isLast ? undefined : columns[index + 1]
    };
  }
  constructor(args) {
    const {
      column,
      table
    } = args;

    // set reference to table model
    this.table = table;

    // set column properties
    this.label = column.label;
    this.align = column.align ?? 'left';
    this.isExpandable = 'isExpandable' in column ? column.isExpandable : false;
    this.isSortable = column.isSortable ?? false;
    this.isVisuallyHidden = column.isVisuallyHidden ?? false;
    this.key = column.key;
    this.tooltip = column.tooltip;
    this._setWidthValues(column);
    this.sortingFunction = column.sortingFunction;
  }
  _setWidthValues({
    width,
    minWidth,
    maxWidth
  }) {
    if (width === undefined) {
      return;
    }
    this.width = width;

    // capture the width at the time of instantiation so it can be restored
    this.originalWidth = width;
    this.minWidth = minWidth ?? DEFAULT_MIN_WIDTH;
    this.maxWidth = maxWidth ?? DEFAULT_MAX_WIDTH;
  }

  // Sets the column width in pixels, ensuring it respects the min and max width constraints.
  setPxWidth(newPxWidth) {
    const pxMinWidth = this.pxMinWidth ?? 1;
    const minLimitedPxWidth = Math.max(newPxWidth, pxMinWidth);
    this.pxWidth = this.pxMaxWidth !== undefined ? Math.min(minLimitedPxWidth, this.pxMaxWidth) : minLimitedPxWidth;
    if (this.key === undefined) {
      return;
    }
  }

  // This method is called when the column width is changed by the previous column.
  static {
    n(this.prototype, "setPxWidth", [action]);
  }
  onPreviousColumnWidthRestored() {
    const restoredWidth = (this.pxWidth ?? 0) + this.imposedWidthDelta;
    this.setPxWidth(restoredWidth);
    this.imposedWidthDelta = 0;
  }

  // This method is called when the next column width is restored.
  static {
    n(this.prototype, "onPreviousColumnWidthRestored", [action]);
  }
  onNextColumnWidthRestored(imposedWidthDelta) {
    this.setPxWidth((this.pxWidth ?? 0) - imposedWidthDelta);
  }
  static {
    n(this.prototype, "onNextColumnWidthRestored", [action]);
  }
  restoreWidth() {
    this.width = this.originalWidth;
    this.imposedWidthDelta = 0;
    if (this.key === undefined) {
      return;
    }
  }
  static {
    n(this.prototype, "restoreWidth", [action]);
  }
}

export { DEFAULT_MAX_WIDTH, DEFAULT_MIN_WIDTH, HdsAdvancedTableColumn as default };
//# sourceMappingURL=column.js.map
