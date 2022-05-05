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
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard
    await navigator.clipboard.writeText(this.args.text);
    const result = await navigator.clipboard.readText();

    if (result === this.args.text) {
      this.isSuccess = true;
      // console.log(`result is ${result}`);

      // make it fade back to the default state
      setTimeout(() => {
        this.isSuccess = false;
      }, 1000);
    }
  }
}
