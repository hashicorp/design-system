import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.js';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  ...attributes\n  scope={{this.scope}}\n  role={{this.role}}\n  aria-rowspan={{@rowspan}}\n  aria-colspan={{@colspan}}\n  {{did-insert this.didInsert}}\n  aria-describedby={{@parentId}}\n  {{style grid-row=this.rowspan grid-column=this.colspan padding-left=this.paddingLeft}}\n>\n  {{#if @isVisuallyHidden}}\n    <span class=\"sr-only\">{{yield}}</span>\n  {{else}}\n    {{#if @tooltip}}\n      <div class=\"hds-advanced-table__th-content\">\n        {{#if @isExpandable}}\n          <Hds::AdvancedTable::ThButtonExpand @labelId={{this.labelId}} />\n        {{/if}}\n        <span id={{this.labelId}} class=\"hds-typography-body-200 hds-font-weight-semibold\">{{yield}}</span>\n        <Hds::AdvancedTable::ThButtonTooltip @tooltip={{@tooltip}} @labelId={{this.labelId}} />\n      </div>\n    {{else}}\n      <div class=\"hds-advanced-table__th-content\">\n        {{#if @isExpandable}}\n          <Hds::AdvancedTable::ThButtonExpand\n            @labelId={{this.labelId}}\n            @onToggle={{@onClickToggle}}\n            @isExpanded={{@isExpanded}}\n          />\n        {{/if}}\n        <span class=\"hds-typography-body-200 hds-font-weight-semibold\" id={{this.labelId}}>{{yield}}</span>\n      </div>\n    {{/if}}\n  {{/if}}\n</div>");

var _class;
const ALIGNMENTS = Object.values(HdsAdvancedTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
let HdsAdvancedTableTh = (_class = class HdsAdvancedTableTh extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "labelId", this.args.newLabel ? this.args.newLabel : guidFor(this));
  }
  didInsert(element) {
    didInsertGridCell(element);
    element.addEventListener('keydown', handleGridCellKeyPress);
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
    return classes.join(' ');
  }
}, (_applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsAdvancedTableTh);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsAdvancedTableTh as default };
//# sourceMappingURL=th.js.map
