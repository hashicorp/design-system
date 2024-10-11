import templateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\nCopyright (c) HashiCorp, Inc.\nSPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-page-header__actions\" ...attributes>{{yield}}</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsPageHeaderActions = templateOnlyComponent();
var actions = setComponentTemplate(TEMPLATE, HdsPageHeaderActions);

export { actions as default };
//# sourceMappingURL=actions.js.map
