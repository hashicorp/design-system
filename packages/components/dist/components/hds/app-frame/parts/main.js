import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<main class=\"hds-app-frame__main\" ...attributes>\n  {{yield}}\n</main>");

var main = setComponentTemplate(TEMPLATE, templateOnly());

export { main as default };
//# sourceMappingURL=main.js.map
