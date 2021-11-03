import Component from '@glimmer/component';

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
    return this.args.size ?? 'medium'
  }

  /**
   * Get a class to apply to the badge based on the size argument.
   * @method Badge#sizeClass
   * @return {string} The css class to apply to the Badge.
   */
   get sizeClass() {
    // TODO! use Cloud UI's approach with `config.js` constants
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
    return this.args.type ?? 'filled'
  }

  /**
   * Get a class to apply to the badge based on the type argument.
   * @method Badge#typeClass
   * @return {string} The css class to apply to the Badge.
   */
   get typeClass() {
    // TODO! use Cloud UI's approach with `config.js` constants
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
    return this.args.color ?? 'neutral'
  }

  /**
   * Get a class to apply to the badge based on the color argument.
   * @method Badge#colorClass
   * @return {string} The css class to apply to the Badge.
   */
   get colorClass() {
    // TODO! use Cloud UI's approach with `config.js` constants
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
    return this.args.icon ?? null
  }

  /**
   * Checks to see if there is an icon
   *
   * @param hasIcon
   * @type {boolean}
   * @default false
   */
  get hasIcon() {
    if (this.args.icon) {
      return true;
    } else {
      return false;
    }
  }

}
