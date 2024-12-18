import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-alert__description hds-font-weight-regular hds-foreground-primary\" ...attributes>{{yield}}</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsAlertDescription = TemplateOnlyComponent();
var description = setComponentTemplate(TEMPLATE, HdsAlertDescription);

export { description as default };
//# sourceMappingURL=description.js.map
