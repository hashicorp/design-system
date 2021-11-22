import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_LEVEL = 'base';
export const DEFAULT_BACKGROUND = 'neutral-0';
export const DEFAULT_OVERFLOW = 'hidden';
export const LEVELS = ['base', 'mid', 'high'];
export const BACKGROUNDS = ['neutral-0', 'neutral-50'];
export const OVERFLOWS = ['hidden', 'visible'];

export default class HdsCardContainerComponent extends Component {
  /**
   * Sets the "elevation" level for the component
   * Accepted values: base, mid, high
   *
   * @param level
   * @type {string}
   * @default 'base'
   */
  get level() {
    let { level = DEFAULT_LEVEL } = this.args;

    if (level) {
      assert(
        `@level for "Hds::CardContainer" must be one of the following: ${LEVELS.join(
          ', '
        )}, received: ${level}`,
        LEVELS.includes(level)
      );
    }

    return level;
  }

  /**
   * Get a class to apply to the component based on the level argument.
   * @method Card#levelClass
   * @return {string} The css class to apply to the component.
   */
  get levelClass() {
    return `hds-card__container--level-${this.level}`;
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
        `@background for "Hds::CardContainer" must be one of the following: ${BACKGROUNDS.join(
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
    return `hds-card__container--background-${this.background}`;
  }

  /**
   * Get a class to apply to the component based on the hasBorder argument.
   * @method Card#hasBorderClass
   * @return {string} The css class to apply to the component.
   */
  get borderClass() {
    return this.args.hasBorder ? `hds-card__container--has-border` : undefined;
  }

  /**
   * Sets the level for the card
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
        `@overflow for "Hds::CardContainer" must be one of the following: ${OVERFLOWS.join(
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
    return `hds-card__container--overflow-${this.overflow}`;
  }
}
