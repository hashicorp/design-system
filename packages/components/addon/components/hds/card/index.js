import Component from '@glimmer/component';
import { assert } from '@ember/debug';

const DEFAULT_ELEVATION = 'base';
const DEFAULT_BACKGROUND = 'neutral-0';
const DEFAULT_OVERFLOW = 'hidden';
const ELEVATIONS = ['base', 'low', 'mid', 'high', 'higher'];
const BACKGROUNDS = ['neutral-0', 'neutral-50'];
const OVERFLOWS = ['hidden', 'visible'];

export default class HdsCardIndexComponent extends Component {
  /**
   * Sets the elevation for the component
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
   * Get a class to apply to the component based on the elevation argument.
   * @method Card#elevationClass
   * @return {string} The css class to apply to the component.
   */
  get elevationClass() {
    return `hds-card--elevation-${this.elevation}`;
  }

  /**
   * Sets the background for the component
   * Accepted values: neutral-0, neutral-50
   *
   * @param background
   * @type {string}
   * @default 'base'
   */
  get background() {
    let { background = DEFAULT_BACKGROUND } = this.args;

    if (background) {
      assert(
        `@background for ${this.toString()} must be one of the following: ${BACKGROUNDS.join(
          ', '
        )}, received: ${background}`,
        BACKGROUNDS.includes(background)
      );
    }

    return background;
  }

  /**
   * Get a class to apply to the component based on the background argument.
   * @method Card#backgroundClass
   * @return {string} The css class to apply to the component.
   */
  get backgroundClass() {
    return `hds-card--background-${this.background}`;
  }

  /**
   * Get a class to apply to the component based on the elevation argument.
   * @method Card#elevationClass
   * @return {string} The css class to apply to the component.
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
   * Get a class to apply to the component based on the overflow argument.
   * @method Card#overflowClass
   * @return {string} The css class to apply to the component.
   */
  get overflowClass() {
    return `hds-card--overflow-${this.overflow}`;
  }
}
