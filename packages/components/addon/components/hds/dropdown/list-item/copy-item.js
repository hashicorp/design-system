import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HdsDropdownListItemCopyItemComponent extends Component {
  @tracked isSuccess = false;

  /**
   * @param text
   * @type {string}
   * @description The text of the item. If no text value is defined an error will be thrown
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
    // Write the text to be copied to the clipboard.
    // If the text in the clipboard is the same as the text to be copied, then set isSuccess to true.
    // Using the native web api for clipboard: 
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard
    navigator.clipboard.writeText(this.args.text);
    navigator.clipboard.readText().then((result) => {
      if (result === this.args.text) {
        this.isSuccess = true;
        // return result;
        // console.log(`result is ${result}`);
      } 
    });
  }
}
