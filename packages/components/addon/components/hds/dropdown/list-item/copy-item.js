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
    let copyText = this.args.text;
    // https://codepen.io/chrisdavidmills/full/gzYjag/
    // execCommand is supposedly deprecated but it's also what Firefox says to do in this situation so we'll try it
    // also execCommand is synchronous so we can't await it
    document.execCommand('copy', false, copyText || '');

    if (copyText === this.args.text) {
      this.isSuccess = true;
      // if you un-comment the next line you'll see what you expect in the browser when you visit the showcase for this component.
      // console.log(`success: ${this.isSuccess}; copied text: ${copyText}`);
      // make it fade back to the default state
      setTimeout(() => {
        this.isSuccess = false;
      }, 1000);
    }
  }
}
