import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Text::Body\n  id={{this._id}}\n  class=\"hds-code-editor__title\"\n  @tag={{this.tag}}\n  @size=\"200\"\n  @weight=\"semibold\"\n  {{did-insert @onInsert}}\n  ...attributes\n>\n  {{yield}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsCodeEditorTitle extends Component {
  _id = `${this.args.editorId}-title`;
  get tag() {
    return this.args.tag ?? 'h2';
  }
}
setComponentTemplate(TEMPLATE, HdsCodeEditorTitle);

export { HdsCodeEditorTitle as default };
//# sourceMappingURL=title.js.map
