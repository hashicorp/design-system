import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Text::Body class=\"hds-form__header-description\" @tag=\"p\" @size=\"300\" @color=\"primary\" ...attributes>\n  {{yield}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormHeaderDescription = TemplateOnlyComponent();
var description = setComponentTemplate(TEMPLATE, HdsFormHeaderDescription);

export { description as default };
//# sourceMappingURL=description.js.map
