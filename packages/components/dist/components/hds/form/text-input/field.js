import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import '../character-count/index.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Form::Field\n  @layout=\"vertical\"\n  @extraAriaDescribedBy={{@extraAriaDescribedBy}}\n  @isRequired={{@isRequired}}\n  @isOptional={{@isOptional}}\n  @id={{@id}}\n  as |F|\n>\n  {{! Notice: the order of the elements is not relevant here, because is controlled at \"Hds::Form::Field\" component level }}\n  {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}\n  {{#if F.CharacterCount}}\n    {{yield (hash CharacterCount=(component (ensure-safe-component F.CharacterCount) value=@value))}}\n  {{/if}}\n  <F.Control>\n    <div class=\"hds-form-text-input__wrapper\" {{style width=@width}}>\n      <Hds::Form::TextInput::Base\n        @type={{this.type}}\n        @value={{@value}}\n        @isInvalid={{@isInvalid}}\n        @isLoading={{@isLoading}}\n        @hasVisibilityToggle={{this.showVisibilityToggle}}\n        required={{@isRequired}}\n        ...attributes\n        id={{F.id}}\n        aria-describedby={{F.ariaDescribedBy}}\n      />\n      {{#if this.showVisibilityToggle}}\n        <Hds::Form::VisibilityToggle\n          @isVisible={{this._isPasswordMasked}}\n          @ariaLabel={{this.visibilityToggleAriaLabel}}\n          @ariaMessageText={{this.visibilityToggleAriaMessageText}}\n          aria-controls={{F.id}}\n          class=\"hds-form-text-input__visibility-toggle\"\n          {{on \"click\" this.onClickTogglePasswordReadability}}\n        />\n      {{/if}}\n    </div>\n  </F.Control>\n</Hds::Form::Field>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormTextInputField extends Component {
  static {
    g(this.prototype, "_isPasswordMasked", [tracked], function () {
      return true;
    });
  }
  #_isPasswordMasked = (i(this, "_isPasswordMasked"), void 0);
  static {
    g(this.prototype, "type", [tracked]);
  }
  #type = (i(this, "type"), void 0);
  constructor(owner, args) {
    super(owner, args);
    this.type = this.args.type ?? 'text';
  }
  get hasVisibilityToggle() {
    return this.args.hasVisibilityToggle ?? true;
  }
  get showVisibilityToggle() {
    return this.args.type === 'password' && this.hasVisibilityToggle;
  }
  get visibilityToggleAriaLabel() {
    if (this.args.visibilityToggleAriaLabel) {
      return this.args.visibilityToggleAriaLabel;
    } else if (this._isPasswordMasked) {
      return 'Show password';
    } else {
      return 'Hide password';
    }
  }
  get visibilityToggleAriaMessageText() {
    if (this.args.visibilityToggleAriaMessageText) {
      return this.args.visibilityToggleAriaMessageText;
    } else if (this._isPasswordMasked) {
      return 'Password is hidden';
    } else {
      return 'Password is visible';
    }
  }
  onClickTogglePasswordReadability() {
    this._isPasswordMasked = !this._isPasswordMasked;
    this.type = this._isPasswordMasked ? 'password' : 'text';
  }
  static {
    n(this.prototype, "onClickTogglePasswordReadability", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsFormTextInputField);

export { HdsFormTextInputField as default };
//# sourceMappingURL=field.js.map
