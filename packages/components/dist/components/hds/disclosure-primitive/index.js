import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-C_TsMG3M.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-disclosure-primitive\" {{did-update this.onStateChange @isOpen}} ...attributes>\n  <div class=\"hds-disclosure-primitive__toggle\">\n    {{yield (hash onClickToggle=this.onClickToggle isOpen=this.isOpen contentId=this._contentId) to=\"toggle\"}}\n  </div>\n  <div class=\"hds-disclosure-primitive__content\" id={{this._contentId}}>\n    {{#if this.isOpen}}\n      {{yield (hash close=this.close) to=\"content\"}}\n    {{/if}}\n  </div>\n</div>");

var _class, _descriptor, _descriptor2;
let HdsDisclosurePrimitive = (_class = class HdsDisclosurePrimitive extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "_isOpen", _descriptor, this);
    _initializerDefineProperty(this, "_isControlled", _descriptor2, this);
    _defineProperty(this, "_contentId", 'content-' + guidFor(this));
  }
  get isOpen() {
    if (this._isControlled) {
      // if the state is controlled from outside, the argument overrides the internal state
      return this.args.isOpen ?? this._isOpen;
    } else {
      // if the state changes internally, the internal state overrides the argument
      return this._isOpen;
    }
  }
  set isOpen(value) {
    this._isOpen = value || false;
  }
  onClickToggle() {
    this.isOpen = !this.isOpen;
    this._isControlled = false;
    // we call the "onClickToggle" callback if it exists and it's a function
    if (this.args.onClickToggle && typeof this.args.onClickToggle === 'function') {
      this.args.onClickToggle(this.isOpen);
    }
  }
  onStateChange() {
    if (this.args.isOpen !== undefined) {
      this.isOpen = this.args.isOpen;
    }
    this._isControlled = true;
  }
  close() {
    // we schedule this afterRender to avoid an error in tests caused by updating `isOpen` multiple times in the same computation
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this.isOpen = false;
      // we call the "onClose" callback if it exists (and is a function)
      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }
    });
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "_isOpen", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_isControlled", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.isOpen !== undefined;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onClickToggle", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClickToggle"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onStateChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onStateChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "close", [action], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsDisclosurePrimitive);

export { HdsDisclosurePrimitive as default };
//# sourceMappingURL=index.js.map
