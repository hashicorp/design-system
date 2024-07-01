import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-flyout__footer\" ...attributes>\n  {{yield (hash close=@onDismiss)}}\n</div>");

var footer = setComponentTemplate(TEMPLATE, templateOnly());

export { footer as default };
//# sourceMappingURL=footer.js.map
