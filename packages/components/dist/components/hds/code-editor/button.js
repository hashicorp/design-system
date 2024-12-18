import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<Hds::Button\n  @text={{@text}}\n  @size=\"small\"\n  @icon={{@icon}}\n  @isIconOnly={{@isIconOnly}}\n  class=\"hds-code-editor__button\"\n  ...attributes\n/>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsCodeEditorButton = TemplateOnlyComponent();
var button = setComponentTemplate(TEMPLATE, HdsCodeEditorButton);

export { button as default };
//# sourceMappingURL=button.js.map
