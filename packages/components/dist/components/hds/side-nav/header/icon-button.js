import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Interactive\n  class=\"hds-side-nav__icon-button\"\n  @current-when={{@current-when}}\n  @models={{hds-link-to-models @model @models}}\n  @query={{hds-link-to-query @query}}\n  @replace={{@replace}}\n  @route={{@route}}\n  @isRouteExternal={{@isRouteExternal}}\n  @href={{@href}}\n  @isHrefExternal={{@isHrefExternal}}\n  ...attributes\n  aria-label={{this.ariaLabel}}\n>\n  <FlightIcon @name={{@icon}} @stretched={{true}} @size=\"24\" />\n</Hds::Interactive>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsSideNavHeaderIconButtonComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @description The value of `aria-label`
   */
  get ariaLabel() {
    const {
      ariaLabel
    } = this.args;
    assert('@ariaLabel for "Hds::SideNav::Header::IconButton" must have a valid value', ariaLabel !== undefined);
    return ariaLabel;
  }
}
setComponentTemplate(TEMPLATE, HdsSideNavHeaderIconButtonComponent);

export { HdsSideNavHeaderIconButtonComponent as default };
//# sourceMappingURL=icon-button.js.map
