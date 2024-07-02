import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! we use `:empty` in CSS so we have to avoid whitespaces }}\n<div class=\"hds-app-frame__modals\" ...attributes>{{~yield~}}</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFrameModalsComponent extends Component {}
setComponentTemplate(TEMPLATE, HdsAppFrameModalsComponent);

export { HdsAppFrameModalsComponent as default };
//# sourceMappingURL=modals.js.map
