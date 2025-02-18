import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-C_TsMG3M.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div\n  id={{this._id}}\n  class={{this.classNames}}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap isActive=this._isFullScreen}}\n  {{this._handleEscape}}\n  ...attributes\n>\n  {{! header }}\n  {{#if (or this.hasActions (has-block))}}\n    <div class=\"hds-code-editor__header\">\n      <div class=\"hds-code-editor__header-content\">\n        {{yield\n          (hash\n            Title=(component \"hds/code-editor/title\" editorId=this._id onInsert=this.registerTitleElement)\n            Description=(component\n              \"hds/code-editor/description\" editorId=this._id onInsert=this.registerDescriptionElement\n            )\n            Generic=(component \"hds/code-editor/generic\")\n          )\n        }}\n      </div>\n\n      {{#if this.hasActions}}\n        <div class=\"hds-code-editor__header-actions\">\n          {{#if @hasCopyButton}}\n            <Hds::Copy::Button\n              class=\"hds-code-editor__button hds-code-editor__copy-button\"\n              @isIconOnly={{true}}\n              @size=\"small\"\n              @text={{this.copyButtonText}}\n              @textToCopy={{this._value}}\n            />\n          {{/if}}\n          {{#if @hasFullScreenButton}}\n            <Hds::CodeEditor::FullScreenButton\n              @isFullScreen={{this._isFullScreen}}\n              @onToggleFullScreen={{this.toggleFullScreen}}\n            />\n          {{/if}}\n        </div>\n      {{/if}}\n    </div>\n  {{/if}}\n\n  {{! editor }}\n  <div\n    class=\"hds-code-editor__editor\"\n    {{hds-code-editor\n      ariaDescribedBy=this.ariaDescribedBy\n      ariaLabel=@ariaLabel\n      ariaLabelledBy=this.ariaLabelledBy\n      value=@value\n      language=@language\n      onBlur=@onBlur\n      onInput=this.onInput\n      onSetup=this.onSetup\n    }}\n  />\n\n  {{! loader }}\n  {{#unless this._isSetupComplete}}\n    <div class=\"hds-code-editor__loader\" aria-live=\"polite\" role=\"status\">\n      <Hds::Icon @name=\"loading\" @size=\"24\" />\n      <span class=\"sr-only\">Loading</span>\n    </div>\n  {{/unless}}\n</div>");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
let HdsCodeEditor = (_class = class HdsCodeEditor extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "_isFullScreen", _descriptor, this);
    _initializerDefineProperty(this, "_isSetupComplete", _descriptor2, this);
    _initializerDefineProperty(this, "_value", _descriptor3, this);
    _initializerDefineProperty(this, "_titleId", _descriptor4, this);
    _initializerDefineProperty(this, "_descriptionId", _descriptor5, this);
    _defineProperty(this, "_id", guidFor(this));
    _defineProperty(this, "_handleEscape", modifier(() => {
      const handleKeyDown = event => {
        if (event.key !== 'Escape' || !this._isFullScreen) {
          return;
        }
        this.toggleFullScreen();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }));
    if (args.value) {
      this._value = args.value;
    }
  }
  get ariaLabelledBy() {
    if (this.args.ariaLabel !== undefined) {
      return;
    }
    return this.args.ariaLabelledBy ?? this._titleId;
  }
  get ariaDescribedBy() {
    return this.args.ariaDescribedBy ?? this._descriptionId;
  }
  get hasActions() {
    return (this.args.hasCopyButton || this.args.hasFullScreenButton) ?? false;
  }
  get isStandalone() {
    return this.args.isStandalone ?? true;
  }
  get classNames() {
    // Currently there is only one theme so the class name is hard-coded.
    // In the future, additional themes such as a "light" theme could be added.
    const classes = ['hds-code-editor', 'hds-code-editor--theme-dark'];
    if (this._isFullScreen) {
      classes.push('hds-code-editor--is-full-screen');
    }
    if (this.isStandalone) {
      classes.push('hds-code-editor--is-standalone');
    }
    return classes.join(' ');
  }
  get copyButtonText() {
    return this.args.copyButtonText ? this.args.copyButtonText : 'Copy';
  }
  registerTitleElement(element) {
    this._titleId = element.id;
  }
  registerDescriptionElement(element) {
    this._descriptionId = element.id;
  }
  toggleFullScreen() {
    this._isFullScreen = !this._isFullScreen;
  }
  onInput(newValue) {
    this._value = newValue;
    this.args.onInput?.(newValue);
  }
  onKeyDown(event) {
    if (event.key === 'Escape' && this._isFullScreen) {
      this.toggleFullScreen();
    }
  }
  onSetup(editorView) {
    this._isSetupComplete = true;
    this.args.onSetup?.(editorView);
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "_isFullScreen", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_isSetupComplete", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_value", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "_titleId", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "_descriptionId", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "registerTitleElement", [action], Object.getOwnPropertyDescriptor(_class.prototype, "registerTitleElement"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "registerDescriptionElement", [action], Object.getOwnPropertyDescriptor(_class.prototype, "registerDescriptionElement"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleFullScreen", [action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleFullScreen"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onInput", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onInput"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onKeyDown", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onKeyDown"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onSetup", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onSetup"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsCodeEditor);

export { HdsCodeEditor as default };
//# sourceMappingURL=index.js.map
