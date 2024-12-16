import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../../../_rollupPluginBabelHelpers-DSLVWx63.js';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::AppSideNav::List::Item>\n  <div\n    class=\"hds-app-side-nav__list-title hds-typography-body-100 hds-font-weight-semibold\"\n    id={{this._titleId}}\n    {{did-insert this.didInsertTitle}}\n    ...attributes\n  >{{~yield~}}</div>\n</Hds::AppSideNav::List::Item>");

var _class;
let HdsAppSideNavListTitle = (_class = class HdsAppSideNavListTitle extends Component {
  constructor(...args) {
    super(...args);
    /*  Generate a unique ID for each Title */
    _defineProperty(this, "_titleId", 'title-' + guidFor(this));
  }
  didInsertTitle(element) {
    const {
      didInsertTitle
    } = this.args;
    if (typeof didInsertTitle === 'function') {
      didInsertTitle(element.id);
    }
  }
}, (_applyDecoratedDescriptor(_class.prototype, "didInsertTitle", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsertTitle"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsAppSideNavListTitle);

export { HdsAppSideNavListTitle as default };
//# sourceMappingURL=title.js.map
