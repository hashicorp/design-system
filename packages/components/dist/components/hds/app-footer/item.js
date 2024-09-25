import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<li class=\"hds-app-footer__list-item\" ...attributes>\n  {{yield}}\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFooterItem extends Component {}
setComponentTemplate(TEMPLATE, HdsAppFooterItem);

export { HdsAppFooterItem as default };
//# sourceMappingURL=item.js.map
