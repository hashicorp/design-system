import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<input class=\"hds-form-file-input hds-typography-body-200\" ...attributes type=\"file\" />");

var base = setComponentTemplate(TEMPLATE, templateOnly());

export { base as default };
//# sourceMappingURL=base.js.map
