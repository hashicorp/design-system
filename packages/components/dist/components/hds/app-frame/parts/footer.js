import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<footer class=\"hds-app-frame__footer\" ...attributes>\n  {{yield}}\n</footer>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsAppFrameFooter = templateOnlyComponent();
var footer = setComponentTemplate(TEMPLATE, HdsAppFrameFooter);

export { footer as default };
//# sourceMappingURL=footer.js.map
