import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import '../character-count/index.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Form::Field\n  @layout=\"vertical\"\n  @extraAriaDescribedBy={{@extraAriaDescribedBy}}\n  @isRequired={{@isRequired}}\n  @isOptional={{@isOptional}}\n  @id={{@id}}\n  as |F|\n>\n  {{! Notice: the order of the elements is not relevant here, because is controlled at \"Hds::Form::Field\" component level }}\n  {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}\n  {{#if F.CharacterCount}}\n    {{yield (hash CharacterCount=(component F.CharacterCount value=@value))}}\n  {{/if}}\n  <F.Control>\n    <div class=\"hds-form-text-input__wrapper\" {{style width=@width}}>\n      <Hds::Form::TextInput::Base\n        @type={{this.type}}\n        @value={{@value}}\n        @isInvalid={{@isInvalid}}\n        @isLoading={{@isLoading}}\n        @hasVisibilityToggle={{this.showVisibilityToggle}}\n        required={{@isRequired}}\n        ...attributes\n        id={{F.id}}\n        aria-describedby={{F.ariaDescribedBy}}\n      />\n      {{#if this.showVisibilityToggle}}\n        <Hds::Form::VisibilityToggle\n          @isVisible={{this.isPasswordMasked}}\n          @ariaLabel={{this.visibilityToggleAriaLabel}}\n          @ariaMessageText={{this.visibilityToggleAriaMessageText}}\n          aria-controls={{F.id}}\n          class=\"hds-form-text-input__visibility-toggle\"\n          {{on \"click\" this.onClickTogglePasswordReadability}}\n        />\n      {{/if}}\n    </div>\n  </F.Control>\n</Hds::Form::Field>");

var _class, _descriptor, _descriptor2, _descriptor3;
let HdsFormTextInputFieldComponent = (_class = class HdsFormTextInputFieldComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isPasswordMasked", _descriptor, this);
    _initializerDefineProperty(this, "hasVisibilityToggle", _descriptor2, this);
    _initializerDefineProperty(this, "type", _descriptor3, this);
  }
  /**
   * @param showVisibilityToggle
   * @type {boolean}
   * @default false
   */
  get showVisibilityToggle() {
    return this.args.type === 'password' && this.hasVisibilityToggle;
  }

  /**
   * @param visibilityToggleAriaLabel
   * @type {string}
   * @default 'Show password'
   */
  get visibilityToggleAriaLabel() {
    if (this.args.visibilityToggleAriaLabel) {
      return this.args.visibilityToggleAriaLabel;
    } else if (this.isPasswordMasked) {
      return 'Show password';
    } else {
      return 'Hide password';
    }
  }

  /**
   * @param visibilityToggleAriaMessageText
   * @type {string}
   * @default 'Password is now hidden'
   */
  get visibilityToggleAriaMessageText() {
    if (this.args.visibilityToggleAriaMessageText) {
      return this.args.visibilityToggleAriaMessageText;
    } else if (this.isPasswordMasked) {
      return 'Password is hidden';
    } else {
      return 'Password is visible';
    }
  }
  onClickTogglePasswordReadability() {
    this.isPasswordMasked = !this.isPasswordMasked;
    this.type = this.isPasswordMasked ? 'password' : 'text';
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isPasswordMasked", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "hasVisibilityToggle", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.hasVisibilityToggle ?? true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "type", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.type ?? 'text';
  }
}), _applyDecoratedDescriptor(_class.prototype, "onClickTogglePasswordReadability", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClickTogglePasswordReadability"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsFormTextInputFieldComponent);

export { HdsFormTextInputFieldComponent as default };
//# sourceMappingURL=field.js.map
