import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Text::Body\n  id={{this._id}}\n  class=\"hds-code-editor__description\"\n  @tag=\"p\"\n  @size=\"100\"\n  {{did-insert @onInsert}}\n  ...attributes\n>\n  {{yield}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsCodeEditorDescription extends Component {
  _id = `${this.args.editorId}-description`;
}
setComponentTemplate(TEMPLATE, HdsCodeEditorDescription);

export { HdsCodeEditorDescription as default };
//# sourceMappingURL=description.js.map
