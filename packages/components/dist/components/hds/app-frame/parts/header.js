import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<header class=\"hds-app-frame__header\" ...attributes>\n  {{yield}}\n</header>");

var header = setComponentTemplate(TEMPLATE, templateOnly());

export { header as default };
//# sourceMappingURL=header.js.map
