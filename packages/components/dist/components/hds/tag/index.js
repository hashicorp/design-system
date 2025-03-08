import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { modifier } from 'ember-modifier';
import { HdsTagColorValues, HdsTagTooltipPlacementValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body\n  class={{this.classNames}}\n  @tag=\"span\"\n  @size=\"100\"\n  @weight=\"medium\"\n  @color=\"primary\"\n  {{this._setUpObserver}}\n  ...attributes\n>\n  {{#if this.onDismiss}}\n    <button class=\"hds-tag__dismiss\" type=\"button\" aria-label={{this.ariaLabel}} {{on \"click\" this.onDismiss}}>\n      <Hds::Icon class=\"hds-tag__dismiss-icon\" @name=\"x\" @size=\"16\" />\n    </button>\n  {{/if}}\n  {{#if (or @href @route)}}\n    {{#if this._isTextOverflow}}\n      <Hds::Interactive\n        class=\"hds-tag__link\"\n        @current-when={{@current-when}}\n        @models={{hds-link-to-models @model @models}}\n        @query={{hds-link-to-query @query}}\n        @replace={{@replace}}\n        @route={{@route}}\n        @isRouteExternal={{@isRouteExternal}}\n        @href={{@href}}\n        @isHrefExternal={{@isHrefExternal}}\n        {{hds-tooltip this.text options=(hash placement=this.tooltipPlacement)}}\n      >\n        <div class=\"hds-tag__text-container\">\n          {{this.text}}\n        </div>\n      </Hds::Interactive>\n    {{else}}\n      <Hds::Interactive\n        class=\"hds-tag__link\"\n        @current-when={{@current-when}}\n        @models={{hds-link-to-models @model @models}}\n        @query={{hds-link-to-query @query}}\n        @replace={{@replace}}\n        @route={{@route}}\n        @isRouteExternal={{@isRouteExternal}}\n        @href={{@href}}\n        @isHrefExternal={{@isHrefExternal}}\n      >\n        <div class=\"hds-tag__text-container\">\n          {{this.text}}\n        </div>\n      </Hds::Interactive>\n    {{/if}}\n  {{else}}\n    {{#if this._isTextOverflow}}\n      <Hds::TooltipButton class=\"hds-tag__text\" @text={{this.text}} @placement={{this.tooltipPlacement}}>\n        <div class=\"hds-tag__text-container\">\n          {{this.text}}\n        </div>\n      </Hds::TooltipButton>\n    {{else}}\n      <span class=\"hds-tag__text\">\n        <div class=\"hds-tag__text-container\">\n          {{this.text}}\n        </div>\n      </span>\n    {{/if}}\n  {{/if}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const COLORS = Object.values(HdsTagColorValues);
const DEFAULT_COLOR = HdsTagColorValues.Primary;
const TOOLTIP_PLACEMENTS = Object.values(HdsTagTooltipPlacementValues);
const DEFAULT_TOOLTIP_PLACEMENT = HdsTagTooltipPlacementValues.Top;
class HdsTag extends Component {
  static {
    g(this.prototype, "_isTextOverflow", [tracked]);
  }
  #_isTextOverflow = (i(this, "_isTextOverflow"), undefined);
  _observer;
  _setUpObserver = modifier(element => {
    // Used to detect when text is clipped to one line, and tooltip should be added
    this._observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        this._isTextOverflow = this._isOverflow(entry.target.querySelector('.hds-tag__text-container'));
      });
    });
    this._observer.observe(element);
    return () => {
      this._observer.disconnect();
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
  _isOverflow(el) {
    return el.scrollHeight > el.clientHeight;
  }
}
setComponentTemplate(TEMPLATE, HdsTag);

export { COLORS, DEFAULT_COLOR, DEFAULT_TOOLTIP_PLACEMENT, TOOLTIP_PLACEMENTS, HdsTag as default };
//# sourceMappingURL=index.js.map
