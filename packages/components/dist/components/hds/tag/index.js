import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TrackedWeakSet } from 'tracked-built-ins';
import { assert } from '@ember/debug';
import { modifier } from 'ember-modifier';
import { HdsTagTooltipPlacementValues, HdsTagColorValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<span class={{this.classNames}} {{this._setUpObserver}} ...attributes>\n  {{#if this.onDismiss}}\n    <button class=\"hds-tag__dismiss\" type=\"button\" aria-label={{this.ariaLabel}} {{on \"click\" this.onDismiss}}>\n      <Hds::Icon class=\"hds-tag__dismiss-icon\" @name=\"x\" @size=\"16\" />\n    </button>\n  {{/if}}\n  {{#if (or @href @route)}}\n    {{#if this._isTextOverflow}}\n      <Hds::Interactive\n        class=\"hds-tag__link\"\n        @current-when={{@current-when}}\n        @models={{hds-link-to-models @model @models}}\n        @query={{hds-link-to-query @query}}\n        @replace={{@replace}}\n        @route={{@route}}\n        @isRouteExternal={{@isRouteExternal}}\n        @href={{@href}}\n        @isHrefExternal={{@isHrefExternal}}\n        {{hds-tooltip this.text options=(hash placement=this.tooltipPlacement)}}\n      >\n        <Hds::Text::Body @tag=\"span\" @size=\"100\" @weight=\"medium\" class=\"hds-tag__text-container\">\n          {{this.text}}\n        </Hds::Text::Body>\n      </Hds::Interactive>\n    {{else}}\n      <Hds::Interactive\n        class=\"hds-tag__link\"\n        @current-when={{@current-when}}\n        @models={{hds-link-to-models @model @models}}\n        @query={{hds-link-to-query @query}}\n        @replace={{@replace}}\n        @route={{@route}}\n        @isRouteExternal={{@isRouteExternal}}\n        @href={{@href}}\n        @isHrefExternal={{@isHrefExternal}}\n      >\n        <Hds::Text::Body @tag=\"span\" @size=\"100\" @weight=\"medium\" class=\"hds-tag__text-container\">\n          {{this.text}}\n        </Hds::Text::Body>\n      </Hds::Interactive>\n    {{/if}}\n  {{else}}\n    {{#if this._isTextOverflow}}\n      <Hds::TooltipButton class=\"hds-tag__text\" @text={{this.text}} @placement={{this.tooltipPlacement}}>\n        <Hds::Text::Body @tag=\"span\" @size=\"100\" @weight=\"medium\" class=\"hds-tag__text-container\">\n          {{this.text}}\n        </Hds::Text::Body>\n      </Hds::TooltipButton>\n    {{else}}\n      <span class=\"hds-tag__text\">\n        <Hds::Text::Body @tag=\"span\" @size=\"100\" @weight=\"medium\" class=\"hds-tag__text-container\">\n          {{this.text}}\n        </Hds::Text::Body>\n      </span>\n    {{/if}}\n  {{/if}}\n</span>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const COLORS = Object.values(HdsTagColorValues);
const DEFAULT_COLOR = HdsTagColorValues.Primary;
const TOOLTIP_PLACEMENTS = Object.values(HdsTagTooltipPlacementValues);
const DEFAULT_TOOLTIP_PLACEMENT = HdsTagTooltipPlacementValues.Top;
const overflowed = new TrackedWeakSet();
const observer = new ResizeObserver(entries => {
  entries.forEach(entry => {
    const textContainer = entry.target.querySelector('.hds-tag__text-container');
    if (textContainer && textContainer.scrollHeight > textContainer.clientHeight) {
      overflowed.add(entry.target);
    } else {
      overflowed.delete(entry.target);
    }
  });
});
class HdsTag extends Component {
  static {
    g(this.prototype, "_element", [tracked]);
  }
  #_element = (i(this, "_element"), void 0);
  get _isTextOverflow() {
    if (!this._element) {
      return false;
    }
    return overflowed.has(this._element);
  }
  _setUpObserver = modifier(element => {
    this._element = element;
    observer.observe(element);
    return () => {
      if (this._element) {
        observer.unobserve(this._element);
      }
      delete this._element;
    };
  });

  /**
   * @param tooltioPlacement
   * @type {string}
   * @default top
   * @description The placement property of the tooltip attached to the tag text.
   */
  get tooltipPlacement() {
    const {
      tooltipPlacement = DEFAULT_TOOLTIP_PLACEMENT
    } = this.args;
    assert('@tooltipPlacement for "Hds::Tag" must have a valid value', tooltipPlacement == undefined || TOOLTIP_PLACEMENTS.includes(tooltipPlacement));
    return tooltipPlacement;
  }

  /**
   * @param onDismiss
   * @type {function}
   * @default () => {}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss() {
    const {
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
    const {
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
    const tagAriaLabel = this.args.ariaLabel ?? 'Dismiss';
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
      const {
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
    const classes = ['hds-tag'];

    // add a class based on the @color argument
    if (this.color) {
      classes.push(`hds-tag--color-${this.color}`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTag);

export { COLORS, DEFAULT_COLOR, DEFAULT_TOOLTIP_PLACEMENT, TOOLTIP_PLACEMENTS, HdsTag as default };
//# sourceMappingURL=index.js.map
