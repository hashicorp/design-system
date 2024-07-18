import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-dropdown-toggle-chevron\">\n  <FlightIcon @name=\"chevron-down\" @isInlineBlock={{false}} />\n</div>");

var chevron = setComponentTemplate(TEMPLATE, TemplateOnlyComponent());

export { chevron as default };
//# sourceMappingURL=chevron.js.map
