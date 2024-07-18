import { _ as _applyDecoratedDescriptor } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Interactive\n  class={{this.classNames}}\n  @route={{@route}}\n  @query={{hds-link-to-query @query}}\n  @models={{hds-link-to-models @model @models}}\n  @replace={{@replace}}\n  {{on \"click\" this.onClick}}\n  ...attributes\n  aria-current={{if @isSelected \"page\" null}}\n>\n  <Hds::Text::Body @tag=\"span\" @size=\"100\" @weight=\"medium\"><span class=\"sr-only\">page\n    </span>{{this.page}}</Hds::Text::Body>\n</Hds::Interactive>");

var _class;
let HdsPaginationControlNumberComponent = (_class = class HdsPaginationControlNumberComponent extends Component {
  get page() {
    let {
      page
    } = this.args;
    assert('@page for "Pagination::Nav::Number" must have a valid value', page !== undefined);
    return page;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-pagination-nav__control', 'hds-pagination-nav__number'];
    if (this.args.isSelected) {
      classes.push(`hds-pagination-nav__number--is-selected`);
    }
    return classes.join(' ');
  }
  onClick() {
    let {
      onClick
    } = this.args;
    if (typeof onClick === 'function') {
      onClick(this.args.page);
    }
  }
}, (_applyDecoratedDescriptor(_class.prototype, "onClick", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsPaginationControlNumberComponent);

export { HdsPaginationControlNumberComponent as default };
//# sourceMappingURL=number.js.map
