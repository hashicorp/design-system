import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<footer class=\"hds-app-frame__footer\" ...attributes>\n  {{yield}}\n</footer>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFrameFooter extends Component {}
setComponentTemplate(TEMPLATE, HdsAppFrameFooter);

export { HdsAppFrameFooter as default };
//# sourceMappingURL=footer.js.map
