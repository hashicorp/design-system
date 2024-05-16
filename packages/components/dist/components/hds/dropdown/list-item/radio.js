import Component from '@glimmer/component';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<li class=\"hds-dropdown-list-item hds-dropdown-list-item--variant-radio\">\n  <label class=\"hds-dropdown-list-item__label hds-typography-body-200\" for={{this.id}}>\n    <Hds::Form::Radio::Base class=\"hds-dropdown-list-item__control\" id={{this.id}} @value={{@value}} ...attributes />\n    {{#if @icon}}\n      <div class=\"hds-dropdown-list-item__icon\">\n        <FlightIcon @name={{@icon}} @isInlineBlock={{false}} />\n      </div>\n    {{/if}}\n    <span class=\"hds-dropdown-list-item__text-content\">{{yield}}</span>\n\n    {{#if @count}}\n      <Hds::Text::Body\n        class=\"hds-dropdown-list-item__count\"\n        @tag=\"span\"\n        @size=\"100\"\n        @weight=\"medium\"\n      >{{@count}}</Hds::Text::Body>\n    {{/if}}\n  </label>\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsDropdownListItemRadioComponent extends Component {
  /**
   * Determines the unique ID to assign to the radio control
   */
  get id() {
    return getElementId(this);
  }
}
setComponentTemplate(TEMPLATE, HdsDropdownListItemRadioComponent);

export { HdsDropdownListItemRadioComponent as default };
//# sourceMappingURL=radio.js.map
