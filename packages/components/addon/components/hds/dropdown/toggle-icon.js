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
   * Indicates if a dropdown chevron icon should be displayed; should be displayed unless the "more-horizontal" icon is used.
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
   * @param icon
   * @type {string}
   * @default user
   */
  get icon() {
    return this.args.icon ?? 'user';
  }
}
