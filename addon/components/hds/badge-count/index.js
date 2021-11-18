import Component from '@glimmer/component';
import { assert } from '@ember/debug';

const DEFAULT_SIZE = 'medium';
const DEFAULT_TYPE = 'filled';
const DEFAULT_COLOR = 'neutral';
const SIZES = ['small', 'medium', 'large'];
const TYPES = ['filled', 'inverted', 'outlined'];
const COLORS = ['neutral', 'neutral-dark-mode'];

export default class HdsBadgeCountIndexComponent extends Component {
  /**
   * Sets the size for the component
   * Accepted sizes: small, medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    if (size) {
      assert(
        `@size for ${this.toString()} must be one of the following: ${SIZES.join(
          ', '
        )}, received: ${size}`,
        SIZES.includes(size)
      );
    }

    return size;
  }

  /**
   * Get a class to apply to the component based on the size argument.
   * @method BadgeCount#sizeClass
   * @return {string} The css class to apply to the component.
   */
  get sizeClass() {
    return `hds-badge-count--size-${this.size}`;
  }

  /**
   * Sets the type of the component
   * Accepted values: filled, inverted, outlined
   *
   * @param type
   * @type {string}
   * @default 'filled'
   */
  get type() {
    let { type = DEFAULT_TYPE } = this.args;

    if (type) {
      assert(
        `@type for ${this.toString()} must be one of the following: ${TYPES.join(
          ', '
        )}, received: ${type}`,
        TYPES.includes(type)
      );
    }

    return type;
  }

  /**
   * Get a class to apply to the component based on the type argument.
   * @method BadgeCount#typeClass
   * @return {string} The css class to apply to the component.
   */
  get typeClass() {
    return `hds-badge-count--type-${this.type}`;
  }

  /**
   * Sets the color scheme for the component
   * Accepted colors: neutral, neutral-dark-mode
   *
   * @param color
   * @type {string}
   * @default 'neutral'
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    if (color) {
      assert(
        `@color for ${this.toString()} must be one of the following: ${COLORS.join(
          ', '
        )}, received: ${color}`,
        COLORS.includes(color)
      );
    }

    return color;
  }

  /**
   * Get a class to apply to the component based on the color argument.
   * @method BadgeCount#colorClass
   * @return {string} The css class to apply to the component.
   */
  get colorClass() {
    return `hds-badge-count--color-${this.color}`;
  }
}
