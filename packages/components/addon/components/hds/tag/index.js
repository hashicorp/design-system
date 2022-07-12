import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class HdsTagIndexComponent extends Component {
  /**
   * @param onDismiss
   * @type {function}
   * @default () => {}
   */
  get onDismiss() {
    let { onDismiss } = this.args;

    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return false;
    }
  }

  /**
   * @param text
   * @type {string}
   * @description The text of the tag. If no text value is defined, an error will be thrown.
   */
  get text() {
    let { text } = this.args;

    assert('@text for "Hds::Tag" must have a valid value', text !== undefined);

    return text;
  }
}
