import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class HdsDropdownToggleUserComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the `aria-label` applied to the toggle
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ToggleUser" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * Get the class names to apply to the component.
   * @method Button#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dropdown-toggle-user'];

    return classes.join(' ');
  }
}
