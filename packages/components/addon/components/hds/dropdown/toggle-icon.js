import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class HdsDropdownToggleIconComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the `aria-label` applied to the toggle
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ToggleIcon" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * Indicates if a dropdown chevron icon should be displayed
   *
   * @param hasChevron
   * @type {boolean}
   * @default true
   */
  get hasChevron() {
    return this.args.hasChevron ?? true;
  }

  /**
   * Sets the icon name
   *
   * @param iconName
   * @type {string}
   * @default user
   */
  get iconName() {
    return this.args.iconName ?? 'user';
  }
}
