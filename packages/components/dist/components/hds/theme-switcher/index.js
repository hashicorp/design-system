import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-DSLVWx63.js';
import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import '../../../services/hds-theming.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Form::Select::Base\n  {{on \"change\" this._onChangePageTheme}}\n  class=\"hds-theme-switcher-control\"\n  as |C|\n>\n  <C.Options>\n    <option value=\"none\" selected={{eq this._selectedTheme \"none\"}}>None</option>\n    <option value=\"auto\" selected={{eq this._selectedTheme \"auto\"}}>System</option>\n    <option value=\"light\" selected={{eq this._selectedTheme \"light\"}}>Light</option>\n    <option value=\"dark\" selected={{eq this._selectedTheme \"dark\"}}>Dark</option>\n  </C.Options>\n</Hds::Form::Select::Base>\n");

var _class, _descriptor;
let HdsThemeSwitcher = (_class = class HdsThemeSwitcher extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "hdsTheming", _descriptor, this);
    _defineProperty(this, "_selectedTheme", void 0);
    this._selectedTheme = this.hdsTheming.getTheme() || undefined;
  }
  _onChangePageTheme(event) {
    const select = event.target;

    // this._selectedTheme = select.value === 'none' ? undefined : select.value;
    if (select.value === 'none') {
      this._selectedTheme = undefined;
    } else if (select.value === 'auto' || select.value === 'light' || select.value === 'dark') {
      this._selectedTheme = select.value;
    }

    // we set the theme in the global service
    this.hdsTheming.setTheme(this._selectedTheme);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "hdsTheming", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "_onChangePageTheme", [action], Object.getOwnPropertyDescriptor(_class.prototype, "_onChangePageTheme"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsThemeSwitcher);

export { HdsThemeSwitcher as default };
//# sourceMappingURL=index.js.map
