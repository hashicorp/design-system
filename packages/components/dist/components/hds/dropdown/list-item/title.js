import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text::Body\n  class=\"hds-dropdown-list-item hds-dropdown-list-item--variant-title\"\n  @tag=\"li\"\n  @size=\"100\"\n  @weight=\"semibold\"\n  @color=\"strong\"\n  ...attributes\n>\n  {{this.text}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsDropdownListItemTitleComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the item. If no text value is defined an error will be thrown
   */
  get text() {
    let {
      text
    } = this.args;
    assert('@text for "Hds::Dropdown::ListItem::Title" must have a valid value', text !== undefined);
    return text;
  }
}
setComponentTemplate(TEMPLATE, HdsDropdownListItemTitleComponent);

export { HdsDropdownListItemTitleComponent as default };
//# sourceMappingURL=title.js.map
