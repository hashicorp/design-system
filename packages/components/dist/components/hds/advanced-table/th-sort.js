import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { HdsAdvancedTableHorizontalAlignmentValues, HdsAdvancedTableThSortOrderLabelValues, HdsAdvancedTableThSortOrderValues } from './types.js';
import { didInsertGridCell, handleGridCellKeyPress } from './helpers.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  aria-sort={{this.ariaSort}}\n  ...attributes\n  scope=\"col\"\n  role=\"columnheader\"\n  aria-rowspan={{@rowspan}}\n  aria-colspan={{@colspan}}\n  {{did-insert this.didInsert}}\n>\n  <div class=\"hds-advanced-table__th-content\">\n    <span id={{this.labelId}} class=\"hds-typography-body-200 hds-font-weight-semibold\">{{yield}}</span>\n    {{#if @tooltip}}\n      <Hds::AdvancedTable::ThButtonTooltip @tooltip={{@tooltip}} @labelId={{this.labelId}} />\n    {{/if}}\n    <Hds::AdvancedTable::ThButtonSort @sortOrder={{@sortOrder}} @onClick={{@onClickSort}} @labelId={{this.labelId}} />\n  </div>\n</div>");

var _class;
const ALIGNMENTS = Object.values(HdsAdvancedTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
let HdsAdvancedTableThSort = (_class = class HdsAdvancedTableThSort extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "labelId", guidFor(this));
  }
  didInsert(element) {
    didInsertGridCell(element);
    element.addEventListener('keydown', handleGridCellKeyPress);
  }

  /**
   * @param ariaSort
   * @type {HdsAdvancedTableThSortOrderLabels}
   * @private
   * @default none
   * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
   */
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
  get classNames() {
    const classes = ['hds-advanced-table__th', 'hds-advanced-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__th--align-${this.align}`);
    }
    return classes.join(' ');
  }
}, (_applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsAdvancedTableThSort);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsAdvancedTableThSort as default };
//# sourceMappingURL=th-sort.js.map
