import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember causes extra space around the time element - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n<time\n  class=\"hds-time hds-time--single\"\n  datetime={{@isoUtcString}}\n  ...attributes\n  {{did-insert @register}}\n  {{will-destroy @unregister}}\n>\n  {{~#if @display.options.showFriendly~}}\n    {{~#if @display.options.displayFormat~}}\n      {{~hds-format-date @date @display.options.displayFormat~}}\n    {{~else~}}\n      {{~@isoUtcString}}\n    {{~/if~}}\n    {{#if @display.options.showRelative}}\n      ({{hds-format-relative @display.relative.value @display.relative.unit}})\n    {{/if}}\n  {{~else~}}\n    {{#if @display.options.showRelative}}\n      {{~hds-format-relative @display.relative.value @display.relative.unit~}}\n    {{~/if~}}\n  {{~/if~}}\n</time>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsTimeSingleComponent = TemplateOnlyComponent();
var single = setComponentTemplate(TEMPLATE, HdsTimeSingleComponent);

export { single as default };
//# sourceMappingURL=single.js.map
