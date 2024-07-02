import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-accordion\" ...attributes>\n  {{yield (hash Item=(component \"hds/accordion/item\"))}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsAccordionComponent = templateOnly();
var index = setComponentTemplate(TEMPLATE, HdsAccordionComponent);

export { index as default };
//# sourceMappingURL=index.js.map
