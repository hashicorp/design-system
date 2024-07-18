import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-dropdown__header {{if @hasDivider \'hds-dropdown__header--with-divider\'}}\" ...attributes>\n  {{yield}}\n</div>");

var header = setComponentTemplate(TEMPLATE, TemplateOnlyComponent());

export { header as default };
//# sourceMappingURL=header.js.map
