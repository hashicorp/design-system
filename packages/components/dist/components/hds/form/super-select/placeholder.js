import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body @tag=\"span\" @size=\"200\" class=\"ember-power-select-placeholder\">{{@placeholder}}</Hds::Text::Body>");

var placeholder = setComponentTemplate(TEMPLATE, TemplateOnlyComponent());

export { placeholder as default };
//# sourceMappingURL=placeholder.js.map
