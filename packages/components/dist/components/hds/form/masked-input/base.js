import Component from '@glimmer/component';
import { action } from '@ember/object';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} {{style width=@width}}>\n  {{#if @isMultiline}}\n    <Hds::Form::Textarea::Base\n      class=\"hds-form-masked-input__control\"\n      @value={{@value}}\n      @isInvalid={{@isInvalid}}\n      @height={{@height}}\n      id={{this.id}}\n      ...attributes\n    />\n  {{else}}\n    <Hds::Form::TextInput::Base\n      class=\"hds-form-masked-input__control\"\n      @value={{@value}}\n      @isInvalid={{@isInvalid}}\n      id={{this.id}}\n      ...attributes\n    />\n  {{/if}}\n  <Hds::Form::VisibilityToggle\n    @isVisible={{this.isContentMasked}}\n    @ariaLabel={{this.visibilityToggleAriaLabel}}\n    @ariaMessageText={{this.visibilityToggleAriaMessageText}}\n    aria-controls={{this.id}}\n    class=\"hds-form-masked-input__toggle-button\"\n    {{on \"click\" this.onClickToggleMasking}}\n  />\n  {{#if @hasCopyButton}}\n    <Hds::Copy::Button\n      class=\"hds-form-masked-input__copy-button\"\n      @text={{this.copyButtonText}}\n      @isIconOnly={{true}}\n      @targetToCopy=\"#{{this.id}}\"\n    />\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormMaskedInputBase extends Component {
  static {
    g(this.prototype, "isContentMasked", [tracked]);
  }
  #isContentMasked = (i(this, "isContentMasked"), undefined);
  constructor(owner, args) {
    super(owner, args);
    this.isContentMasked = this.args.isContentMasked ?? true;
  }
  onClickToggleMasking() {
    this.isContentMasked = !this.isContentMasked;
  }
  static {
    n(this.prototype, "onClickToggleMasking", [action]);
  }
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
