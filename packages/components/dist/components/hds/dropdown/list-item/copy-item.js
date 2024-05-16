import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li class={{this.classNames}} ...attributes>\n  {{#if @copyItemTitle}}\n    <Hds::Text::Body\n      class=\"hds-dropdown-list-item__copy-item-title\"\n      @tag=\"div\"\n      @size=\"100\"\n      @weight=\"semibold\"\n      @color=\"faint\"\n    >{{@copyItemTitle}}</Hds::Text::Body>\n  {{/if}}\n  <Hds::Copy::Snippet @color=\"secondary\" @textToCopy={{this.text}} @isTruncated={{this.isTruncated}} />\n</li>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsDropdownListItemCopyItemComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the item. If no text value is defined an error will be thrown
   */
  get text() {
    let {
      text
    } = this.args;
    assert('@text for "Hds::Dropdown::ListItem::CopyItem" must have a valid value', text !== undefined);
    return text;
  }

  /**
   * @param isTruncated
   * @type {boolean}
   * @default true
   * @description Indicates that the text should be truncated instead of wrapping and using multiple lines.
   */
  get isTruncated() {
    let {
      isTruncated = true
    } = this.args;
    return isTruncated;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dropdown-list-item', 'hds-dropdown-list-item--variant-copy-item'];
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsDropdownListItemCopyItemComponent);

export { HdsDropdownListItemCopyItemComponent as default };
//# sourceMappingURL=copy-item.js.map
