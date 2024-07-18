import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<input class=\"hds-form-file-input hds-typography-body-200\" ...attributes type=\"file\" />");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormFileInputBaseComponent = TemplateOnlyComponent();
var base = setComponentTemplate(TEMPLATE, HdsFormFileInputBaseComponent);

export { base as default };
//# sourceMappingURL=base.js.map
