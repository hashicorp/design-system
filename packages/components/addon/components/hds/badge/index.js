import Component from '@glimmer/component';

export default class HdsBadgeIndexComponent extends Component {

  /**
   * Sets the color scheme for the badge
   * Accepted colors: neutral, highlight, success, warning, error
   *
   * @param color
   * @type {string}
   * @default 'neutral'
   */
  get color() {
    return this.args.color ?? 'neutral'
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
   * Sets the variant of badge
   * Accepted values: filled, inverted, outlined
   *
   * @param variant
   * @type {string}
   * @default 'filled'
   */
   get variant() {
    return this.args.variant ?? 'filled'
  }


}
