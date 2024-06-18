import Component from '@glimmer/component';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<li class=\"hds-dropdown-list-item hds-dropdown-list-item--variant-checkbox\">\n  <label class=\"hds-dropdown-list-item__label hds-typography-body-200\" for={{this.id}}>\n    <Hds::Form::Checkbox::Base class=\"hds-dropdown-list-item__control\" id={{this.id}} @value={{@value}} ...attributes />\n    {{#if @icon}}\n      <span class=\"hds-dropdown-list-item__icon\">\n        <FlightIcon @name={{@icon}} @isInlineBlock={{false}} />\n      </span>\n    {{/if}}\n    <span class=\"hds-dropdown-list-item__text-content\">{{yield}}</span>\n\n    {{#if @count}}\n      <span class=\"hds-dropdown-list-item__count hds-typography-body-100 hds-font-weight-medium\">{{@count}}</span>\n    {{/if}}\n  </label>\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsDropdownListItemCheckboxComponent extends Component {
  /**
   * Determines the unique ID to assign to the checkbox control
   */
  get id() {
    return getElementId(this);
  }
}
setComponentTemplate(TEMPLATE, HdsDropdownListItemCheckboxComponent);

export { HdsDropdownListItemCheckboxComponent as default };
//# sourceMappingURL=checkbox.js.map
