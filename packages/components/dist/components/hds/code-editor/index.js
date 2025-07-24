import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div\n  id={{this._id}}\n  class={{this.classNames}}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap isActive=this._isFullScreen}}\n  {{this._handleEscape}}\n  ...attributes\n>\n  {{! header }}\n  {{#if (or this.hasActions (has-block))}}\n    <div class=\"hds-code-editor__header\">\n      <div class=\"hds-code-editor__header-content\">\n        {{yield\n          (hash\n            Title=(component \"hds/code-editor/title\" editorId=this._id onInsert=this.registerTitleElement)\n            Description=(component\n              \"hds/code-editor/description\" editorId=this._id onInsert=this.registerDescriptionElement\n            )\n            Generic=(component \"hds/code-editor/generic\")\n          )\n        }}\n      </div>\n\n      {{#if this.hasActions}}\n        <div class=\"hds-code-editor__header-actions\">\n          {{#if @hasCopyButton}}\n            <Hds::Copy::Button\n              class=\"hds-code-editor__button hds-code-editor__copy-button\"\n              @isIconOnly={{true}}\n              @size=\"small\"\n              @text={{this.copyButtonText}}\n              @textToCopy={{this._value}}\n            />\n          {{/if}}\n          {{#if @hasFullScreenButton}}\n            <Hds::CodeEditor::FullScreenButton\n              @isFullScreen={{this._isFullScreen}}\n              @onToggleFullScreen={{this.toggleFullScreen}}\n            />\n          {{/if}}\n        </div>\n      {{/if}}\n    </div>\n  {{/if}}\n\n  {{! editor }}\n  <div\n    class=\"hds-code-editor__editor\"\n    {{hds-code-editor\n      ariaDescribedBy=this.ariaDescribedBy\n      ariaLabel=@ariaLabel\n      ariaLabelledBy=this.ariaLabelledBy\n      extraKeys=@extraKeys\n      hasLineWrapping=@hasLineWrapping\n      isLintingEnabled=@isLintingEnabled\n      language=@language\n      value=@value\n      onBlur=@onBlur\n      onInput=this.onInput\n      onSetup=this.onSetup\n      onLint=@onLint\n    }}\n  />\n\n  {{! loader }}\n  {{#unless this._isSetupComplete}}\n    <div class=\"hds-code-editor__loader\" aria-live=\"polite\" role=\"status\">\n      <Hds::Icon @name=\"loading\" @size=\"24\" />\n      <span class=\"sr-only\">Loading</span>\n    </div>\n  {{/unless}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsCodeEditor extends Component {
  static {
    g(this.prototype, "_isFullScreen", [tracked], function () {
      return false;
    });
  }
  #_isFullScreen = (i(this, "_isFullScreen"), void 0);
  static {
    g(this.prototype, "_isSetupComplete", [tracked], function () {
      return false;
    });
  }
  #_isSetupComplete = (i(this, "_isSetupComplete"), void 0);
  static {
    g(this.prototype, "_value", [tracked]);
  }
  #_value = (i(this, "_value"), void 0);
  static {
    g(this.prototype, "_titleId", [tracked]);
  }
  #_titleId = (i(this, "_titleId"), void 0);
  static {
    g(this.prototype, "_descriptionId", [tracked]);
  }
  #_descriptionId = (i(this, "_descriptionId"), void 0);
  _id = guidFor(this);
  _handleEscape = modifier(() => {
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
  });
  constructor(owner, args) {
    super(owner, args);
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
  static {
    n(this.prototype, "registerTitleElement", [action]);
  }
  registerDescriptionElement(element) {
    this._descriptionId = element.id;
  }
  static {
    n(this.prototype, "registerDescriptionElement", [action]);
  }
  toggleFullScreen() {
    this._isFullScreen = !this._isFullScreen;
  }
  static {
    n(this.prototype, "toggleFullScreen", [action]);
  }
  onInput(newValue, editorView) {
    this._value = newValue;
    this.args.onInput?.(newValue, editorView);
  }
  static {
    n(this.prototype, "onInput", [action]);
  }
  onKeyDown(event) {
    if (event.key === 'Escape' && this._isFullScreen) {
      this.toggleFullScreen();
    }
  }
  static {
    n(this.prototype, "onKeyDown", [action]);
  }
  onSetup(editorView) {
    this._isSetupComplete = true;
    this.args.onSetup?.(editorView);
  }
  static {
    n(this.prototype, "onSetup", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsCodeEditor);

export { HdsCodeEditor as default };
//# sourceMappingURL=index.js.map
