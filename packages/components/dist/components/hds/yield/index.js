import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! template-lint-disable no-yield-only }}\n{{yield}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsYield = templateOnlyComponent();
var index = setComponentTemplate(TEMPLATE, HdsYield);

export { index as default };
//# sourceMappingURL=index.js.map
