import { _ as _applyDecoratedDescriptor } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! IMPORTANT: we removed the newlines before/after the yield to reduce the issues with unexpected whitespaces (see https://github.com/hashicorp/design-system/pull/231#issuecomment-1123502499) }}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember becomes visible in the link (being an inline element) - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n{{! NOTICE: we can\'t support the direct use of the \"href\" HTML attribute via ...attributes in the <a> elements, because we need to rely on the \"@href\" Ember argument to differentiate between different types of generated output }}\n{{~#if @route~}}\n  {{~#if this.isRouteExternal~}}\n    <LinkToExternal\n      @current-when={{@current-when}}\n      @models={{hds-link-to-models @model @models}}\n      @query={{hds-link-to-query @query}}\n      @replace={{@replace}}\n      @route={{@route}}\n      ...attributes\n    >{{yield}}</LinkToExternal>\n  {{~else~}}\n    <LinkTo\n      @current-when={{@current-when}}\n      @models={{hds-link-to-models @model @models}}\n      @query={{hds-link-to-query @query}}\n      @replace={{@replace}}\n      @route={{@route}}\n      ...attributes\n    >{{yield}}</LinkTo>\n  {{~/if~}}\n{{~else if @href~}}\n  {{~#if this.isHrefExternal~}}\n    <a target=\"_blank\" rel=\"noopener noreferrer\" ...attributes href={{@href}} {{on \"keyup\" this.onKeyUp}}>{{yield}}</a>\n  {{~else~}}\n    <a ...attributes href={{@href}} {{on \"keyup\" this.onKeyUp}}>{{yield}}</a>\n  {{~/if~}}\n{{~else~}}\n  <button type=\"button\" ...attributes>{{yield}}</button>\n{{~/if~}}");

var _class;
let HdsInteractiveComponent = (_class = class HdsInteractiveComponent extends Component {
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
}, (_applyDecoratedDescriptor(_class.prototype, "onKeyUp", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onKeyUp"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsInteractiveComponent);

export { HdsInteractiveComponent as default };
//# sourceMappingURL=index.js.map
