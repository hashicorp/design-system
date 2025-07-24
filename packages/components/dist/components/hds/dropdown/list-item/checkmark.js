import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! template-lint-disable no-invalid-role require-context-role require-presentational-children }}\n<li class={{this.classNames}} role=\"none\">\n  <Hds::Interactive\n    @current-when={{@current-when}}\n    @models={{hds-link-to-models @model @models}}\n    @query={{hds-link-to-query @query}}\n    @replace={{@replace}}\n    @route={{@route}}\n    @isRouteExternal={{@isRouteExternal}}\n    @href={{@href}}\n    @isHrefExternal={{@isHrefExternal}}\n    class=\"hds-dropdown-list-item__interactive\"\n    ...attributes\n    role=\"option\"\n    aria-selected={{if @selected \"true\" \"false\"}}\n  >\n    {{#if @icon}}\n      <span class=\"hds-dropdown-list-item__interactive-icon hds-dropdown-list-item__interactive-icon--leading\">\n        <Hds::Icon @name={{@icon}} />\n      </span>\n    {{/if}}\n    <Hds::Text::Body\n      @tag=\"span\"\n      @size=\"200\"\n      @weight=\"medium\"\n      class=\"hds-dropdown-list-item__interactive-text\"\n    >{{yield}}</Hds::Text::Body>\n    {{#if @count}}\n      <Hds::Text::Body\n        class=\"hds-dropdown-list-item__count\"\n        @tag=\"span\"\n        @size=\"100\"\n        @weight=\"medium\"\n        @color=\"faint\"\n      >{{@count}}</Hds::Text::Body>\n    {{/if}}\n    <span class=\"hds-dropdown-list-item__checkmark\">\n      {{#if @selected}}\n        <Hds::Icon class=\"hds-dropdown-list-item__checkmark-icon\" @name=\"check\" />\n      {{/if}}\n    </span>\n  </Hds::Interactive>\n</li>\n{{! template-lint-enable no-invalid-role require-context-role require-presentational-children }}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsDropdownListItemCheckmark extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-dropdown-list-item', 'hds-dropdown-list-item--color-action', 'hds-dropdown-list-item--variant-checkmark'];

    // add a class based on the @selected argument
    if (this.args.selected) {
      classes.push('hds-dropdown-list-item--variant-checkmark-selected');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsDropdownListItemCheckmark);

export { HdsDropdownListItemCheckmark as default };
//# sourceMappingURL=checkmark.js.map
