import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li\n  class=\"hds-dropdown-list-item hds-dropdown-list-item--variant-separator\"\n  aria-hidden=\"true\"\n  role=\"separator\"\n  ...attributes\n></li>");

var separator = setComponentTemplate(TEMPLATE, templateOnly());

export { separator as default };
//# sourceMappingURL=separator.js.map
