import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-side-nav\" ...attributes>\n  <div class=\"hds-side-nav__wrapper\">\n    {{yield to=\"root\"}}\n    <div class=\"hds-side-nav__wrapper-header\">\n      {{yield to=\"header\"}}\n    </div>\n    <div class=\"hds-side-nav__wrapper-body\">\n      {{yield to=\"body\"}}\n    </div>\n    <div class=\"hds-side-nav__wrapper-footer\">\n      {{yield to=\"footer\"}}\n    </div>\n  </div>\n</div>");

var base = setComponentTemplate(TEMPLATE, templateOnly());

export { base as default };
//# sourceMappingURL=base.js.map
