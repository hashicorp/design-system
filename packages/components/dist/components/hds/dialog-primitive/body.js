import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-dialog-primitive__body {{@contextualClass}}\" tabindex=\"0\" ...attributes>\n  {{yield}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDialogPrimitiveBody = TemplateOnlyComponent();
var body = setComponentTemplate(TEMPLATE, HdsDialogPrimitiveBody);

export { body as default };
//# sourceMappingURL=body.js.map
