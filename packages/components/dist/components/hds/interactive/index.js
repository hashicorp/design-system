import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { hdsResolveLinkToExternal } from '../../../utils/hds-resolve-link-to-external.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! IMPORTANT: we removed the newlines before/after the yield to reduce the issues with unexpected whitespaces (see https://github.com/hashicorp/design-system/pull/231#issuecomment-1123502499) }}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember becomes visible in the link (being an inline element) - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n{{! NOTICE: we can\'t support the direct use of the \"href\" HTML attribute via ...attributes in the <a> elements, because we need to rely on the \"@href\" Ember argument to differentiate between different types of generated output }}\n{{~#if @route~}}\n  {{~#if this.isRouteExternal~}}\n    <this.linkToExternal\n      @current-when={{@current-when}}\n      @models={{hds-link-to-models @model @models}}\n      @query={{hds-link-to-query @query}}\n      @replace={{@replace}}\n      @route={{@route}}\n      ...attributes\n    >{{yield}}</this.linkToExternal>\n  {{~else~}}\n    <LinkTo\n      @current-when={{@current-when}}\n      @models={{hds-link-to-models @model @models}}\n      @query={{hds-link-to-query @query}}\n      @replace={{@replace}}\n      @route={{@route}}\n      ...attributes\n    >{{yield}}</LinkTo>\n  {{~/if~}}\n{{~else if @href~}}\n  {{~#if this.isHrefExternal~}}\n    <a target=\"_blank\" rel=\"noopener noreferrer\" ...attributes href={{@href}} {{on \"keyup\" this.onKeyUp}}>{{yield}}</a>\n  {{~else~}}\n    <a ...attributes href={{@href}} {{on \"keyup\" this.onKeyUp}}>{{yield}}</a>\n  {{~/if~}}\n{{~else~}}\n  <button type=\"button\" ...attributes>{{yield}}</button>\n{{~/if~}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsInteractive extends Component {
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
   * Determines if a @href value is "external" (it adds target="_blank" rel="noopener noreferrer")
   *
   * @param isHrefExternal
   * @type boolean
   * @default true
   */
  get isHrefExternal() {
    return this.args.isHrefExternal ?? true;
  }

  /**
   * Determines if a @route value is "external" (uses the LinkToExternal component instead of LinkTo)
   *
   * @param isRouteExternal
   * @type boolean
   * @default false
   */
  get isRouteExternal() {
    return this.args.isRouteExternal ?? false;
  }
  onKeyUp(event) {
    if (event.key === ' ' || event.code === 'Space') {
      event.target.click();
    }
  }
  static {
    n(this.prototype, "onKeyUp", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsInteractive);

export { HdsInteractive as default };
//# sourceMappingURL=index.js.map
