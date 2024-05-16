import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\nCopyright (c) HashiCorp, Inc.\nSPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-page-header__badges-wrapper\" ...attributes>{{yield}}</div>");

var badges = setComponentTemplate(TEMPLATE, templateOnly());

export { badges as default };
//# sourceMappingURL=badges.js.map
