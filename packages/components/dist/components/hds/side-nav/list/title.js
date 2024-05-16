import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::SideNav::List::Item>\n  <div class=\"hds-side-nav__list-title hds-typography-body-100 hds-font-weight-semibold\" ...attributes>{{~yield~}}</div>\n</Hds::SideNav::List::Item>");

var title = setComponentTemplate(TEMPLATE, templateOnly());

export { title as default };
//# sourceMappingURL=title.js.map
