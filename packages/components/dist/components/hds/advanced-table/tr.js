import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class={{this.classNames}} role=\"row\" ...attributes id={{this.rowId}} data-depth={{@depth}}>\n  {{#if @isSelectable}}\n    <Hds::AdvancedTable::ThSelectable\n      @isSelected={{@isSelected}}\n      @selectionScope={{@selectionScope}}\n      @selectionKey={{this.selectionKey}}\n      @selectionAriaLabelSuffix={{@selectionAriaLabelSuffix}}\n      @sortBySelectedOrder={{@sortBySelectedOrder}}\n      @didInsertCheckbox={{@didInsertCheckbox}}\n      @willDestroy={{@willDestroy}}\n      @onClickSortBySelected={{@onClickSortBySelected}}\n      @onSelectionChange={{@onSelectionChange}}\n    />\n  {{/if}}\n\n  {{yield}}\n</div>");

class HdsAdvancedTableTr extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "rowId", guidFor(this));
  }
  get selectionKey() {
    if (this.args.isSelectable && this.args.selectionScope === 'row') {
      assert(`@selectionKey must be defined on Table::Tr or B.Tr when @isSelectable is true`, this.args.selectionKey);
      return this.args.selectionKey;
    }
    return undefined;
  }
  get classNames() {
    const classes = ['hds-advanced-table__tr'];
    const {
      depth
    } = this.args;
    if (depth) {
      classes.push(`hds-advanced-table__tr--depth-${depth}`);
      if (depth % 2 === 0) {
        classes.push(`hds-advanced-table__tr--depth-even`);
      } else {
        classes.push(`hds-advanced-table__tr--depth-odd`);
      }
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableTr);

export { HdsAdvancedTableTr as default };
//# sourceMappingURL=tr.js.map
