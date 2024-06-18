import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-modal__body\" ...attributes>\n  {{yield}}\n</div>");

var body = setComponentTemplate(TEMPLATE, templateOnly());

export { body as default };
//# sourceMappingURL=body.js.map
