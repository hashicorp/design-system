import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body @tag=\"span\" @size=\"200\" class=\"ember-power-select-placeholder\">{{@placeholder}}</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormSuperSelectPlaceholder = templateOnlyComponent();
var placeholder = setComponentTemplate(TEMPLATE, HdsFormSuperSelectPlaceholder);

export { placeholder as default };
//# sourceMappingURL=placeholder.js.map
