import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-81503waH.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { HdsTableHorizontalAlignmentValues, HdsTableThSortOrderLabelValues, HdsTableThSortOrderValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<th\n  class={{this.classNames}}\n  aria-sort={{this.ariaSort}}\n  {{style width=@width minWidth=@width}}\n  ...attributes\n  scope=\"col\"\n>\n  <div class=\"hds-table__th-content\">\n    <span id={{this._labelId}} class=\"hds-typography-body-200 hds-font-weight-semibold\">{{yield}}</span>\n    {{#if @tooltip}}\n      <Hds::Table::ThButtonTooltip @tooltip={{@tooltip}} @labelId={{this._labelId}} />\n    {{/if}}\n    <Hds::Table::ThButtonSort @sortOrder={{@sortOrder}} @onClick={{@onClickSort}} @labelId={{this._labelId}} />\n  </div>\n</th>");

const ALIGNMENTS = Object.values(HdsTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;
class HdsTableThSort extends Component {
  constructor(...args) {
    super(...args);
    /**
     * Generates a unique ID for the <span> element ("label")
     *
     * @param _labelId
     */
    _defineProperty(this, "_labelId", guidFor(this));
  }
  /**
   * @param ariaSort
   * @type {HdsTableThSortOrderLabels}
   * @private
   * @default none
   * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
   */
  get ariaSort() {
    switch (this.args.sortOrder) {
      case HdsTableThSortOrderValues.Asc:
        return HdsTableThSortOrderLabelValues.Asc;
      case HdsTableThSortOrderValues.Desc:
        return HdsTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsTableThSortOrderLabelValues.None;
    }
  }

  /**
   * @param align
   * @type {HdsTableHorizontalAlignment}
   * @default left
   * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
   */
  get align() {
    const {
      align = DEFAULT_ALIGN
    } = this.args;
    assert(`@align for "Hds::Table" must be one of the following: ${ALIGNMENTS.join(', ')}; received: ${align}`, ALIGNMENTS.includes(align));
    return align;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-table__th', 'hds-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__th--align-${this.align}`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTableThSort);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsTableThSort as default };
//# sourceMappingURL=th-sort.js.map
