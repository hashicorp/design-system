import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember causes the empty element to still have visible padding - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n<div class=\"hds-side-nav\" ...attributes>\n  <div class=\"hds-side-nav__wrapper\">\n    {{yield to=\"root\"}}\n    <div class=\"hds-side-nav__wrapper-header\">\n      {{~yield to=\"header\"~}}\n    </div>\n    <div class=\"hds-side-nav__wrapper-body\">\n      {{~yield to=\"body\"~}}\n    </div>\n    <div class=\"hds-side-nav__wrapper-footer\">\n      {{~yield to=\"footer\"~}}\n    </div>\n  </div>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsSideNavBase = templateOnlyComponent();
var base = setComponentTemplate(TEMPLATE, HdsSideNavBase);

export { base as default };
//# sourceMappingURL=base.js.map
