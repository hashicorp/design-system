import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<header class=\"hds-app-frame__header\" ...attributes>\n  {{yield}}\n</header>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsAppFrameHeader = TemplateOnlyComponent();
var header = setComponentTemplate(TEMPLATE, HdsAppFrameHeader);

export { header as default };
//# sourceMappingURL=header.js.map
