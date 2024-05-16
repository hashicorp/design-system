import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Alert\n  class=\"hds-toast\"\n  @type=\"inline\"\n  @color={{@color}}\n  @icon={{@icon}}\n  @onDismiss={{@onDismiss}}\n  ...attributes\n  as |A|\n>\n  {{yield\n    (hash Title=A.Title Description=A.Description Button=A.Button LinkStandalone=A.LinkStandalone Generic=A.Generic)\n  }}\n</Hds::Alert>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsToastComponent extends Component {}
setComponentTemplate(TEMPLATE, HdsToastComponent);

export { HdsToastComponent as default };
//# sourceMappingURL=index.js.map
