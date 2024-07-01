import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body class=\"hds-flyout__description\" @tag=\"div\" @size=\"200\" @color=\"primary\" ...attributes>\n  {{yield}}\n</Hds::Text::Body>");

var description = setComponentTemplate(TEMPLATE, templateOnly());

export { description as default };
//# sourceMappingURL=description.js.map
