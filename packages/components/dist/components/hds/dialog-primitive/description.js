import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class=\"hds-dialog-primitive__description hds-typography-body-200 hds-foreground-primary {{@contextualClass}}\"\n  ...attributes\n>\n  {{yield}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDialogPrimitiveDescription = templateOnlyComponent();
var description = setComponentTemplate(TEMPLATE, HdsDialogPrimitiveDescription);

export { description as default };
//# sourceMappingURL=description.js.map
