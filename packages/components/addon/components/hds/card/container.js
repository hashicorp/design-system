/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_LEVEL = 'base';
export const DEFAULT_BACKGROUND = 'neutral-primary';
export const DEFAULT_OVERFLOW = 'visible';
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
      `@level for "Hds::Card::Container" must be one of the following: ${LEVELS.join(
        ', '
      )}; received: ${level}`,
      LEVELS.includes(level)
    );

    return level;
  }

  /**
   * Sets the "elevation" level for the component on ":hover" state
   * Accepted values: base, mid, high
   *
   * @param levelHover
   * @type {string}
   */
  get levelHover() {
    let { levelHover } = this.args;

    if (levelHover) {
      assert(
        `@levelHover for "Hds::Card::Container" must be one of the following: ${LEVELS.join(
          ', '
        )}; received: ${levelHover}`,
        LEVELS.includes(levelHover)
      );
    }

    return levelHover;
  }

  /**
   * Sets the "elevation" level for the component on ":active" state
   * Accepted values: base, mid, high
   *
   * @param levelActive
   * @type {string}
   */
  get levelActive() {
    let { levelActive } = this.args;

    if (levelActive) {
      assert(
        `@levelActive for "Hds::Card::Container" must be one of the following: ${LEVELS.join(
          ', '
        )}; received: ${levelActive}`,
        LEVELS.includes(levelActive)
      );
    }

    return levelActive;
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
      `@background for "Hds::Card::Container" must be one of the following: ${BACKGROUNDS.join(
        ', '
      )}; received: ${background}`,
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
   * @default 'visible'
   */
  get overflow() {
    let { overflow = DEFAULT_OVERFLOW } = this.args;

    assert(
      `@overflow for "Hds::Card::Container" must be one of the following: ${OVERFLOWS.join(
        ', '
      )}; received: ${overflow}`,
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

    // add "elevation" classes based on the @level and @hasBorder arguments
    classes.push(
      `hds-card__container--level-${
        this.args.hasBorder ? 'surface' : 'elevation'
      }-${this.level}`
    );
    if (this.levelHover) {
      classes.push(
        `hds-card__container--hover-level-${
          this.args.hasBorder ? 'surface' : 'elevation'
        }-${this.levelHover}`
      );
    }
    if (this.levelActive) {
      classes.push(
        `hds-card__container--active-level-${
          this.args.hasBorder ? 'surface' : 'elevation'
        }-${this.levelActive}`
      );
    }

    // add a class based on the @background argument
    classes.push(`hds-card__container--background-${this.background}`);

    // add a class based on the @overflow argument
    classes.push(`hds-card__container--overflow-${this.overflow}`);

    return classes.join(' ');
  }
}
