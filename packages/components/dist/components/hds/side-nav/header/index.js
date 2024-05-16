import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-side-nav-header\" ...attributes>\n  <div class=\"hds-side-nav-header__logo-container\">\n    {{yield to=\"logo\"}}\n  </div>\n  <div class=\"hds-side-nav-header__actions-container hds-side-nav-hide-when-minimized\">\n    {{yield to=\"actions\"}}\n  </div>\n</div>");

var index = setComponentTemplate(TEMPLATE, templateOnly());

export { index as default };
//# sourceMappingURL=index.js.map
