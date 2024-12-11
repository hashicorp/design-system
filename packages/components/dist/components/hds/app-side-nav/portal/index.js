import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Portal @target={{if @targetName @targetName \"hds-app-side-nav-portal-target\"}}>\n  <div class=\"hds-app-side-nav__content-panel\" ...attributes>\n    <Hds::AppSideNav::List aria-label={{@ariaLabel}} as |ListElements|>\n      {{yield ListElements}}\n    </Hds::AppSideNav::List>\n  </div>\n</Portal>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsAppSideNavPortal = TemplateOnlyComponent();
var index = setComponentTemplate(TEMPLATE, HdsAppSideNavPortal);

export { index as default };
//# sourceMappingURL=index.js.map
