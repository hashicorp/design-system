import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\nCopyright (c) HashiCorp, Inc.\nSPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-page-header__actions\" ...attributes>{{yield}}</div>");

var actions = setComponentTemplate(TEMPLATE, templateOnly());

export { actions as default };
//# sourceMappingURL=actions.js.map
