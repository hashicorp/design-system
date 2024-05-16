import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button class=\"hds-side-nav__toggle-button\" type=\"button\" ...attributes>\n  <FlightIcon @name={{@icon}} />\n</button>");

var toggleButton = setComponentTemplate(TEMPLATE, templateOnly());

export { toggleButton as default };
//# sourceMappingURL=toggle-button.js.map
