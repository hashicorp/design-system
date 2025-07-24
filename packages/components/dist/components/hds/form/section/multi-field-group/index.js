import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-form__section-multi-field-group\" ...attributes>{{yield\n    (hash Item=(component \"hds/form/section/multi-field-group/item\"))\n  }}</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormSectionMultiFieldGroup = TemplateOnlyComponent();
var index = setComponentTemplate(TEMPLATE, HdsFormSectionMultiFieldGroup);

export { index as default };
//# sourceMappingURL=index.js.map
