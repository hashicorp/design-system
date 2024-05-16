import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! template-lint-disable no-yield-only }}\n{{yield}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsYieldComponent extends Component {}
setComponentTemplate(TEMPLATE, HdsYieldComponent);

export { HdsYieldComponent as default };
//# sourceMappingURL=index.js.map
