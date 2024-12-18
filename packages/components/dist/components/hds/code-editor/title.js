import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<Hds::Text::Body\n  class=\"hds-code-editor__title hds-code-editor__header-content-text\"\n  @tag={{this.tag}}\n  @size=\"200\"\n  @weight=\"semibold\"\n  @color=\"var(--hds-code-editor-color-foreground-primary)\"\n  ...attributes\n>\n  {{yield}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsCodeEditorTitle extends Component {
  get tag() {
    return this.args.tag ?? 'h2';
  }
}
setComponentTemplate(TEMPLATE, HdsCodeEditorTitle);

export { HdsCodeEditorTitle as default };
//# sourceMappingURL=title.js.map
