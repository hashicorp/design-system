import Component from '@glimmer/component';
import { assert } from '@ember/debug';

const DEFAULT_ELEVATION = 'base';
const ELEVATIONS = ['base', 'low', 'mid', 'high', 'higher'];

export default class HdsCardIndexComponent extends Component {
  /**
   * Sets the elevation for the card
   * Accepted sizes: base, low, mid, high, higher
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
}
