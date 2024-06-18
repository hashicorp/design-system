import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<li class=\"hds-side-nav__list-item\" ...attributes>\n  {{yield}}\n</li>");

const HdsSideNavListItemComponent = templateOnly();
var item = setComponentTemplate(TEMPLATE, HdsSideNavListItemComponent);

export { item as default };
//# sourceMappingURL=item.js.map
