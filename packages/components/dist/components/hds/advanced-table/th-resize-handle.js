import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n{{! template-lint-disable no-pointer-down-event-binding }}\n<div\n  class={{this.classNames}}\n  draggable=\"false\"\n  role=\"slider\"\n  aria-orientation=\"horizontal\"\n  aria-valuenow={{@column.pxWidth}}\n  aria-valuemin={{@column.pxMinWidth}}\n  aria-valuemax={{@column.pxMaxWidth}}\n  tabindex=\"0\"\n  aria-label=\"Resize {{@column.label}} column\"\n  {{this._registerHandleElement}}\n  {{on \"pointerdown\" this.startResize}}\n  {{on \"keydown\" this.handleKeydown}}\n  {{style height=this.height}}\n  ...attributes\n/>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const TABLE_BORDER_WIDTH = 1;
const KEYBOARD_RESIZE_STEP = 10;
function calculateEffectiveDelta(deltaX, col, startColW, nextCol, startNextColW) {
  const colMin = col.pxMinWidth ?? 0;
  const colMax = col.pxMaxWidth ?? Infinity;
  const nextMin = nextCol.pxMinWidth ?? 0;
  const nextMax = nextCol.pxMaxWidth ?? Infinity;
  let effectiveDelta = 0;

  // expanding col, shrinking nextCol
  if (deltaX > 0) {
    const maxCanExpandCol = colMax - startColW;
    const maxCanShrinkNext = startNextColW - nextMin;
    effectiveDelta = Math.min(deltaX, maxCanExpandCol, maxCanShrinkNext);
    effectiveDelta = Math.max(0, effectiveDelta);
  }
  // shrinking col, expanding nextCol
  else if (deltaX < 0) {
    const absDeltaX = -deltaX;
    const maxCanShrinkCol = startColW - colMin;
    const maxCanExpandNext = nextMax - startNextColW;
    effectiveDelta = -Math.min(absDeltaX, maxCanShrinkCol, maxCanExpandNext);
    effectiveDelta = Math.min(0, effectiveDelta);
  }
  return effectiveDelta;
}
class HdsAdvancedTableThResizeHandle extends Component {
  static {
    g(this.prototype, "resizing", [tracked], function () {
      return null;
    });
  }
  #resizing = (i(this, "resizing"), void 0);
  static {
    g(this.prototype, "_nextColumnDelta", [tracked], function () {
      return 0;
    });
  }
  #_nextColumnDelta = (i(this, "_nextColumnDelta"), void 0);
  _handleElement;
  _boundResize;
  _boundStopResize;
  _registerHandleElement = modifier(element => {
    this._handleElement = element;
  });
  constructor(owner, args) {
    super(owner, args);
    this._boundResize = this._resize.bind(this);
    this._boundStopResize = this._stopResize.bind(this);
  }
  get height() {
    const {
      tableHeight
    } = this.args;
    if (tableHeight === undefined) {
      return;
    }
    return `${tableHeight - TABLE_BORDER_WIDTH * 2}px`;
  }
  get classNames() {
    const classes = ['hds-advanced-table__th-resize-handle'];
    if (this.resizing !== null) {
      classes.push('hds-advanced-table__th-resize-handle--resizing');
    }
    return classes.join(' ');
  }
  onColumnResize(key, width) {
    const {
      onColumnResize
    } = this.args;
    if (typeof onColumnResize === 'function' && key !== undefined) {
      onColumnResize(key, width);
    }
  }
  static {
    n(this.prototype, "onColumnResize", [action]);
  }
  handleKeydown(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const {
      column
    } = this.args;
    const {
      next: nextColumn
    } = column.siblings;
    const currentColumnPxWidth = column.pxWidth;
    const currentNextColumnPxWidth = nextColumn?.pxWidth;
    let deltaX = 0;
    if (event.key === 'ArrowLeft') {
      deltaX = -10;
    } else if (event.key === 'ArrowRight') {
      deltaX = KEYBOARD_RESIZE_STEP;
    }
    if (deltaX === 0) return;
    this._applyResizeDelta(deltaX, column, currentColumnPxWidth ?? 0,
    // Current width before keyboard step
    nextColumn, currentNextColumnPxWidth ?? 0 // Current next col width before keyboard step
    );
    this._setNextColumnImposedWidthDelta(nextColumn, this._nextColumnDelta);
    this.onColumnResize(column.key, column.width);
    this._handleElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  }
  static {
    n(this.prototype, "handleKeydown", [action]);
  }
  startResize(event) {
    event.preventDefault();
    event.stopPropagation();
    const {
      column
    } = this.args;
    const {
      next: nextColumn
    } = column.siblings;
    this.resizing = {
      startX: event.clientX,
      startColumnPxWidth: column.pxWidth ?? 0,
      startNextColumnPxWidth: nextColumn?.pxWidth ?? 0
    };
    window.addEventListener('pointermove', this._boundResize);
    window.addEventListener('pointerup', this._boundStopResize);
  }
  static {
    n(this.prototype, "startResize", [action]);
  }
  _applyResizeDelta(deltaX, column, startColumnPxWidth, nextColumn, startNextColumnPxWidth) {
    const canResizeNeighbor = nextColumn !== undefined && startNextColumnPxWidth !== undefined;
    if (canResizeNeighbor) {
      const effectiveDelta = calculateEffectiveDelta(deltaX, column, startColumnPxWidth, nextColumn, startNextColumnPxWidth);
      column.setPxWidth(startColumnPxWidth + effectiveDelta);

      // the actual new column width may differ from the intended width due to min/max constraints.
      const actualNewColumnWidth = column.pxWidth ?? startColumnPxWidth;
      const actualAppliedDelta = actualNewColumnWidth - startColumnPxWidth;
      nextColumn.setPxWidth(startNextColumnPxWidth - actualAppliedDelta);
      this._nextColumnDelta = actualAppliedDelta;
    } else {
      column.setPxWidth(startColumnPxWidth + deltaX);
    }
  }
  _resize(event) {
    if (this.resizing === null) {
      return;
    }
    event.preventDefault();
    const {
      column
    } = this.args;
    const {
      next: nextColumn
    } = column.siblings;
    const {
      startX,
      startColumnPxWidth,
      startNextColumnPxWidth
    } = this.resizing;
    const deltaX = event.clientX - startX;
    this._applyResizeDelta(deltaX, column, startColumnPxWidth,
    // Width at the start of the drag
    nextColumn, startNextColumnPxWidth // Width of next col at the start of the drag
    );
  }
  _stopResize() {
    window.removeEventListener('pointermove', this._boundResize);
    window.removeEventListener('pointerup', this._boundStopResize);
    const {
      column
    } = this.args;
    const {
      next: nextColumn
    } = column.siblings;
    this._setNextColumnImposedWidthDelta(nextColumn, this._nextColumnDelta);
    this.onColumnResize(column.key, column.width);
    this.resizing = null;
  }
  _setNextColumnImposedWidthDelta(nextColumn, delta) {
    if (nextColumn === undefined) {
      return;
    }
    nextColumn.imposedWidthDelta = (nextColumn.imposedWidthDelta ?? 0) + delta;
    this._nextColumnDelta = 0;
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableThResizeHandle);

export { HdsAdvancedTableThResizeHandle as default };
//# sourceMappingURL=th-resize-handle.js.map
