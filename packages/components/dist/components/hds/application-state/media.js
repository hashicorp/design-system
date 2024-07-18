import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-application-state__media\" ...attributes>\n  {{yield}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsApplicationStateMediaComponent = TemplateOnlyComponent();
var media = setComponentTemplate(TEMPLATE, HdsApplicationStateMediaComponent);

export { media as default };
//# sourceMappingURL=media.js.map
