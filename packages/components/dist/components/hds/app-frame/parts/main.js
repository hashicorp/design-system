import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<main class=\"hds-app-frame__main\" id=\"hds-main\" ...attributes>\n  {{yield}}\n</main>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFrameMain extends Component {}
setComponentTemplate(TEMPLATE, HdsAppFrameMain);

export { HdsAppFrameMain as default };
//# sourceMappingURL=main.js.map
