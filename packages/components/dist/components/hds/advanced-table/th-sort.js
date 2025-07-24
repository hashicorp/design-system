import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { focusable } from 'tabbable';
import { modifier } from 'ember-modifier';
import { HdsAdvancedTableThSortOrderLabelValues, HdsAdvancedTableThSortOrderValues, HdsAdvancedTableHorizontalAlignmentValues } from './types.js';
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  aria-sort={{this.ariaSort}}\n  role=\"columnheader\"\n  aria-rowspan={{@rowspan}}\n  aria-colspan={{@colspan}}\n  {{hds-advanced-table-cell\n    handleEnableFocusTrap=this.enableFocusTrap\n    shouldTrapFocus=this._shouldTrapFocus\n    setCellElement=this.setElement\n  }}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap\n    isActive=this._shouldTrapFocus\n    focusTrapOptions=(hash\n      onDeactivate=this.onFocusTrapDeactivate initialFocus=this.getInitialFocus clickOutsideDeactivates=true\n    )\n  }}\n  ...attributes\n>\n  <Hds::Layout::Flex @justify=\"space-between\" @align=\"center\" @gap=\"8\">\n    <div class=\"hds-advanced-table__th-content\">\n      <span\n        id={{this._labelId}}\n        class=\"hds-advanced-table__th-content-text hds-typography-body-200 hds-font-weight-semibold\"\n      >\n        {{yield}}\n      </span>\n\n      {{#if @tooltip}}\n        <Hds::AdvancedTable::ThButtonTooltip @tooltip={{@tooltip}} @labelId={{this._labelId}} />\n      {{/if}}\n    </div>\n\n    <Hds::Layout::Flex class=\"hds-advanced-table__th-actions\" @align=\"center\" @gap=\"8\">\n      <Hds::AdvancedTable::ThButtonSort\n        @sortOrder={{@sortOrder}}\n        @onClick={{@onClickSort}}\n        @labelId={{this._labelId}}\n      />\n\n      {{#if @column}}\n        {{#if this.showContextMenu}}\n          <Hds::AdvancedTable::ThContextMenu\n            @column={{@column}}\n            @hasResizableColumns={{@hasResizableColumns}}\n            @resizeHandleElement={{this._resizeHandleElement}}\n            @onColumnResize={{@onColumnResize}}\n          />\n        {{/if}}\n\n        {{#if (and @hasResizableColumns (not @column.isLast))}}\n          <Hds::AdvancedTable::ThResizeHandle\n            @column={{@column}}\n            @hasResizableColumns={{@hasResizableColumns}}\n            @tableHeight={{@tableHeight}}\n            @onColumnResize={{@onColumnResize}}\n            {{this._registerResizeHandleElement}}\n          />\n        {{/if}}\n      {{/if}}\n    </Hds::Layout::Flex>\n  </Hds::Layout::Flex>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ALIGNMENTS = Object.values(HdsAdvancedTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
class HdsAdvancedTableThSort extends Component {
  _labelId = guidFor(this);
  _element;
  static {
    g(this.prototype, "_shouldTrapFocus", [tracked], function () {
      return false;
    });
  }
  #_shouldTrapFocus = (i(this, "_shouldTrapFocus"), void 0);
  static {
    g(this.prototype, "_resizeHandleElement", [tracked]);
  }
  #_resizeHandleElement = (i(this, "_resizeHandleElement"), void 0);
  constructor(owner, args) {
    super(owner, args);
    const {
      rowspan,
      colspan,
      isStickyColumn
    } = args;
    if (isStickyColumn) {
      assert('Cannot have custom rowspan or colspan if there are nested rows.', rowspan === undefined || colspan === undefined);
    }
  }
  get ariaSort() {
    switch (this.args.sortOrder) {
      case HdsAdvancedTableThSortOrderValues.Asc:
        return HdsAdvancedTableThSortOrderLabelValues.Asc;
      case HdsAdvancedTableThSortOrderValues.Desc:
        return HdsAdvancedTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsAdvancedTableThSortOrderLabelValues.None;
    }
  }
  get align() {
    const {
      align = DEFAULT_ALIGN
    } = this.args;
    assert(`@align for "Hds::Table" must be one of the following: ${ALIGNMENTS.join(', ')}; received: ${align}`, ALIGNMENTS.includes(align));
    return align;
  }
  get showContextMenu() {
    const {
      hasResizableColumns
    } = this.args;
    return hasResizableColumns ?? false;
  }
  get classNames() {
    const classes = ['hds-advanced-table__th', 'hds-advanced-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__th--align-${this.align}`);
    }
    if (this.args.isStickyColumn) {
      classes.push('hds-advanced-table__th--is-sticky-column');
    }
    if (this.args.isStickyColumn && this.args.isStickyColumnPinned) {
      classes.push('hds-advanced-table__th--is-sticky-column-pinned');
    }
    return classes.join(' ');
  }
  onFocusTrapDeactivate() {
    this._shouldTrapFocus = false;
    onFocusTrapDeactivate(this._element);
  }
  static {
    n(this.prototype, "onFocusTrapDeactivate", [action]);
  }
  enableFocusTrap() {
    this._shouldTrapFocus = true;
  }
  static {
    n(this.prototype, "enableFocusTrap", [action]);
  }
  getInitialFocus() {
    const cellFocusableElements = focusable(this._element);
    return cellFocusableElements[0];
  }
  static {
    n(this.prototype, "getInitialFocus", [action]);
  }
  setElement(element) {
    this._element = element;
  }
  static {
    n(this.prototype, "setElement", [action]);
  }
  _registerResizeHandleElement = modifier(element => {
    this._resizeHandleElement = element;
  });
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableThSort);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsAdvancedTableThSort as default };
//# sourceMappingURL=th-sort.js.map
