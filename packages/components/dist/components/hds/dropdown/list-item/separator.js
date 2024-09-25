import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li\n  class=\"hds-dropdown-list-item hds-dropdown-list-item--variant-separator\"\n  aria-hidden=\"true\"\n  role=\"separator\"\n  ...attributes\n></li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDropdownListItemSeparator = templateOnlyComponent();
var separator = setComponentTemplate(TEMPLATE, HdsDropdownListItemSeparator);

export { separator as default };
//# sourceMappingURL=separator.js.map
