import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsLinkIconPositionValues, HdsLinkColorValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! IMPORTANT: we removed the newlines before/after the yield to reduce the issues with unexpected whitespaces (see https://github.com/hashicorp/design-system/pull/231#issuecomment-1123502499) }}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember becomes visible in the link (being an inline element) - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n<Hds::Interactive\n  class={{this.classNames}}\n  @current-when={{@current-when}}\n  @models={{hds-link-to-models @model @models}}\n  @query={{hds-link-to-query @query}}\n  @replace={{@replace}}\n  @route={{@route}}\n  @isRouteExternal={{@isRouteExternal}}\n  @href={{@href}}\n  @isHrefExternal={{@isHrefExternal}}\n  ...attributes\n>{{#if (and @icon (eq this.iconPosition \"leading\"))~}}\n    <span class=\"hds-link-inline__icon hds-link-inline__icon--leading\">\n      <FlightIcon @name={{@icon}} @size=\"16\" @stretched={{true}} />\n    </span>\n  {{~/if~}}{{yield}}{{~#if (and @icon (eq this.iconPosition \"trailing\"))~}}\n    <span class=\"hds-link-inline__icon hds-link-inline__icon--trailing\">\n      <FlightIcon @name={{@icon}} @size=\"16\" @stretched={{true}} />\n    </span>\n  {{~/if}}</Hds::Interactive>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_ICONPOSITION = HdsLinkIconPositionValues.Trailing;
const DEFAULT_COLOR = HdsLinkColorValues.Primary;
const ICONPOSITIONS = Object.values(HdsLinkIconPositionValues);
const COLORS = Object.values(HdsLinkColorValues);
class HdsLinkInlineComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    if (!(this.args.href || this.args.route)) {
      assert('@href or @route must be defined for <Hds::Link::Inline>');
    }
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
   */
  get color() {
    const {
      color = DEFAULT_COLOR
    } = this.args;
    assert(`@color for "Hds::Link::Inline" must be one of the following: ${COLORS.join(', ')}; received: ${color}`, COLORS.includes(color));
    return color;
  }

  /**
   * @param iconPosition
   * @type {HdsLinkIconPositions}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPosition() {
    const {
      iconPosition = DEFAULT_ICONPOSITION
    } = this.args;
    assert(`@iconPosition for "Hds::Link::Inline" must be one of the following: ${ICONPOSITIONS.join(', ')}; received: ${iconPosition}`, ICONPOSITIONS.includes(iconPosition));
    return iconPosition;
  }

  /**
   * Get the class names to apply to the component.
   * @method LinkInline#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-link-inline'];

    // add a class based on the @color argument
    classes.push(`hds-link-inline--color-${this.color}`);

    // add a class based on the @iconPosition argument
    classes.push(`hds-link-inline--icon-${this.iconPosition}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsLinkInlineComponent);

export { COLORS, DEFAULT_COLOR, DEFAULT_ICONPOSITION, ICONPOSITIONS, HdsLinkInlineComponent as default };
//# sourceMappingURL=inline.js.map
