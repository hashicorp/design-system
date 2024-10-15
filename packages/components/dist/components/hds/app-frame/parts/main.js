import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<main class=\"hds-app-frame__main\" id=\"hds-main\" ...attributes>\n  {{yield}}\n</main>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsAppFrameMain = templateOnlyComponent();
var main = setComponentTemplate(TEMPLATE, HdsAppFrameMain);

export { main as default };
//# sourceMappingURL=main.js.map
