import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-alert__title hds-font-weight-semibold\" ...attributes>{{yield}}</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsAlertTitleComponent = templateOnly();
var title = setComponentTemplate(TEMPLATE, HdsAlertTitleComponent);

export { title as default };
//# sourceMappingURL=title.js.map
