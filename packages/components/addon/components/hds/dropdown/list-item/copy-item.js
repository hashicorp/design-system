import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsDropdownListItemCopyItemComponent extends Component {
  @tracked isSuccess = this.args.isSuccess ?? false;

  /**
   * @param text
   * @type {string}
   * @description The text of the item. If no text value is defined an error will be thrown unless it is the generic or separator item type.
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ListItem::CopyItem" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = [
      'hds-dropdown-list-item',
      'hds-dropdown-list-item--copy-item',
    ];

    return classes.join(' ');
  }

  @action
  copyCode() {
    navigator.clipboard.writeText(this.args.text);
    // this if statement resolves to [object Promise] so maybe some improvements
    // could be made here
    if (navigator.clipboard.readText()) {
      this.isSuccess = true;
    }
  }
}
