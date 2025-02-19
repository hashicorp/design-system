import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-pagination-nav__ellipsis\" ...attributes>...</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
const HdsApplicationPaginationNavEllipsis = TemplateOnlyComponent();
var ellipsis = setComponentTemplate(TEMPLATE, HdsApplicationPaginationNavEllipsis);

export { ellipsis as default };
//# sourceMappingURL=ellipsis.js.map
