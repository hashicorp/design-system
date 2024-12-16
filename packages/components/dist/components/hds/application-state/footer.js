import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class=\"hds-application-state__footer\" ...attributes>\n  {{yield\n    (hash\n      Button=(component \"hds/button\")\n      Dropdown=(component \"hds/dropdown\")\n      LinkStandalone=(component \"hds/link/standalone\")\n    )\n  }}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsApplicationStateFooter = TemplateOnlyComponent();
var footer = setComponentTemplate(TEMPLATE, HdsApplicationStateFooter);

export { footer as default };
//# sourceMappingURL=footer.js.map
