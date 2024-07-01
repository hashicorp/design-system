import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<button class=\"hds-form-visibility-toggle\" type=\"button\" aria-label={{@ariaLabel}} ...attributes>\n  <FlightIcon @name={{if @isVisible \"eye\" \"eye-off\"}} @size=\"16\" @isInlineBlock={{false}} />\n  <span class=\"sr-only\" aria-live=\"polite\">{{@ariaMessageText}}</span>\n</button>");

var index = setComponentTemplate(TEMPLATE, templateOnly());

export { index as default };
//# sourceMappingURL=index.js.map
