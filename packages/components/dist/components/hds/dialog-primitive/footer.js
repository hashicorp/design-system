import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-dialog-primitive__footer {{@contextualClass}}\" ...attributes>\n  {{yield (hash close=@onDismiss)}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDialogPrimitiveFooter = templateOnlyComponent();
var footer = setComponentTemplate(TEMPLATE, HdsDialogPrimitiveFooter);

export { footer as default };
//# sourceMappingURL=footer.js.map
