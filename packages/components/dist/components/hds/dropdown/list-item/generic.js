import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li class=\"hds-dropdown-list-item hds-dropdown-list-item--variant-generic\" ...attributes>\n  {{yield}}\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDropdownListItemGeneric = templateOnlyComponent();
var generic = setComponentTemplate(TEMPLATE, HdsDropdownListItemGeneric);

export { generic as default };
//# sourceMappingURL=generic.js.map
