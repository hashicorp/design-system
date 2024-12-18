import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<Hds::Text::Body\n  class=\"hds-code-editor__description hds-code-editor__header-content-text\"\n  @tag=\"p\"\n  @size=\"100\"\n  @color=\"var(--hds-code-editor-color-foreground-faint)\"\n  ...attributes\n>\n  {{yield}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsCodeEditorDescription = TemplateOnlyComponent();
var description = setComponentTemplate(TEMPLATE, HdsCodeEditorDescription);

export { description as default };
//# sourceMappingURL=description.js.map
