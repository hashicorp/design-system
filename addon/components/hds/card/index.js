import Component from '@glimmer/component';
import { assert } from '@ember/debug';

const DEFAULT_ELEVATION = 'base';
const DEFAULT_OVERFLOW = 'hidden';
const ELEVATIONS = ['base', 'low', 'mid', 'high', 'higher'];
const OVERFLOWS = ['hidden', 'visible'];

export default class HdsCardIndexComponent extends Component {
  /**
   * Sets the elevation for the card
   * Accepted values: base, low, mid, high, higher
   *
   * @param elevation
   * @type {string}
   * @default 'base'
   */
  get elevation() {
    let { elevation = DEFAULT_ELEVATION } = this.args;

    if (elevation) {
      assert(
        `@elevation for ${this.toString()} must be one of the following: ${ELEVATIONS.join(
          ', '
        )}, received: ${elevation}`,
        ELEVATIONS.includes(elevation)
      );
    }

    return elevation;
  }

  /**
   * Get a class to apply to the card based on the elevation argument.
   * @method Card#elevationClass
   * @return {string} The css class to apply to the Card.
   */
  get elevationClass() {
    return `hds-card--elevation-${this.elevation}`;
  }

  /**
   * Get a class to apply to the card based on the elevation argument.
   * @method Card#elevationClass
   * @return {string} The css class to apply to the Card.
   */
  get outlinedClass() {
    return this.args.outlined ? `hds-card--outlined` : undefined;
  }

  /**
   * Sets the elevation for the card
   * Accepted values: visible, hidden
   *
   * @param overflow
   * @type {string}
   * @default 'hidden'
   */
  get overflow() {
    let { overflow = DEFAULT_OVERFLOW } = this.args;

    if (overflow) {
      assert(
        `@overflow for ${this.toString()} must be one of the following: ${OVERFLOWS.join(
          ', '
        )}, received: ${overflow}`,
        OVERFLOWS.includes(overflow)
      );
    }

    return overflow;
  }

  /**
   * Get a class to apply to the card based on the overflow argument.
   * @method Card#overflowClass
   * @return {string} The css class to apply to the Card.
   */
  get overflowClass() {
    return `hds-card--overflow-${this.overflow}`;
  }
}
