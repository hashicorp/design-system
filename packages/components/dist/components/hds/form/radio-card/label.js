import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Display\n  class=\"hds-form-radio-card__label\"\n  @tag=\"span\"\n  @size=\"300\"\n  @weight=\"bold\"\n  ...attributes\n>{{yield}}</Hds::Text::Display>");

var label = setComponentTemplate(TEMPLATE, templateOnly());

export { label as default };
//# sourceMappingURL=label.js.map
