import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-segmented-group\" ...attributes>\n  {{yield\n    (hash\n      Button=(component \"hds/button\")\n      Dropdown=(component \"hds/dropdown\")\n      Select=(component \"hds/form/select/base\")\n      TextInput=(component \"hds/form/text-input/base\")\n      Generic=(component \"hds/yield\")\n    )\n  }}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsSegmentedGroup = TemplateOnlyComponent();
var index = setComponentTemplate(TEMPLATE, HdsSegmentedGroup);

export { index as default };
//# sourceMappingURL=index.js.map
