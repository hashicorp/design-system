import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_COLOR = 'primary';
export const COLORS = ['primary', 'secondary'];

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

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Tag" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tag'];

    // add a class based on the @color argument
    classes.push(`hds-tag--color-${this.color}`);

    return classes.join(' ');
  }
}
