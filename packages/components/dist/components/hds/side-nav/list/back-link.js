import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::SideNav::List::Item>\n  <Hds::Interactive\n    class=\"hds-side-nav__list-item-link hds-side-nav__list-item-link--back-link\"\n    @current-when={{@current-when}}\n    @models={{hds-link-to-models @model @models}}\n    @query={{hds-link-to-query @query}}\n    @replace={{@replace}}\n    @route={{@route}}\n    @isRouteExternal={{@isRouteExternal}}\n    @href={{@href}}\n    @isHrefExternal={{@isHrefExternal}}\n    ...attributes\n  >\n    <FlightIcon class=\"hds-side-nav__list-item-icon-leading\" @name=\"chevron-left\" />\n    <span class=\"hds-side-nav__list-item-text hds-typography-body-200 hds-font-weight-medium\">\n      {{@text}}\n    </span>\n  </Hds::Interactive>\n</Hds::SideNav::List::Item>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsSideNavListBackLinkComponent = TemplateOnlyComponent();
var backLink = setComponentTemplate(TEMPLATE, HdsSideNavListBackLinkComponent);

export { backLink as default };
//# sourceMappingURL=back-link.js.map
