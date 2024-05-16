import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Display\n  class=\"hds-page-header__title\"\n  @tag=\"h1\"\n  @size=\"500\"\n  @color=\"strong\"\n  ...attributes\n>{{yield}}</Hds::Text::Display>");

var title = setComponentTemplate(TEMPLATE, templateOnly());

export { title as default };
//# sourceMappingURL=title.js.map
