import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-form-toggle\">\n  <input class=\"hds-form-toggle__control\" type=\"checkbox\" ...attributes value={{@value}} role=\"switch\" />\n  <div class=\"hds-form-toggle__facade\"></div>\n</div>");

var base = setComponentTemplate(TEMPLATE, templateOnly());

export { base as default };
//# sourceMappingURL=base.js.map
