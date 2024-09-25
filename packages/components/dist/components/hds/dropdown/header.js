import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-dropdown__header {{if @hasDivider \'hds-dropdown__header--with-divider\'}}\" ...attributes>\n  {{yield}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDropdownHeader = templateOnlyComponent();
var header = setComponentTemplate(TEMPLATE, HdsDropdownHeader);

export { header as default };
//# sourceMappingURL=header.js.map
