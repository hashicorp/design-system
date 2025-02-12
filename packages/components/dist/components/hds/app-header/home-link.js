import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Interactive\n  class=\"hds-app-header__home-link\"\n  @current-when={{@current-when}}\n  @models={{hds-link-to-models @model @models}}\n  @query={{hds-link-to-query @query}}\n  @replace={{@replace}}\n  @route={{@route}}\n  @isRouteExternal={{@isRouteExternal}}\n  @href={{@href}}\n  @isHrefExternal={{@isHrefExternal}}\n  ...attributes\n  aria-label={{this.ariaLabel}}\n>\n  <Hds::Icon @name={{@icon}} @color={{@color}} @stretched={{true}} />\n</Hds::Interactive>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppHeaderHomeLink extends Component {
  get ariaLabel() {
    const {
      ariaLabel
    } = this.args;
    assert('@ariaLabel for "Hds::AppHeader::HomeLink" ("Logo") must have a valid value', ariaLabel !== undefined);
    return ariaLabel;
  }
}
setComponentTemplate(TEMPLATE, HdsAppHeaderHomeLink);

export { HdsAppHeaderHomeLink as default };
//# sourceMappingURL=home-link.js.map
