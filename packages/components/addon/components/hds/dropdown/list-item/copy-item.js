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

    if (navigator.clipboard.readText) {
      const result = await navigator.clipboard.readText();

      if (result === this.args.text) {
        this.isSuccess = true;
      }
    } else {
      // assume that it works so Firefox can show the success state
      // doesn't confirm that you'll get the correct pasted text
      // but we accept this as a reasonable tradeoff
      // since users can always copy/paste manually.
      this.isSuccess = true;
    }

    // make it fade back to the default state
    setTimeout(() => {
      this.isSuccess = false;
    }, 1000);
  }
}
