import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body\n  class=\"hds-page-header__description\"\n  @tag=\"p\"\n  @size=\"200\"\n  @color=\"primary\"\n  ...attributes\n>{{yield}}</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsPageHeaderDescriptionComponent = TemplateOnlyComponent();
var description = setComponentTemplate(TEMPLATE, HdsPageHeaderDescriptionComponent);

export { description as default };
//# sourceMappingURL=description.js.map
