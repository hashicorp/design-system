import { _ as _applyDecoratedDescriptor } from '../../../_rollupPluginBabelHelpers-81503waH.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Button\n  class=\"hds-app-header__menu-button\"\n  @text=\"Menu\"\n  @icon={{this.icon}}\n  @iconPosition=\"trailing\"\n  {{on \"click\" this.onClick}}\n  aria-controls={{@menuContentId}}\n  aria-expanded={{if @isOpen \"true\" \"false\"}}\n  ...attributes\n/>");

var _class;
let HdsAppHeaderMenuButton = (_class = class HdsAppHeaderMenuButton extends Component {
  get icon() {
    return this.args.isOpen ? 'x' : 'menu';
  }
  onClick() {
    const {
      onClickToggle
    } = this.args;
    if (typeof onClickToggle === 'function') {
      onClickToggle();
    }
  }
}, _applyDecoratedDescriptor(_class.prototype, "onClick", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsAppHeaderMenuButton);

export { HdsAppHeaderMenuButton as default };
//# sourceMappingURL=menu-button.js.map
