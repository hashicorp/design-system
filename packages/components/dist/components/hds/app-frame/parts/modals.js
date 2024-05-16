import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! we use `:empty` in CSS so we have to avoid whitespaces }}\n<div class=\"hds-app-frame__modals\" ...attributes>{{~yield~}}</div>");

var modals = setComponentTemplate(TEMPLATE, templateOnly());

export { modals as default };
//# sourceMappingURL=modals.js.map
