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
   * @param isDisabled
   * @type {boolean}
   * @default null
   * @description Sets the native HTML attribute `disabled` on the button element. Default is null (doesn't render the attribute).
   */
  get isDisabled() {
    return this.args.isDisabled ?? null;
  }

  /**
   * Get the class names to apply to the component.
   * @method Button#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dropdown-toggle', 'hds-dropdown-toggle-user'];

    return classes.join(' ');
  }
}
