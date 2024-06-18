import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Text::Body @tag=\"p\" @size=\"100\" class=\"hds-code-block__description\" ...attributes>\n  {{yield}}\n</Hds::Text::Body>");

var description = setComponentTemplate(TEMPLATE, templateOnly());

export { description as default };
//# sourceMappingURL=description.js.map
