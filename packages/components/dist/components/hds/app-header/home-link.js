import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Interactive\n  class=\"hds-app-header__home-link\"\n  @current-when={{@current-when}}\n  @models={{hds-link-to-models @model @models}}\n  @query={{hds-link-to-query @query}}\n  @replace={{@replace}}\n  @route={{@route}}\n  @isRouteExternal={{@isRouteExternal}}\n  @href={{@href}}\n  @isHrefExternal={{@isHrefExternal}}\n  ...attributes\n  aria-label={{if this.isIconOnly this.text null}}\n>\n  <Hds::Icon @name={{@icon}} @color={{@color}} @stretched={{true}} />\n  {{#unless this.isIconOnly}}\n    <Hds::Text::Display @size=\"100\" @color=\"foreground-high-contrast\">{{this.text}}</Hds::Text::Display>\n  {{/unless}}\n</Hds::Interactive>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppHeaderHomeLink extends Component {
  get text() {
    const {
      text
    } = this.args;
    assert('@text for "Hds::AppHeader::HomeLink" must have a valid value', text !== undefined);
    return text;
  }
  get icon() {
    const {
      icon
    } = this.args;
    assert('@icon name for "Hds::AppHeader::HomeLink" must be provided', icon !== undefined);
    return icon;
  }
  get isIconOnly() {
    return this.args.isIconOnly ?? true;
  }
}
setComponentTemplate(TEMPLATE, HdsAppHeaderHomeLink);

export { HdsAppHeaderHomeLink as default };
//# sourceMappingURL=home-link.js.map
