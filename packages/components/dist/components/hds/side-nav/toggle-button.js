import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button class=\"hds-side-nav__toggle-button\" type=\"button\" ...attributes>\n  <FlightIcon @name={{@icon}} />\n</button>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsSideNavToggleButtonComponent = TemplateOnlyComponent();
var toggleButton = setComponentTemplate(TEMPLATE, HdsSideNavToggleButtonComponent);

export { toggleButton as default };
//# sourceMappingURL=toggle-button.js.map
