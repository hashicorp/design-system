import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<nav class=\"hds-side-nav__list-wrapper\" aria-labelledby=\"hds-side-nav-header\" ...attributes>\n  {{yield (hash ExtraBefore=(component \"hds/yield\"))}}\n  <ul class=\"hds-side-nav__list\" role=\"list\" aria-labelledby={{this.titleIds}}>\n    {{yield\n      (hash\n        Item=(component \"hds/side-nav/list/item\")\n        BackLink=(component \"hds/side-nav/list/back-link\")\n        Title=(component \"hds/side-nav/list/title\" didInsertTitle=this.didInsertTitle)\n        Link=(component \"hds/side-nav/list/link\")\n      )\n    }}\n  </ul>\n  {{yield (hash ExtraAfter=(component \"hds/yield\"))}}\n</nav>");

var _class, _descriptor;
let HdsSideNavList = (_class = class HdsSideNavList extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "_titleIds", _descriptor, this);
  }
  get titleIds() {
    return this._titleIds.join(' ');
  }
  didInsertTitle(titleId) {
    this._titleIds = [...this._titleIds, titleId];
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_titleIds", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, "didInsertTitle", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsertTitle"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsSideNavList);

export { HdsSideNavList as default };
//# sourceMappingURL=index.js.map
