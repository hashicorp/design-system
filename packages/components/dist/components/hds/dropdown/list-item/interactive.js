import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li class={{this.classNames}}>\n  {{#if @isLoading}}\n    <div class=\"hds-dropdown-list-item__interactive-loading-wrapper\" ...attributes>\n      <div class=\"hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--leading\">\n        <FlightIcon @name=\"loading\" @isInlineBlock={{false}} />\n      </div>\n      <Hds::Text::Body @tag=\"div\" @size=\"100\" @weight=\"regular\" class=\"hds-dropdown-list-item__interactive-text\">\n        {{this.text}}\n      </Hds::Text::Body>\n    </div>\n  {{else}}\n    <Hds::Interactive\n      @current-when={{@current-when}}\n      @models={{hds-link-to-models @model @models}}\n      @query={{hds-link-to-query @query}}\n      @replace={{@replace}}\n      @route={{@route}}\n      @isRouteExternal={{@isRouteExternal}}\n      @href={{@href}}\n      @isHrefExternal={{@isHrefExternal}}\n      ...attributes\n    >\n      {{#if @icon}}\n        <span class=\"hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--leading\">\n          <FlightIcon @name={{@icon}} @isInlineBlock={{false}} />\n        </span>\n      {{/if}}\n      <Hds::Text::Body class=\"hds-dropdown-list-item__interactive-text\" @tag=\"span\" @size=\"200\" @weight=\"medium\">\n        {{this.text}}\n      </Hds::Text::Body>\n      {{#if @trailingIcon}}\n        <span class=\"hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--trailing\">\n          <FlightIcon @name={{@trailingIcon}} @isInlineBlock={{false}} />\n        </span>\n      {{/if}}\n    </Hds::Interactive>\n  {{/if}}\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_COLOR = 'action';
const COLORS = ['action', 'critical'];
class HdsDropdownListItemInteractiveComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the item. If no text value is defined an error will be thrown
   */
  get text() {
    let {
      text
    } = this.args;
    assert('@text for "Hds::Dropdown::ListItem::Interactive" must have a valid value', text !== undefined);
    return text;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of the item (when item is set to interactive)
   */
  get color() {
    let {
      color = DEFAULT_COLOR
    } = this.args;
    assert(`@color for "Hds::Dropdown::ListItem::Interactive" must be one of the following: ${COLORS.join(', ')}; received: ${color}`, COLORS.includes(color));
    return color;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dropdown-list-item', 'hds-dropdown-list-item--variant-interactive'];

    // add a class based on the @color argument
    classes.push(`hds-dropdown-list-item--color-${this.color}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsDropdownListItemInteractiveComponent);

export { COLORS, DEFAULT_COLOR, HdsDropdownListItemInteractiveComponent as default };
//# sourceMappingURL=interactive.js.map
