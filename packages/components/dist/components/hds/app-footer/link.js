import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::AppFooter::Item>\n  <Hds::Link::Inline\n    class=\"hds-app-footer__link\"\n    @color=\"secondary\"\n    @current-when={{@current-when}}\n    @models={{hds-link-to-models @model @models}}\n    @query={{hds-link-to-query @query}}\n    @replace={{@replace}}\n    @route={{@route}}\n    @isRouteExternal={{@isRouteExternal}}\n    @href={{@href}}\n    @isHrefExternal={{@isHrefExternal}}\n    @icon={{@icon}}\n    @iconPosition={{@iconPosition}}\n    ...attributes\n  ><Hds::Text::Body @tag=\"span\" @size=\"100\">{{yield}}</Hds::Text::Body></Hds::Link::Inline>\n</Hds::AppFooter::Item>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFooterLinkComponent extends Component {}
setComponentTemplate(TEMPLATE, HdsAppFooterLinkComponent);

export { HdsAppFooterLinkComponent as default };
//# sourceMappingURL=link.js.map
