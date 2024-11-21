import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-dialog-primitive__overlay {{@contextualClass}}\"></div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsDialogPrimitiveOverlay = TemplateOnlyComponent();
var overlay = setComponentTemplate(TEMPLATE, HdsDialogPrimitiveOverlay);

export { overlay as default };
//# sourceMappingURL=overlay.js.map
