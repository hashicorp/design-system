import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li class=\"hds-dropdown-list-item hds-dropdown-list-item--variant-generic\" ...attributes>\n  {{yield}}\n</li>");

var generic = setComponentTemplate(TEMPLATE, TemplateOnlyComponent());

export { generic as default };
//# sourceMappingURL=generic.js.map
