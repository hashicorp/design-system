import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<input\n  class=\"hds-form-file-input hds-typography-body-200\"\n  id={{@id}}\n  aria-describedby={{@ariaDescribedBy}}\n  ...attributes\n  type=\"file\"\n/>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormFileInputBase = TemplateOnlyComponent();
var base = setComponentTemplate(TEMPLATE, HdsFormFileInputBase);

export { base as default };
//# sourceMappingURL=base.js.map
