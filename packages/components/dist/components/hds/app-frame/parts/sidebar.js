import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<aside class=\"hds-app-frame__sidebar\" ...attributes>\n  {{yield}}\n</aside>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsAppFrameSidebar = templateOnlyComponent();
var sidebar = setComponentTemplate(TEMPLATE, HdsAppFrameSidebar);

export { sidebar as default };
//# sourceMappingURL=sidebar.js.map
