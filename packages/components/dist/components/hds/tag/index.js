import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body class={{this.classNames}} @tag=\"span\" @size=\"100\" @weight=\"medium\" @color=\"primary\" ...attributes>\n  {{#if this.onDismiss}}\n    <button class=\"hds-tag__dismiss\" type=\"button\" aria-label={{this.ariaLabel}} {{on \"click\" this.onDismiss}}>\n      <FlightIcon class=\"hds-tag__dismiss-icon\" @name=\"x\" @size=\"16\" @isInlineBlock={{false}} />\n    </button>\n  {{/if}}\n  {{#if (or @href @route)}}\n    <Hds::Interactive\n      class=\"hds-tag__link\"\n      @current-when={{@current-when}}\n      @models={{hds-link-to-models @model @models}}\n      @query={{hds-link-to-query @query}}\n      @replace={{@replace}}\n      @route={{@route}}\n      @isRouteExternal={{@isRouteExternal}}\n      @href={{@href}}\n      @isHrefExternal={{@isHrefExternal}}\n    >\n      {{this.text}}\n    </Hds::Interactive>\n  {{else}}\n    <span class=\"hds-tag__text\">\n      {{this.text}}\n    </span>\n  {{/if}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_COLOR = 'primary';
const COLORS = ['primary', 'secondary'];
class HdsTagIndexComponent extends Component {
  /**
   * @param onDismiss
   * @type {function}
   * @default () => {}
   */
  get onDismiss() {
    let {
      onDismiss
    } = this.args;
    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return false;
    }
  }

  /**
   * @param text
   * @type {string}
   * @description The text of the tag. If no text value is defined, an error will be thrown.
   */
  get text() {
    let {
      text
    } = this.args;
    assert('@text for "Hds::Tag" must have a valid value', text !== undefined);
    return text;
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Dismiss'
   */
  get ariaLabel() {
    let tagAriaLabel = this.args.ariaLabel ?? 'Dismiss';
    return tagAriaLabel + ' ' + this.args.text;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
   */
  get color() {
    if (this.args.href || this.args.route) {
      let {
        color = DEFAULT_COLOR
      } = this.args;
      assert(`@color for "Hds::Tag" must be one of the following: ${COLORS.join(', ')}; received: ${color}`, COLORS.includes(color));
      return color;
    } else if (this.args.color) {
      assert('@color can only be applied to "Hds::Tag" along with either @href or @route', this.args.href || this.args.route);
    }
    return false;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tag'];

    // add a class based on the @color argument
    if (this.color) {
      classes.push(`hds-tag--color-${this.color}`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTagIndexComponent);

export { COLORS, DEFAULT_COLOR, HdsTagIndexComponent as default };
//# sourceMappingURL=index.js.map
