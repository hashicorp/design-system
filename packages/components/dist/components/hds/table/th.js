import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<th class={{this.classNames}} {{style width=@width minWidth=@width}} ...attributes scope={{(or @scope \"col\")}}>\n  {{#if @isVisuallyHidden}}\n    <span class=\"sr-only\">{{yield}}</span>\n  {{else}}\n    {{#if @tooltip}}\n      <div class=\"hds-table__th-content\">\n        <span id={{this.labelId}} class=\"hds-typography-body-200 hds-font-weight-semibold\">{{yield}}</span>\n        <Hds::Table::ThButtonTooltip @tooltip={{@tooltip}} @labelId={{this.labelId}} />\n      </div>\n    {{else}}\n      <span class=\"hds-typography-body-200 hds-font-weight-semibold\">{{yield}}</span>\n    {{/if}}\n  {{/if}}\n</th>");

const ALIGNMENTS = ['left', 'center', 'right'];
const DEFAULT_ALIGN = 'left';
class HdsTableThComponent extends Component {
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
   * @param align
   * @type {string}
   * @default left
   * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
   */
  get align() {
    let {
      align = DEFAULT_ALIGN
    } = this.args;
    assert(`@align for "Hds::Table::Th" must be one of the following: ${ALIGNMENTS.join(', ')}; received: ${align}`, ALIGNMENTS.includes(align));
    return align;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table__th'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__th--align-${this.align}`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTableThComponent);

export { HdsTableThComponent as default };
//# sourceMappingURL=th.js.map
