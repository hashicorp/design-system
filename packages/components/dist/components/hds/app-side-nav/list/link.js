import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::AppSideNav::List::Item>\n  <Hds::Interactive\n    class=\"hds-app-side-nav__list-item-link {{if @isActive \'active\'}}\"\n    @current-when={{@current-when}}\n    @models={{hds-link-to-models @model @models}}\n    @query={{hds-link-to-query @query}}\n    @replace={{@replace}}\n    @route={{@route}}\n    @isRouteExternal={{@isRouteExternal}}\n    @href={{@href}}\n    @isHrefExternal={{@isHrefExternal}}\n    aria-current={{if @isActive \"page\"}}\n    ...attributes\n  >\n    {{#if @icon}}\n      <Hds::Icon class=\"hds-app-side-nav__list-item-icon-leading\" @name={{@icon}} />\n    {{/if}}\n\n    {{#if @text}}\n      <span class=\"hds-app-side-nav__list-item-text hds-typography-body-200 hds-font-weight-medium\">\n        {{@text}}\n      </span>\n    {{/if}}\n\n    {{#if @count}}\n      <Hds::BadgeCount @text={{@count}} @type=\"outlined\" @size=\"small\" />\n    {{/if}}\n\n    {{#if @badge}}\n      <Hds::Badge @text={{@badge}} @type=\"outlined\" @size=\"small\" />\n    {{/if}}\n\n    {{yield}}\n\n    {{#if @hasSubItems}}\n      <span class=\"hds-app-side-nav__list-item-icon-trailing\">\n        <Hds::Icon @name=\"chevron-right\" />\n      </span>\n    {{/if}}\n    {{#if @isHrefExternal}}\n      <span class=\"hds-app-side-nav__list-item-icon-trailing\">\n        <Hds::Icon @name=\"external-link\" />\n      </span>\n    {{/if}}\n  </Hds::Interactive>\n</Hds::AppSideNav::List::Item>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsAppSideNavListLink = TemplateOnlyComponent();
var link = setComponentTemplate(TEMPLATE, HdsAppSideNavListLink);

export { link as default };
//# sourceMappingURL=link.js.map
