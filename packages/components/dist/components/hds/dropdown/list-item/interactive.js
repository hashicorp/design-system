import Component from '@glimmer/component';
import { deprecate, assert } from '@ember/debug';
import { HdsDropdownListItemInteractiveColorValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li class={{this.classNames}}>\n  {{#if @isLoading}}\n    <div class=\"hds-dropdown-list-item__interactive-loading-wrapper\" ...attributes>\n      <div class=\"hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--leading\">\n        <Hds::Icon @name=\"loading\" />\n      </div>\n      <Hds::Text::Body @tag=\"div\" @size=\"100\" @weight=\"regular\" class=\"hds-dropdown-list-item__interactive-text\">\n        {{#if (has-block)}}\n          {{yield (hash Badge=(component \"hds/badge\" size=\"small\"))}}\n        {{else}}\n          {{this.text}}\n        {{/if}}\n      </Hds::Text::Body>\n    </div>\n  {{else}}\n    <Hds::Interactive\n      @current-when={{@current-when}}\n      @models={{hds-link-to-models @model @models}}\n      @query={{hds-link-to-query @query}}\n      @replace={{@replace}}\n      @route={{@route}}\n      @isRouteExternal={{@isRouteExternal}}\n      @href={{@href}}\n      @isHrefExternal={{@isHrefExternal}}\n      ...attributes\n    >\n      {{#if @icon}}\n        <span class=\"hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--leading\">\n          <Hds::Icon @name={{@icon}} />\n        </span>\n      {{/if}}\n      <Hds::Text::Body class=\"hds-dropdown-list-item__interactive-text\" @tag=\"span\" @size=\"200\" @weight=\"medium\">\n        {{#if (has-block)}}\n          {{yield (hash Badge=(component \"hds/badge\" size=\"small\"))}}\n        {{else}}\n          {{this.text}}\n        {{/if}}\n      </Hds::Text::Body>\n      {{#if @trailingIcon}}\n        <span class=\"hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--trailing\">\n          <Hds::Icon @name={{@trailingIcon}} />\n        </span>\n      {{/if}}\n    </Hds::Interactive>\n  {{/if}}\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_COLOR = HdsDropdownListItemInteractiveColorValues.Action;
const COLORS = Object.values(HdsDropdownListItemInteractiveColorValues);
class HdsDropdownListItemInteractive extends Component {
  constructor(owner, args) {
    super(owner, args);
    if (args.text !== undefined) {
      deprecate('The `@text` argument for "Hds::Dropdown::ListItem::Interactive" has been deprecated. Please put text in the yielded block.', false, {
        id: 'hds.dropdown.list-item.interactive',
        until: '5.0.0',
        url: 'https://helios.hashicorp.design/components/dropdown?tab=version%20history#4100',
        for: '@hashicorp/design-system-components',
        since: {
          available: '4.10.0',
          enabled: '5.0.0'
        }
      });
    }
  }
  get text() {
    const {
      text
    } = this.args;
    assert('@text for "Hds::Dropdown::ListItem::Interactive" must have a valid value', text !== undefined);
    return text;
  }
  get color() {
    const {
      color = DEFAULT_COLOR
    } = this.args;
    assert(`@color for "Hds::Dropdown::ListItem::Interactive" must be one of the following: ${COLORS.join(', ')}; received: ${color}`, COLORS.includes(color));
    return color;
  }
  get classNames() {
    const classes = ['hds-dropdown-list-item', 'hds-dropdown-list-item--variant-interactive'];

    // add a class based on the @color argument
    classes.push(`hds-dropdown-list-item--color-${this.color}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsDropdownListItemInteractive);

export { COLORS, DEFAULT_COLOR, HdsDropdownListItemInteractive as default };
//# sourceMappingURL=interactive.js.map
