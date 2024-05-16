import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n{{! template-lint-disable no-invalid-role require-context-role require-presentational-children }}\n<li class={{this.classNames}} role=\"none\">\n  <Hds::Interactive\n    @current-when={{@current-when}}\n    @models={{hds-link-to-models @model @models}}\n    @query={{hds-link-to-query @query}}\n    @replace={{@replace}}\n    @route={{@route}}\n    @isRouteExternal={{@isRouteExternal}}\n    @href={{@href}}\n    @isHrefExternal={{@isHrefExternal}}\n    class=\"hds-dropdown-list-item__interactive\"\n    ...attributes\n    role=\"option\"\n    aria-selected={{if @selected \"true\" \"false\"}}\n  >\n    {{#if @icon}}\n      <span class=\"hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--leading\">\n        <FlightIcon @name={{@icon}} @isInlineBlock={{false}} />\n      </span>\n    {{/if}}\n    <Hds::Text::Body @tag=\"span\" @size=\"200\" @weight=\"medium\" class=\"hds-dropdown-list-item__interactive-text\">\n      {{yield}}\n    </Hds::Text::Body>\n    {{#if @count}}\n      <Hds::Text::Body\n        class=\"hds-dropdown-list-item__count\"\n        @tag=\"span\"\n        @size=\"100\"\n        @weight=\"medium\"\n        @color=\"faint\"\n      >{{@count}}</Hds::Text::Body>\n    {{/if}}\n    <span class=\"hds-dropdown-list-item__checkmark\">\n      {{#if @selected}}\n        <FlightIcon class=\"hds-dropdown-list-item__checkmark-icon\" @name=\"check\" @isInlineBlock={{false}} />\n      {{/if}}\n    </span>\n  </Hds::Interactive>\n</li>\n{{! template-lint-enable no-invalid-role require-context-role require-presentational-children }}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsDropdownListItemCheckmarkComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dropdown-list-item', 'hds-dropdown-list-item--color-action', 'hds-dropdown-list-item--variant-checkmark'];

    // add a class based on the @selected argument
    if (this.args.selected) {
      classes.push('hds-dropdown-list-item--variant-checkmark-selected');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsDropdownListItemCheckmarkComponent);

export { HdsDropdownListItemCheckmarkComponent as default };
//# sourceMappingURL=checkmark.js.map
