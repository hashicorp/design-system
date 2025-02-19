import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Form::Field\n  @layout=\"flag\"\n  @contextualClass={{@contextualClass}}\n  @extraAriaDescribedBy={{@extraAriaDescribedBy}}\n  @id={{@id}}\n  as |F|\n>\n  {{! Notice: the order of the elements is not relevant here, because it\'s controlled at \"Hds::Form::Field\" component level }}\n  {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}\n  <F.Control>\n    <Hds::Form::Radio::Base\n      @value={{@value}}\n      name={{@name}}\n      required={{@isRequired}}\n      ...attributes\n      id={{F.id}}\n      aria-describedby={{F.ariaDescribedBy}}\n    />\n  </F.Control>\n</Hds::Form::Field>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormRadioField = TemplateOnlyComponent();
var field = setComponentTemplate(TEMPLATE, HdsFormRadioField);

export { field as default };
//# sourceMappingURL=field.js.map
