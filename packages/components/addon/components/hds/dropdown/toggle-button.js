import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_COLOR = 'primary';
export const COLORS = ['primary', 'secondary'];

const NOOP = () => {};

export default class HdsDropdownToggleButtonComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the button. If no text value is defined an error will be thrown.
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ToggleButton" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of button to be used; acceptable values are `primary` and  `secondary`
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Dropdown::ToggleButton" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick() {
    let { onClick } = this.args;

    // notice: this is a guard used in case the toggle is used as standalone element (eg. in the showcase)
    // in reality it's always used inside the Dropdown main component as yielded component, so the onClick handler is always defined
    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method ToggleButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dropdown-toggle-button'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-dropdown-toggle-button--is-open');
    }

    return classes.join(' ');
  }
}
