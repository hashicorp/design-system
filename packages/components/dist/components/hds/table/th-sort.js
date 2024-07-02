import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<th\n  class={{this.classNames}}\n  aria-sort={{this.ariaSort}}\n  {{style width=@width minWidth=@width}}\n  ...attributes\n  scope=\"col\"\n>\n  <div class=\"hds-table__th-content\">\n    <span id={{this.labelId}} class=\"hds-typography-body-200 hds-font-weight-semibold\">{{yield}}</span>\n    {{#if @tooltip}}\n      <Hds::Table::ThButtonTooltip @tooltip={{@tooltip}} @labelId={{this.labelId}} />\n    {{/if}}\n    <Hds::Table::ThButtonSort @sortOrder={{@sortOrder}} @onClick={{@onClickSort}} @labelId={{this.labelId}} />\n  </div>\n</th>");

const ALIGNMENTS = ['left', 'center', 'right'];
const DEFAULT_ALIGN = 'left';
class HdsTableThSortComponent extends Component {
  constructor(...args) {
    super(...args);
    /**
     * Generates a unique ID for the <span> element ("label")
     *
     * @param labelId
     */
    _defineProperty(this, "labelId", guidFor(this));
  }
  /**
   * @param ariaSort
   * @type {string}
   * @private
   * @default none
   * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
   */
  get ariaSort() {
    switch (this.args.sortOrder) {
      case 'asc':
        return 'ascending';
      case 'desc':
        return 'descending';
      default:
        // none is the default per the spec.
        return 'none';
    }
  }

  /**
   * @param align
   * @type {string}
   * @default left
   * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
   */
  get align() {
    let {
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
    let classes = ['hds-table__th', 'hds-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__th--align-${this.align}`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTableThSortComponent);

export { HdsTableThSortComponent as default };
//# sourceMappingURL=th-sort.js.map
