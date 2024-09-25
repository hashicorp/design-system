import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-dropdown-toggle-chevron\">\n  <Hds::Icon @name=\"chevron-down\" />\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDropdownToggleChevron = templateOnlyComponent();
var chevron = setComponentTemplate(TEMPLATE, HdsDropdownToggleChevron);

export { chevron as default };
//# sourceMappingURL=chevron.js.map
