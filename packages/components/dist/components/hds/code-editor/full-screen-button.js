import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Button\n  class={{this.className}}\n  aria-pressed={{@isFullScreen}}\n  @isIconOnly={{true}}\n  @color=\"secondary\"\n  @size=\"small\"\n  @icon={{this.state}}\n  @text=\"Toggle full screen view\"\n  {{on \"click\" @onToggleFullScreen}}\n  ...attributes\n/>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsCodeEditorFullScreenButton extends Component {
  get state() {
    return this.args.isFullScreen ? 'minimize' : 'maximize';
  }
  get className() {
    const classes = ['hds-code-editor__full-screen-button', 'hds-code-editor__button'];
    const stateClass = `hds-code-editor__full-screen-button--${this.state}`;
    classes.push(stateClass);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsCodeEditorFullScreenButton);

export { HdsCodeEditorFullScreenButton as default };
//# sourceMappingURL=full-screen-button.js.map
