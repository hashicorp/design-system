import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<dialog class=\"hds-dialog-primitive__wrapper\" ...attributes>\n  <div class=\"hds-dialog-primitive__wrapper-header\">\n    {{yield to=\"header\"}}\n  </div>\n  <div class=\"hds-dialog-primitive__wrapper-body\">\n    {{yield to=\"body\"}}\n  </div>\n  <div class=\"hds-dialog-primitive__wrapper-footer\">\n    {{yield to=\"footer\"}}\n  </div>\n</dialog>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDialogPrimitiveWrapper = TemplateOnlyComponent();
var wrapper = setComponentTemplate(TEMPLATE, HdsDialogPrimitiveWrapper);

export { wrapper as default };
//# sourceMappingURL=wrapper.js.map
