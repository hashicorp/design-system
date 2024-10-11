import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body\n  class=\"hds-form-radio-card__description\"\n  @tag=\"span\"\n  @size=\"100\"\n  ...attributes\n>{{yield}}</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormRadioCardDescription = templateOnlyComponent();
var description = setComponentTemplate(TEMPLATE, HdsFormRadioCardDescription);

export { description as default };
//# sourceMappingURL=description.js.map
