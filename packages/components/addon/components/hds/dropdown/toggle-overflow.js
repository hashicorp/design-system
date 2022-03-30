import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class HdsDropdownToggleOverflowComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the `aria-label` applied to the toggle
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ToggleOverflow" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * Get the class names to apply to the component.
   * @method #classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dropdown-toggle-overflow'];
    return classes.join(' ');
  }
}
