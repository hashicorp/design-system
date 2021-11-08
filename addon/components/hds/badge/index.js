import Component from '@glimmer/component';
import { assert } from '@ember/debug';

const DEFAULT_SIZE = 'medium';
const DEFAULT_COLOR = 'neutral';
const DEFAULT_TYPE = 'filled';
const SIZES = ['small', 'medium', 'large'];
const TYPES = ['filled', 'inverted', 'outlined'];
const COLORS = [
  'neutral',
  'neutral-dark-mode',
  'highlight',
  'success',
  'warning',
  'critical',
];

export default class HdsBadgeIndexComponent extends Component {
  /**
   * Sets the size for the badge
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
   * Get a class to apply to the badge based on the size argument.
   * @method Badge#sizeClass
   * @return {string} The css class to apply to the Badge.
   */
  get sizeClass() {
    return `hds-badge--size-${this.size}`;
  }

  /**
   * Sets the type of badge
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
   * Get a class to apply to the badge based on the type argument.
   * @method Badge#typeClass
   * @return {string} The css class to apply to the Badge.
   */
  get typeClass() {
    return `hds-badge--type-${this.type}`;
  }

  /**
   * Sets the color scheme for the badge
   * Accepted colors: neutral, neutral-dark-mode, highlight, success, warning, critical
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
   * Get a class to apply to the badge based on the color argument.
   * @method Badge#colorClass
   * @return {string} The css class to apply to the Badge.
   */
  get colorClass() {
    return `hds-badge--color-${this.color}`;
  }

  /**
   * Sets the icon name if there is one
   *
   * @param icon
   * @type {string|null}
   * @default null
   */
  get icon() {
    return this.args.icon ?? null;
  }
}
