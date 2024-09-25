import Component from '@glimmer/component';
import { deprecate, assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{!\n  THIS SUBCOMPONENT IS NOW DEPRECATED\n}}\n<Hds::Interactive\n  class=\"hds-side-nav__icon-button\"\n  @current-when={{@current-when}}\n  @models={{hds-link-to-models @model @models}}\n  @query={{hds-link-to-query @query}}\n  @replace={{@replace}}\n  @route={{@route}}\n  @isRouteExternal={{@isRouteExternal}}\n  @href={{@href}}\n  @isHrefExternal={{@isHrefExternal}}\n  ...attributes\n  aria-label={{this.ariaLabel}}\n>\n  <Hds::Icon @name={{@icon}} @stretched={{true}} @size=\"24\" />\n</Hds::Interactive>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsSideNavHeaderIconButton extends Component {
  constructor(owner, args) {
    super(owner, args);
    deprecate('The `Hds::SideNav::Header::IconButton` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::Button` with the `isIconOnly` variant instead.', false, {
      id: 'hds.components.sidenav.header.iconbutton',
      until: '5.0.0',
      url: 'https://helios.hashicorp.design/components/side-nav?tab=version%20history#4100',
      for: '@hashicorp/design-system-components',
      since: {
        enabled: '4.10.0'
      }
    });
  }
  get ariaLabel() {
    const {
      ariaLabel
    } = this.args;
    assert('@ariaLabel for "Hds::SideNav::Header::IconButton" must have a valid value', ariaLabel !== undefined);
    return ariaLabel;
  }
}
setComponentTemplate(TEMPLATE, HdsSideNavHeaderIconButton);

export { HdsSideNavHeaderIconButton as default };
//# sourceMappingURL=icon-button.js.map
