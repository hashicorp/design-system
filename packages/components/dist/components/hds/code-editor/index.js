import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-81503waH.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class={{this.classNames}} ...attributes>\n  {{#if (and this.isSetupComplete (or this.hasToolbarButton (has-block)))}}\n    <div class=\"hds-code-editor__header\">\n      <div class=\"hds-code-editor__header-content\">\n        {{yield\n          (hash\n            Title=(component \"hds/code-editor/title\")\n            Description=(component \"hds/code-editor/description\")\n            Button=(component \"hds/code-editor/button\")\n          )\n        }}\n      </div>\n\n      {{#if this.hasToolbarButton}}\n        <div class=\"hds-code-editor__header-toolbar\">\n          {{#if @hasCopyButton}}\n            <Hds::Copy::Button\n              class=\"hds-code-editor__button hds-code-editor__copy-button\"\n              @isIconOnly={{true}}\n              @size=\"small\"\n              @text=\"Copy\"\n              @textToCopy={{@value}}\n            />\n          {{/if}}\n          {{#if @hasExpandButton}}\n            <Hds::CodeEditor::Button\n              class=\"hds-code-editor__expand-button\"\n              @isIconOnly={{true}}\n              @size=\"small\"\n              @icon=\"maximize\"\n              @text=\"Fullscreen\"\n              {{on \"click\" this.toggleFullscreen}}\n            />\n          {{/if}}\n        </div>\n      {{/if}}\n    </div>\n  {{/if}}\n  <div\n    class=\"hds-code-editor__editor\"\n    {{hds-code-editor value=@value language=@language onInput=@onInput onSetup=this.onSetup}}\n  />\n  {{#unless this.isSetupComplete}}\n    <div class=\"hds-code-editor__loader\">\n      <Hds::Icon @name=\"loading\" @color=\"var(--hds-code-editor-color-foreground-primary)\" @size=\"24\" />\n    </div>\n  {{/unless}}\n</div>");

var _class, _descriptor, _descriptor2;
let HdsCodeEditor = (_class = class HdsCodeEditor extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isFullscreen", _descriptor, this);
    _initializerDefineProperty(this, "isSetupComplete", _descriptor2, this);
  }
  get classNames() {
    // Currently there is only one theme so the class name is hard-coded.
    // In the future, additional themes such as a "light" theme could be added.
    const classes = ['hds-code-editor', 'hds-code-editor--theme-dark'];
    if (this.isFullscreen) {
      classes.push('hds-code-editor--is-fullscreen');
    }
    return classes.join(' ');
  }
  get hasToolbarButton() {
    return (this.args.hasCopyButton || this.args.hasExpandButton) ?? false;
  }
  onSetup(editorView) {
    this.isSetupComplete = true;
    this.args.onSetup?.(editorView);
  }
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "isFullscreen", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "isSetupComplete", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onSetup", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onSetup"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleFullscreen", [action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleFullscreen"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsCodeEditor);

export { HdsCodeEditor as default };
//# sourceMappingURL=index.js.map
