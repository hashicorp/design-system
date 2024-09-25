import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button class=\"hds-side-nav__toggle-button\" type=\"button\" ...attributes>\n  <Hds::Icon @name={{@icon}} />\n</button>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsSideNavToggleButton = templateOnlyComponent();
var toggleButton = setComponentTemplate(TEMPLATE, HdsSideNavToggleButton);

export { toggleButton as default };
//# sourceMappingURL=toggle-button.js.map
