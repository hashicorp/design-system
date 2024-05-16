import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Portal @target={{if @targetName @targetName \"hds-side-nav-portal-target\"}}>\n  <div class=\"hds-side-nav__content-panel\" ...attributes>\n    <Hds::SideNav::List aria-label={{@ariaLabel}} as |ListElements|>\n      {{yield ListElements}}\n    </Hds::SideNav::List>\n  </div>\n</Portal>");

var index = setComponentTemplate(TEMPLATE, templateOnly());

export { index as default };
//# sourceMappingURL=index.js.map
