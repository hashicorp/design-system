import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { focusable } from 'tabbable';
import { modifier } from 'ember-modifier';
import './models/column.js';
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.js';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  role={{this.role}}\n  aria-rowspan={{@rowspan}}\n  aria-colspan={{@colspan}}\n  aria-describedby={{@parentId}}\n  {{style grid-row=this.rowspan grid-column=this.colspan padding-left=this.paddingLeft}}\n  {{hds-advanced-table-cell\n    handleEnableFocusTrap=this.enableFocusTrap\n    shouldTrapFocus=this._shouldTrapFocus\n    setCellElement=this.setElement\n  }}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap\n    isActive=this._shouldTrapFocus\n    focusTrapOptions=(hash\n      onDeactivate=this.onFocusTrapDeactivate initialFocus=this.getInitialFocus clickOutsideDeactivates=true\n    )\n  }}\n  ...attributes\n>\n  <Hds::Layout::Flex @justify=\"space-between\" @align=\"center\" @gap=\"8\">\n    {{#if @column.isVisuallyHidden}}\n      <span class=\"sr-only\">{{yield}}</span>\n    {{else}}\n      {{#if @tooltip}}\n        <div class=\"hds-advanced-table__th-content\">\n          {{#if @isExpandable}}\n            <Hds::AdvancedTable::ThButtonExpand\n              @labelId={{this._labelId}}\n              @onToggle={{@onClickToggle}}\n              @isExpanded={{@isExpanded}}\n              @isExpandAll={{@hasExpandAllButton}}\n              {{this._manageExpandButton}}\n            />\n          {{/if}}\n          <span\n            id={{this._labelId}}\n            class=\"hds-advanced-table__th-content-text hds-typography-body-200 hds-font-weight-semibold\"\n          >\n            {{yield}}\n          </span>\n          <Hds::AdvancedTable::ThButtonTooltip @tooltip={{@tooltip}} @labelId={{this._labelId}} />\n        </div>\n      {{else}}\n        <div class=\"hds-advanced-table__th-content\">\n          {{#if @isExpandable}}\n            <Hds::AdvancedTable::ThButtonExpand\n              @labelId={{this._labelId}}\n              @onToggle={{@onClickToggle}}\n              @isExpanded={{@isExpanded}}\n              @isExpandAll={{@hasExpandAllButton}}\n              {{this._manageExpandButton}}\n            />\n          {{/if}}\n          <span\n            class=\"hds-advanced-table__th-content-text hds-typography-body-200 hds-font-weight-semibold\"\n            id={{this._labelId}}\n          >{{yield}}</span>\n        </div>\n      {{/if}}\n    {{/if}}\n\n    {{#if @column}}\n      {{#if this.showContextMenu}}\n        <Hds::AdvancedTable::ThContextMenu\n          @column={{@column}}\n          @hasResizableColumns={{@hasResizableColumns}}\n          @resizeHandleElement={{this._resizeHandleElement}}\n          @onColumnResize={{@onColumnResize}}\n        />\n      {{/if}}\n\n      {{#if (and @hasResizableColumns (not @column.isLast))}}\n        <Hds::AdvancedTable::ThResizeHandle\n          @column={{@column}}\n          @hasResizableColumns={{@hasResizableColumns}}\n          @tableHeight={{@tableHeight}}\n          @onColumnResize={{@onColumnResize}}\n          {{this._registerResizeHandleElement}}\n        />\n      {{/if}}\n    {{/if}}\n  </Hds::Layout::Flex>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ALIGNMENTS = Object.values(HdsAdvancedTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
class HdsAdvancedTableTh extends Component {
  _labelId = this.args.newLabel ? this.args.newLabel : guidFor(this);
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
  get scope() {
    const {
      scope = 'col'
    } = this.args;
    return scope;
  }
  get role() {
    if (this.scope === 'col') return 'columnheader';else return 'rowheader';
  }
  get align() {
    const {
      align = DEFAULT_ALIGN
    } = this.args;
    assert(`@align for "Hds::Table::Th" must be one of the following: ${ALIGNMENTS.join(', ')}; received: ${align}`, ALIGNMENTS.includes(align));
    return align;
  }

  // rowspan and colspan have to return 'auto' if not defined because otherwise the style modifier sets grid-area: undefined on the cell, which breaks the grid styles
  get rowspan() {
    if (this.args.rowspan) {
      return `span ${this.args.rowspan}`;
    }
    return 'auto';
  }
  get colspan() {
    if (this.args.colspan) {
      return `span ${this.args.colspan}`;
    }
    return 'auto';
  }
  get paddingLeft() {
    if (this.args.depth) {
      return `calc(${this.args.depth} * 32px + 16px)`;
    }
  }
  get classNames() {
    const classes = ['hds-advanced-table__th'];

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
  get showContextMenu() {
    const {
      hasResizableColumns
    } = this.args;
    return hasResizableColumns ?? false;
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
  _manageExpandButton = modifier(button => {
    const {
      didInsertExpandButton,
      willDestroyExpandButton
    } = this.args;
    if (typeof didInsertExpandButton === 'function') {
      didInsertExpandButton(button);
    }
    return () => {
      if (typeof willDestroyExpandButton === 'function') {
        willDestroyExpandButton(button);
      }
    };
  });
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableTh);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsAdvancedTableTh as default };
//# sourceMappingURL=th.js.map
