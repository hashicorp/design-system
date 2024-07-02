import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<header class=\"hds-app-frame__header\" ...attributes>\n  {{yield}}\n</header>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFrameHeaderComponent extends Component {}
setComponentTemplate(TEMPLATE, HdsAppFrameHeaderComponent);

export { HdsAppFrameHeaderComponent as default };
//# sourceMappingURL=header.js.map
