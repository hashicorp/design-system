import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<aside class=\"hds-app-frame__sidebar\" ...attributes>\n  {{yield}}\n</aside>");

var sidebar = setComponentTemplate(TEMPLATE, templateOnly());

export { sidebar as default };
//# sourceMappingURL=sidebar.js.map
