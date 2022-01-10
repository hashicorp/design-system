import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_LEVEL = 'base';
export const DEFAULT_BACKGROUND = 'neutral-primary';
export const DEFAULT_OVERFLOW = 'hidden';
export const LEVELS = ['base', 'mid', 'high'];
export const BACKGROUNDS = ['neutral-primary', 'neutral-secondary'];
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

    assert(
      `@level for "Hds::CardContainer" must be one of the following: ${LEVELS.join(
        ', '
      )}, received: ${level}`,
      LEVELS.includes(level)
    );

    return level;
  }

  /**
   * Sets the background for the component
   * Accepted values: neutral-primary, neutral-secondary
   *
   * @param background
   * @type {string}
   * @default 'base'
   */
  get background() {
    let { background = DEFAULT_BACKGROUND } = this.args;

    assert(
      `@background for "Hds::CardContainer" must be one of the following: ${BACKGROUNDS.join(
        ', '
      )}, received: ${background}`,
      BACKGROUNDS.includes(background)
    );

    return background;
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

    assert(
      `@overflow for "Hds::CardContainer" must be one of the following: ${OVERFLOWS.join(
        ', '
      )}, received: ${overflow}`,
      OVERFLOWS.includes(overflow)
    );

    return overflow;
  }

  /**
   * Get the class names to apply to the component.
   * @method Card#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-card__container'];

    // add an "elevation" class helper based on the @level and @hasBorder arguments
    classes.push(
      `hds-${this.args.hasBorder ? 'surface' : 'elevation'}-${this.level}`
    );

    // add a class based on the @background argument
    classes.push(`hds-card__container--background-${this.background}`);

    // add a class based on the @overflow argument
    classes.push(`hds-card__container--overflow-${this.overflow}`);

    return classes.join(' ');
  }
}
