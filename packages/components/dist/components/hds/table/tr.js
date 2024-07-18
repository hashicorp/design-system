import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<tr class=\"hds-table__tr\" ...attributes>\n  {{#if @isSelectable}}\n    <Hds::Table::ThSelectable\n      @isSelected={{@isSelected}}\n      @selectionScope={{@selectionScope}}\n      @selectionKey={{this.selectionKey}}\n      @selectionAriaLabelSuffix={{@selectionAriaLabelSuffix}}\n      @didInsert={{@didInsert}}\n      @willDestroy={{@willDestroy}}\n      @onSelectionChange={{@onSelectionChange}}\n    />\n  {{/if}}\n\n  {{yield}}\n</tr>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsTableTrComponent extends Component {
  /**
   * @param selectionKey
   * @type {string}
   * @default undefined
   */
  get selectionKey() {
    if (this.args.isSelectable && this.args.selectionScope === 'row') {
      assert(`@selectionKey must be defined on Table::Tr or B.Tr when @isSelectable is true`, this.args.selectionKey);
      return this.args.selectionKey;
    }
    return undefined;
  }
}
setComponentTemplate(TEMPLATE, HdsTableTrComponent);

export { HdsTableTrComponent as default };
//# sourceMappingURL=tr.js.map
