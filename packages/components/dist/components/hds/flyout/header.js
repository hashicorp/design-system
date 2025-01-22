import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{!\n  THIS SUBCOMPONENT IS NOW DEPRECATED\n}}\n<div class=\"hds-flyout__header\" ...attributes>\n  {{#if @icon}}\n    <Hds::Icon class=\"hds-flyout__icon\" @name={{@icon}} @size=\"24\" />\n  {{/if}}\n  <Hds::Text::Display class=\"hds-flyout__title\" @tag=\"div\" @size=\"300\" @weight=\"semibold\" id={{@id}}>\n    {{#if @tagline}}\n      <Hds::Text::Body class=\"hds-flyout__tagline\" @tag=\"div\" @size=\"100\" @weight=\"regular\" @color=\"faint\">\n        {{@tagline}}\n      </Hds::Text::Body>\n    {{/if}}\n    {{yield}}\n  </Hds::Text::Display>\n  <Hds::DismissButton class=\"hds-flyout__dismiss\" {{on \"click\" @onDismiss}} />\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFlyoutHeader extends Component {
  constructor(owner, args) {
    super(owner, args);
    deprecate('The `Hds::Flyout::Header` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::DialogPrimitive::Header` as one-to-one replacement.', false, {
      id: 'hds.components.flyout.header',
      until: '5.0.0',
      url: 'https://helios.hashicorp.design/components/flyout?tab=version%20history#460',
      for: '@hashicorp/design-system-components',
      since: {
        enabled: '4.6.0'
      }
    });
  }
}
setComponentTemplate(TEMPLATE, HdsFlyoutHeader);

export { HdsFlyoutHeader as default };
//# sourceMappingURL=header.js.map
