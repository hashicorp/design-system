import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Form::Fieldset @layout={{@layout}} @isRequired={{@isRequired}} @isOptional={{@isOptional}} ...attributes as |F|>\n  {{! Notice: the order of the elements is not relevant here, because it\'s controlled at \"Hds::Form::Fieldset\" component level }}\n  {{yield (hash Legend=F.Legend HelperText=F.HelperText Error=F.Error)}}\n  <F.Control>\n    {{yield\n      (hash\n        ToggleField=(component\n          \"hds/form/toggle/field\"\n          contextualClass=\"hds-form-group__control-field\"\n          isRequired=@isRequired\n          extraAriaDescribedBy=F.ariaDescribedBy\n        )\n      )\n    }}\n  </F.Control>\n</Hds::Form::Fieldset>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormToggleGroup = templateOnlyComponent();
var group = setComponentTemplate(TEMPLATE, HdsFormToggleGroup);

export { group as default };
//# sourceMappingURL=group.js.map
