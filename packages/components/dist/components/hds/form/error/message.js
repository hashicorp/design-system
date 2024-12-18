import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body class=\"hds-form-error__message\" @tag=\"p\" @size=\"100\" @weight=\"medium\" ...attributes>\n  {{yield}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormErrorMessage = TemplateOnlyComponent();
var message = setComponentTemplate(TEMPLATE, HdsFormErrorMessage);

export { message as default };
//# sourceMappingURL=message.js.map
