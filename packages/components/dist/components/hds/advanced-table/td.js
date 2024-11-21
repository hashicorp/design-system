import { _ as _applyDecoratedDescriptor } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.js';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  role=\"gridcell\"\n  aria-rowspan={{@rowspan}}\n  aria-colspan={{@colspan}}\n  {{did-insert this.didInsert}}\n  {{style grid-row=this.rowspan grid-column=this.colspan}}\n  ...attributes\n>\n  {{yield}}\n</div>");

var _class;
const ALIGNMENTS = Object.values(HdsAdvancedTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
let HdsAdvancedTableTd = (_class = class HdsAdvancedTableTd extends Component {
  didInsert(element) {
    didInsertGridCell(element);
    element.addEventListener('keydown', handleGridCellKeyPress);
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
  get align() {
    const {
      align = DEFAULT_ALIGN
    } = this.args;
    assert(`@align for "Hds::AdvancedTable::Td" must be one of the following: ${ALIGNMENTS.join(', ')}; received: ${align}`, ALIGNMENTS.includes(align));
    return align;
  }
  get classNames() {
    const classes = ['hds-advanced-table__td', 'hds-typography-body-200', 'hds-font-weight-regular'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__td--align-${this.align}`);
    }
    return classes.join(' ');
  }
}, (_applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsAdvancedTableTd);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsAdvancedTableTd as default };
//# sourceMappingURL=td.js.map
