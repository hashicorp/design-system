import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_COLOR = 'neutral';
export const SIZES = ['small', 'medium', 'large'];
export const COLORS = [
  'neutral',
  'boundary',
  'consul',
  'nomad',
  'packer',
  'terraform',
  'vagrant',
  'vault',
  'waypoint',
];
export const LOGOS = [
  'boundary',
  'consul',
  'nomad',
  'packer',
  'terraform',
  'vagrant',
  'vault',
  'waypoint',
];

export default class HdsIconTileIndexComponent extends Component {
  /**
   * Sets the size for the component
   * Accepted values: small, medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    if (size) {
      assert(
        `@size for "Hds::IconTile" must be one of the following: ${SIZES.join(
          ', '
        )}, received: ${size}`,
        SIZES.includes(size)
      );
    }

    return size;
  }

  /**
   * Get a class to apply to the component based on the size argument.
   * @method IconTile#sizeClass
   * @return {string} The css class to apply to the component.
   */
  get sizeClass() {
    return `hds-icon-tile--size-${this.size}`;
  }

  /**
   * Sets the color scheme for the component
   * Accepted values: neutral, neutral-dark-mode, highlight, success, warning, critical
   *
   * @param color
   * @type {string}
   * @default 'neutral'
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    if (color) {
      assert(
        `@color for "Hds::IconTile" must be one of the following: ${COLORS.join(
          ', '
        )}, received: ${color}`,
        COLORS.includes(color)
      );
    }

    return color;
  }

  /**
   * Get a class to apply to the component based on the color argument.
   * @method IconTile#colorClass
   * @return {string} The css class to apply to the component.
   */
  get colorClass() {
    return `hds-icon-tile--color-${this.color}`;
  }

  /**
   * Sets the icon name (one of the )
   *
   * @param icon
   * @type {string|null}
   * @default null
   */
  get icon() {
    return this.args.icon ?? null;
  }

  /**
   * Sets the logo name if there is one
   *
   * @param icon
   * @type {string|null}
   * @default null
   */
  get logo() {
    return this.args.logo ?? null;
  }
}
