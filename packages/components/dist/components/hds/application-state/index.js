import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-application-state\" ...attributes>\n  {{yield\n    (hash\n      Header=(component \"hds/application-state/header\")\n      Body=(component \"hds/application-state/body\")\n      Footer=(component \"hds/application-state/footer\")\n    )\n  }}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsApplicationStateComponent = templateOnly();
var index = setComponentTemplate(TEMPLATE, HdsApplicationStateComponent);

export { index as default };
//# sourceMappingURL=index.js.map
