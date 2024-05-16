import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<li class=\"hds-app-footer__list-item\" ...attributes>\n  {{yield}}\n</li>");

var item = setComponentTemplate(TEMPLATE, templateOnly());

export { item as default };
//# sourceMappingURL=item.js.map
