import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-form-toggle\">\n  <input class=\"hds-form-toggle__control\" type=\"checkbox\" ...attributes value={{@value}} role=\"switch\" />\n  <div class=\"hds-form-toggle__facade\"></div>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormToggleBaseComponent = TemplateOnlyComponent();
var base = setComponentTemplate(TEMPLATE, HdsFormToggleBaseComponent);

export { base as default };
//# sourceMappingURL=base.js.map
