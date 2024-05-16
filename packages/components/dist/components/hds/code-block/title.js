import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Text::Body @size=\"200\" @tag=\"p\" @weight=\"semibold\" class=\"hds-code-block__title\" ...attributes>\n  {{yield}}\n</Hds::Text::Body>");

var title = setComponentTemplate(TEMPLATE, templateOnly());

export { title as default };
//# sourceMappingURL=title.js.map
