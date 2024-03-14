/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { BackgroundValues, LevelValues, OverflowValues } from './types.ts'
import type { Background, Level, Overflow } from './types.ts';

export const DEFAULT_LEVEL = LevelValues.Base;
export const DEFAULT_BACKGROUND = BackgroundValues.NeutralPrimary;
export const DEFAULT_OVERFLOW = OverflowValues.Visible;
export const AVAILABLE_LEVELS: string[] = Object.values(LevelValues);
export const AVAILABLE_BACKGROUNDS: string[] = Object.values(BackgroundValues);
export const AVAILABLE_OVERFLOWS: string[] = Object.values(OverflowValues);

export interface HdsCardContainerSignature {
  Args: {
    level: Level;
    levelActive: Level;
    levelHover: Level;
    background: Background;
    overflow: Overflow;
    hasBorder: boolean;
  };
  Element: HTMLDivElement;
}
export default class HdsCardContainerComponent extends Component<HdsCardContainerSignature> {
  /**
   * Sets the "elevation" level for the component
   * Accepted values: base, mid, high
   *
   * @param level
   * @type {Level}
   * @default 'base'
   */
  get level(): Level {
    let { level = DEFAULT_LEVEL } = this.args;

    assert(
      `@level for "Hds::Card::Container" must be one of the following: ${AVAILABLE_LEVELS.join(
        ', '
      )}; received: ${level}`,
      AVAILABLE_LEVELS.includes(level)
    );

    return level;
  }

  /**
   * Sets the "elevation" level for the component on ":hover" state
   * Accepted values: base, mid, high
   *
   * @param levelHover
   * @type {Level}
   */
  get levelHover(): Level {
    let { levelHover } = this.args;

    if (levelHover) {
      assert(
        `@levelHover for "Hds::Card::Container" must be one of the following: ${AVAILABLE_LEVELS.join(
          ', '
        )}; received: ${levelHover}`,
        AVAILABLE_LEVELS.includes(levelHover)
      );
    }

    return levelHover;
  }

  /**
   * Sets the "elevation" level for the component on ":active" state
   * Accepted values: base, mid, high
   *
   * @param levelActive
   * @type {Level}
   */
  get levelActive(): Level {
    let { levelActive } = this.args;

    if (levelActive) {
      assert(
        `@levelActive for "Hds::Card::Container" must be one of the following: ${AVAILABLE_LEVELS.join(
          ', '
        )}; received: ${levelActive}`,
        AVAILABLE_LEVELS.includes(levelActive)
      );
    }

    return levelActive;
  }

  /**
   * Sets the background for the component
   * Accepted values: neutral-primary, neutral-secondary
   *
   * @param background
   * @type {Background}
   * @default 'base'
   */
  get background(): Background {
    let { background = DEFAULT_BACKGROUND } = this.args;

    assert(
      `@background for "Hds::Card::Container" must be one of the following: ${AVAILABLE_BACKGROUNDS.join(
        ', '
      )}; received: ${background}`,
      AVAILABLE_BACKGROUNDS.includes(background)
    );

    return background;
  }

  /**
   * Sets the level for the card
   * Accepted values: visible, hidden
   *
   * @param overflow
   * @type {Overflow}
   * @default 'visible'
   */
  get overflow(): Overflow {
    let { overflow = DEFAULT_OVERFLOW } = this.args;

    assert(
      `@overflow for "Hds::Card::Container" must be one of the following: ${AVAILABLE_OVERFLOWS.join(
        ', '
      )}; received: ${overflow}`,
      AVAILABLE_OVERFLOWS.includes(overflow)
    );

    return overflow;
  }

  /**
   * Get the class names to apply to the component.
   * @method Card#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
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
