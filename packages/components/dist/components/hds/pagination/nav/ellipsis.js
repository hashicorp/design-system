import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-pagination-nav__ellipsis\" ...attributes>...</div>");

var ellipsis = setComponentTemplate(TEMPLATE, TemplateOnlyComponent());

export { ellipsis as default };
//# sourceMappingURL=ellipsis.js.map
