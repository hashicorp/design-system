import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} {{style width=@width}} {{this._manageState}}>\n  {{#if @isMultiline}}\n    <Hds::Form::Textarea::Base\n      class=\"hds-form-masked-input__control\"\n      @value={{@value}}\n      @isInvalid={{@isInvalid}}\n      @height={{@height}}\n      id={{this.id}}\n      aria-describedby={{@ariaDescribedBy}}\n      ...attributes\n    />\n  {{else}}\n    <Hds::Form::TextInput::Base\n      class=\"hds-form-masked-input__control\"\n      @value={{@value}}\n      @isInvalid={{@isInvalid}}\n      id={{this.id}}\n      aria-describedby={{@ariaDescribedBy}}\n      ...attributes\n    />\n  {{/if}}\n  <Hds::Form::VisibilityToggle\n    @isVisible={{this.isContentMasked}}\n    @ariaLabel={{this.visibilityToggleAriaLabel}}\n    @ariaMessageText={{this.visibilityToggleAriaMessageText}}\n    aria-controls={{this.id}}\n    class=\"hds-form-masked-input__toggle-button\"\n    {{on \"click\" this.onClickToggleMasking}}\n  />\n  {{#if @hasCopyButton}}\n    <Hds::Copy::Button\n      class=\"hds-form-masked-input__copy-button\"\n      @text={{this.copyButtonText}}\n      @isIconOnly={{true}}\n      @targetToCopy=\"#{{this.id}}\"\n    />\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormMaskedInputBase extends Component {
  static {
    g(this.prototype, "_isContentMasked", [tracked], function () {
      return true;
    });
  }
  #_isContentMasked = (i(this, "_isContentMasked"), void 0);
  static {
    g(this.prototype, "_isControlled", [tracked], function () {
      return this.args.isContentMasked !== undefined;
    });
  }
  #_isControlled = (i(this, "_isControlled"), void 0);
  get isContentMasked() {
    if (this._isControlled) {
      // if the state is controlled from outside, the argument overrides the internal state
      return this.args.isContentMasked ?? this._isContentMasked;
    } else {
      // if the state changes internally, the internal state overrides the argument
      return this._isContentMasked;
    }
  }
  set isContentMasked(value) {
    this._isContentMasked = value || false;
  }
  onClickToggleMasking() {
    this.isContentMasked = !this.isContentMasked;
    this._isControlled = false;
  }
  static {
    n(this.prototype, "onClickToggleMasking", [action]);
  }
  _manageState = modifier(() => {
    if (this.args.isContentMasked !== undefined) {
      this.isContentMasked = this.args.isContentMasked;
    }
    this._isControlled = true;
    return () => {};
  });
  get id() {
    return getElementId(this);
  }
  get visibilityToggleAriaLabel() {
    if (this.args.visibilityToggleAriaLabel) {
      return this.args.visibilityToggleAriaLabel;
    } else if (this.isContentMasked) {
      return 'Show masked content';
    } else {
      return 'Hide masked content';
    }
  }
  get visibilityToggleAriaMessageText() {
    if (this.args.visibilityToggleAriaMessageText) {
      return this.args.visibilityToggleAriaMessageText;
    } else if (this.isContentMasked) {
      return 'Input content is hidden';
    } else {
      return 'Input content is visible';
    }
  }
  get copyButtonText() {
    if (this.args.copyButtonText) {
      return this.args.copyButtonText;
    } else {
      return 'Copy masked content';
    }
  }
  get classNames() {
    const classes = ['hds-form-masked-input'];
    if (this.isContentMasked) {
      classes.push(`hds-form-masked-input--is-masked`);
    } else {
      classes.push(`hds-form-masked-input--is-not-masked`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormMaskedInputBase);

export { HdsFormMaskedInputBase as default };
//# sourceMappingURL=base.js.map
