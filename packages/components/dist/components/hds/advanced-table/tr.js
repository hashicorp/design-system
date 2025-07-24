import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class={{this.classNames}} role=\"row\" ...attributes>\n  {{#if @isSelectable}}\n    <Hds::AdvancedTable::ThSelectable\n      role={{if (eq @selectionScope \"row\") \"gridcell\" \"columnheader\"}}\n      @isSelected={{@isSelected}}\n      @selectionScope={{@selectionScope}}\n      @selectionKey={{this.selectionKey}}\n      @selectionAriaLabelSuffix={{@selectionAriaLabelSuffix}}\n      @sortBySelectedOrder={{@sortBySelectedOrder}}\n      @didInsert={{@didInsert}}\n      @willDestroy={{@willDestroy}}\n      @onClickSortBySelected={{@onClickSortBySelected}}\n      @onSelectionChange={{@onSelectionChange}}\n      @isStickyColumn={{@hasStickyColumn}}\n      @isStickyColumnPinned={{@isStickyColumnPinned}}\n    />\n  {{/if}}\n\n  {{yield}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAdvancedTableTr extends Component {
  get selectionKey() {
    if (this.args.isSelectable && this.args.selectionScope === 'row') {
      assert(`@selectionKey must be defined on Table::Tr or B.Tr when @isSelectable is true`, this.args.selectionKey);
      return this.args.selectionKey;
    }
    return undefined;
  }
  get classNames() {
    const {
      depth,
      isLastRow,
      isParentRow,
      displayRow
    } = this.args;
    const classes = ['hds-advanced-table__tr'];
    if (depth && depth > 0) {
      classes.push('hds-advanced-table__tr--nested');
    }
    if (isParentRow) {
      classes.push('hds-advanced-table__tr--parent-row');
    }
    if (displayRow === false) {
      classes.push('hds-advanced-table__tr--hidden');
    }
    if (isLastRow) {
      classes.push('hds-advanced-table__tr--last-row');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableTr);

export { HdsAdvancedTableTr as default };
//# sourceMappingURL=tr.js.map
