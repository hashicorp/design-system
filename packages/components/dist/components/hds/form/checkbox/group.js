import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Form::Fieldset\n  @layout={{@layout}}\n  @name={{@name}}\n  @isRequired={{@isRequired}}\n  @isOptional={{@isOptional}}\n  ...attributes\n  as |F|\n>\n  {{! Notice: the order of the elements is not relevant here, because it\'s controlled at \"Hds::Form::Fieldset\" component level }}\n  {{yield (hash Legend=F.Legend isRequired=F.isRequired isOptional=F.isOptional)}}\n  {{yield (hash HelperText=F.HelperText Error=F.Error)}}\n  <F.Control>\n    {{yield\n      (hash\n        CheckboxField=(component\n          \"hds/form/checkbox/field\"\n          contextualClass=\"hds-form-group__control-field\"\n          isRequired=@isRequired\n          name=@name\n          extraAriaDescribedBy=F.ariaDescribedBy\n        )\n      )\n    }}\n  </F.Control>\n</Hds::Form::Fieldset>");

var group = setComponentTemplate(TEMPLATE, templateOnly());

export { group as default };
//# sourceMappingURL=group.js.map
