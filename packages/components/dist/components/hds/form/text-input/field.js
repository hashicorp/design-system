import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Form::Field\n  @layout=\"vertical\"\n  @extraAriaDescribedBy={{@extraAriaDescribedBy}}\n  @isRequired={{@isRequired}}\n  @isOptional={{@isOptional}}\n  @id={{@id}}\n  as |F|\n>\n  {{! Notice: the order of the elements is not relevant here, because is controlled at \"Hds::Form::Field\" component level }}\n  {{yield\n    (hash\n      Label=F.Label\n      isRequired=F.isRequired\n      isOptional=F.isOptional\n      HelperText=F.HelperText\n      Error=F.Error\n      CharacterCount=(component F.CharacterCount value=@value)\n    )\n  }}\n  <F.Control>\n    <div class=\"hds-form-text-input__wrapper\" {{style width=@width}}>\n      <Hds::Form::TextInput::Base\n        @type={{this.type}}\n        @value={{@value}}\n        @isInvalid={{@isInvalid}}\n        @isLoading={{@isLoading}}\n        @hasVisibilityToggle={{this.showVisibilityToggle}}\n        required={{@isRequired}}\n        ...attributes\n        id={{F.id}}\n        aria-describedby={{F.ariaDescribedBy}}\n      />\n      {{#if this.showVisibilityToggle}}\n        <Hds::Form::VisibilityToggle\n          @isVisible={{this.isPasswordMasked}}\n          @ariaLabel={{this.visibilityToggleAriaLabel}}\n          @ariaMessageText={{this.visibilityToggleAriaMessageText}}\n          aria-controls={{F.id}}\n          class=\"hds-form-text-input__visibility-toggle\"\n          {{on \"click\" this.onClickTogglePasswordReadability}}\n        />\n      {{/if}}\n    </div>\n  </F.Control>\n</Hds::Form::Field>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormTextInputFieldComponent extends Component {
  static {
    g(this.prototype, "isPasswordMasked", [tracked], function () {
      return true;
    });
  }
  #isPasswordMasked = (i(this, "isPasswordMasked"), void 0);
  static {
    g(this.prototype, "hasVisibilityToggle", [tracked], function () {
      return this.args.hasVisibilityToggle ?? true;
    });
  }
  #hasVisibilityToggle = (i(this, "hasVisibilityToggle"), void 0);
  static {
    g(this.prototype, "type", [tracked], function () {
      return this.args.type ?? 'text';
    });
  }
  #type = (i(this, "type"), void 0);
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
  static {
    n(this.prototype, "onClickTogglePasswordReadability", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsFormTextInputFieldComponent);

export { HdsFormTextInputFieldComponent as default };
//# sourceMappingURL=field.js.map
