import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body\n  class=\"hds-page-header__subtitle\"\n  @tag=\"p\"\n  @size=\"200\"\n  @color=\"faint\"\n  ...attributes\n>{{yield}}</Hds::Text::Body>");

var subtitle = setComponentTemplate(TEMPLATE, templateOnly());

export { subtitle as default };
//# sourceMappingURL=subtitle.js.map
