import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{!\n  THIS COMPONENT IS NOW DEPRECATED\n}}\n{{! template-lint-disable no-invalid-interactive }}\n<div\n  class=\"hds-menu-primitive\"\n  ...attributes\n  {{did-insert this.didInsert}}\n  {{on \"focusout\" this.onFocusOut}}\n  {{on \"keyup\" this.onKeyUp}}\n>\n  <div class=\"hds-menu-primitive__toggle\" tabindex=\"-1\">\n    {{yield (hash onClickToggle=this.onClickToggle isOpen=this.isOpen) to=\"toggle\"}}\n  </div>\n  {{#if this.isOpen}}\n    <div class=\"hds-menu-primitive__content\" tabindex=\"-1\">\n      {{yield (hash close=this.close) to=\"content\"}}\n    </div>\n  {{/if}}\n</div>\n{{! template-lint-enable no-invalid-interactive }}");

var _class, _descriptor, _descriptor2, _descriptor3;
let MenuPrimitive = (_class = class MenuPrimitive extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "isOpen", _descriptor, this);
    // notice: if in the future we need to add a "@isOpen" prop to control the status from outside (eg to have the MenuPrimitive opened on render) just add  "this.args.isOpen" here to initalize the variable
    _initializerDefineProperty(this, "toggleRef", _descriptor2, this);
    _initializerDefineProperty(this, "element", _descriptor3, this);
    deprecate('The `Hds::MenuPrimitive` component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`.', false, {
      id: 'hds.components.menu-primitive',
      until: '5.0.0',
      url: 'https://helios.hashicorp.design/components/menu-primitive?tab=version%20history#460',
      for: '@hashicorp/design-system-components',
      since: {
        enabled: '4.10.0'
      }
    });
  }
  didInsert(element) {
    this.element = element;
  }
  onClickToggle(event) {
    // we store a reference to the DOM node that has the "onClickToggle" event associated with it
    if (!this.toggleRef) {
      this.toggleRef = event.currentTarget;
    }
    this.isOpen = !this.isOpen;
    // we explicitly apply a focus state to the toggle element to overcome a bug in WebKit (see https://github.com/hashicorp/design-system/commit/40cd7f6b3cb15c45f9a1235fafd0fb3ed58e6e62)
    this.toggleRef?.focus();
  }
  onFocusOut(event) {
    // due to inconsistent implementation of relatedTarget across browsers we use the activeElement as a fallback
    // if the related target is not part of the disclosed content we close the disclosed container
    if (!this.element.contains(event.relatedTarget || document.activeElement)) {
      this.close();
    }
  }
  onKeyUp(event) {
    if (event.key === 'Escape') {
      this.close();
      this.toggleRef?.focus();
    }
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
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isOpen", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "toggleRef", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "element", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onClickToggle", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClickToggle"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFocusOut", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onFocusOut"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onKeyUp", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onKeyUp"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "close", [action], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, MenuPrimitive);

export { MenuPrimitive as default };
//# sourceMappingURL=index.js.map
