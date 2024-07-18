import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} {{style width=@width}}>\n  {{#if @isMultiline}}\n    <Hds::Form::Textarea::Base\n      class=\"hds-form-masked-input__control\"\n      @value={{@value}}\n      @isInvalid={{@isInvalid}}\n      @height={{@height}}\n      id={{this.id}}\n      ...attributes\n    />\n  {{else}}\n    <Hds::Form::TextInput::Base\n      class=\"hds-form-masked-input__control\"\n      @value={{@value}}\n      @isInvalid={{@isInvalid}}\n      id={{this.id}}\n      ...attributes\n    />\n  {{/if}}\n  <Hds::Form::VisibilityToggle\n    @isVisible={{this.isContentMasked}}\n    @ariaLabel={{this.visibilityToggleAriaLabel}}\n    @ariaMessageText={{this.visibilityToggleAriaMessageText}}\n    aria-controls={{this.id}}\n    class=\"hds-form-masked-input__toggle-button\"\n    {{on \"click\" this.onClickToggleMasking}}\n  />\n  {{#if @hasCopyButton}}\n    <Hds::Copy::Button\n      class=\"hds-form-masked-input__copy-button\"\n      @text={{this.copyButtonText}}\n      @isIconOnly={{true}}\n      @targetToCopy=\"#{{this.id}}\"\n    />\n  {{/if}}\n</div>");

var _class, _descriptor;
let HdsFormMaskedInputBaseComponent = (_class = class HdsFormMaskedInputBaseComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isContentMasked", _descriptor, this);
  }
  onClickToggleMasking() {
    this.isContentMasked = !this.isContentMasked;
  }

  /**
   * Calculates the unique ID to assign to the form control
   */
  get id() {
    return getElementId(this);
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Show masked content'
   */
  get visibilityToggleAriaLabel() {
    if (this.args.visibilityToggleAriaLabel) {
      return this.args.visibilityToggleAriaLabel;
    } else if (this.isContentMasked) {
      return 'Show masked content';
    } else {
      return 'Hide masked content';
    }
  }

  /**
   * @param ariaMessageText
   * @type {string}
   * @default 'Input content is now hidden'
   */
  get visibilityToggleAriaMessageText() {
    if (this.args.visibilityToggleAriaMessageText) {
      return this.args.visibilityToggleAriaMessageText;
    } else if (this.isContentMasked) {
      return 'Input content is hidden';
    } else {
      return 'Input content is visible';
    }
  }

  /**
   * @param copyButtonText
   * @type {string}
   * @default 'Copy masked content'
   */
  get copyButtonText() {
    if (this.args.copyButtonText) {
      return this.args.copyButtonText;
    } else {
      return 'Copy masked content';
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-form-masked-input'];
    if (this.isContentMasked) {
      classes.push(`hds-form-masked-input--is-masked`);
    } else {
      classes.push(`hds-form-masked-input--is-not-masked`);
    }
    return classes.join(' ');
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isContentMasked", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.isContentMasked ?? true;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onClickToggleMasking", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClickToggleMasking"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsFormMaskedInputBaseComponent);

export { HdsFormMaskedInputBaseComponent as default };
//# sourceMappingURL=base.js.map
