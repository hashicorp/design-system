import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{!\n  THIS SUBCOMPONENT IS NOW DEPRECATED\n}}\n<div class=\"hds-flyout__body\" ...attributes>\n  {{yield}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFlyoutBody extends Component {
  constructor(owner, args) {
    super(owner, args);
    deprecate('The `Hds::Flyout::Body` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::DialogPrimitive::Body` as one-to-one replacement.', false, {
      id: 'hds.components.flyout.body',
      until: '5.0.0',
      url: 'https://helios.hashicorp.design/components/flyout?tab=version%20history#460',
      for: '@hashicorp/design-system-components',
      since: {
        enabled: '4.6.0',
        available: '4.6.0'
      }
    });
  }
}
setComponentTemplate(TEMPLATE, HdsFlyoutBody);

export { HdsFlyoutBody as default };
//# sourceMappingURL=body.js.map
