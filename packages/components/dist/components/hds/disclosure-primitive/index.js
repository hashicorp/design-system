import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-disclosure-primitive\" ...attributes>\n  <div class=\"hds-disclosure-primitive__toggle\">\n    {{yield (hash onClickToggle=this.onClickToggle isOpen=this.isOpen) to=\"toggle\"}}\n  </div>\n  {{#if this.isOpen}}\n    <div class=\"hds-disclosure-primitive__content\">\n      {{yield (hash close=this.close) to=\"content\"}}\n    </div>\n  {{/if}}\n</div>");

var _class, _descriptor;
let HdsDisclosurePrimitiveComponent = (_class = class HdsDisclosurePrimitiveComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isOpen", _descriptor, this);
  }
  onClickToggle() {
    this.isOpen = !this.isOpen;
  }
  close() {
    // we schedule this afterRender to avoid an error in tests caused by updating `isOpen` multiple times in the same computation
    schedule('afterRender', () => {
      this.isOpen = false;
      // we call the "onClose" callback if it exists (and is a function)
      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }
    });
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isOpen", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.isOpen ?? false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onClickToggle", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClickToggle"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "close", [action], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsDisclosurePrimitiveComponent);

export { HdsDisclosurePrimitiveComponent as default };
//# sourceMappingURL=index.js.map
