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
  async copyCode() {
    let copyText = await this.args.text;
    // execCommand is supposedly deprecated but it's also what Firefox says to do in this situation so we'll try it
    await document.execCommand('copy', false, copyText || '');

    if (copyText === this.args.text) {
      this.isSuccess = true;
      console.log(`success: ${this.isSuccess}; copied text: ${copyText}`);
      // make it fade back to the default state
      setTimeout(() => {
        this.isSuccess = false;
      }, 1000);
    }
  }
}
