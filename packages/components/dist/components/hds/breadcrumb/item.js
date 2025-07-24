import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';
import { hdsResolveLinkToExternal } from '../../../utils/hds-resolve-link-to-external.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li class=\"hds-breadcrumb__item\" style={{this.itemStyle}} ...attributes>\n  {{#if @current}}\n    <div class=\"hds-breadcrumb__current\">\n      {{#if @icon}}\n        <div class=\"hds-breadcrumb__icon\">\n          <Hds::Icon @name={{@icon}} @size=\"16\" @stretched={{true}} />\n        </div>\n      {{/if}}\n      <span class=\"hds-breadcrumb__text\">{{@text}}</span>\n    </div>\n  {{else}}\n    {{#if @isRouteExternal}}\n      <this.linkToExternal\n        class=\"hds-breadcrumb__link\"\n        @current-when={{@current-when}}\n        @models={{hds-link-to-models @model @models}}\n        @query={{hds-link-to-query @query}}\n        @replace={{@replace}}\n        @route={{@route}}\n      >\n        {{#if @icon}}\n          <div class=\"hds-breadcrumb__icon\">\n            <Hds::Icon @name={{@icon}} @size=\"16\" @stretched={{true}} />\n          </div>\n        {{/if}}\n        <span class=\"hds-breadcrumb__text\">{{@text}}</span>\n      </this.linkToExternal>\n    {{else}}\n      <LinkTo\n        class=\"hds-breadcrumb__link\"\n        @current-when={{@current-when}}\n        @models={{hds-link-to-models @model @models}}\n        @query={{hds-link-to-query @query}}\n        @replace={{@replace}}\n        @route={{@route}}\n      >\n        {{#if @icon}}\n          <div class=\"hds-breadcrumb__icon\">\n            <Hds::Icon @name={{@icon}} @size=\"16\" @stretched={{true}} />\n          </div>\n        {{/if}}\n        <span class=\"hds-breadcrumb__text\">{{@text}}</span>\n      </LinkTo>\n    {{/if}}\n  {{/if}}\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsBreadcrumbItem extends Component {
  static {
    g(this.prototype, "linkToExternal", [tracked], function () {
      return null;
    });
  }
  #linkToExternal = (i(this, "linkToExternal"), void 0);
  constructor(owner, args) {
    super(owner, args);

    // we want to avoid resolving the component if it's not needed
    if (args.isRouteExternal) {
      void this.resolveLinkToExternal();
    }
  }
  async resolveLinkToExternal() {
    this.linkToExternal = await hdsResolveLinkToExternal(this.args.isRouteExternal);
  }

  /**
   * @param maxWidth
   * @type {string}
   * @default undefined
   * @description A parameter that can be applied to an "item" to limit its max-width
   */
  get maxWidth() {
    const {
      maxWidth
    } = this.args;
    if (maxWidth) {
      assert(`@maxWidth for "Hds::Breadcrumb::Item" must be a size as number in 'px' or in 'em' (eg. '200px' or '24em'); received: ${maxWidth}`, maxWidth.match(/^\d+(px|em)$/));
      return maxWidth;
    } else {
      return undefined;
    }
  }

  /**
   * Get the inline style to apply to the item.
   * @method BreadcrumbItem#itemStyle
   * @return {string} The "style" attribute to apply to the item.
   */
  get itemStyle() {
    if (this.maxWidth) {
      return htmlSafe(`max-width: ${this.maxWidth}`);
    } else {
      return undefined;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method BreadcrumbItem#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-breadcrumb__item'];
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsBreadcrumbItem);

export { HdsBreadcrumbItem as default };
//# sourceMappingURL=item.js.map
