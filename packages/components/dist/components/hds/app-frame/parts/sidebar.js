import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<aside class=\"hds-app-frame__sidebar\" ...attributes>\n  {{yield}}\n</aside>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFrameSidebarComponent extends Component {}
setComponentTemplate(TEMPLATE, HdsAppFrameSidebarComponent);

export { HdsAppFrameSidebarComponent as default };
//# sourceMappingURL=sidebar.js.map
