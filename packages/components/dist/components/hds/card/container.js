import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsCardLevelValues, HdsCardBackgroundValues, HdsCardOverflowValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} ...attributes>\n  {{yield}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_LEVEL = HdsCardLevelValues.Base;
const DEFAULT_BACKGROUND = HdsCardBackgroundValues.NeutralPrimary;
const DEFAULT_OVERFLOW = HdsCardOverflowValues.Visible;
const AVAILABLE_LEVELS = Object.values(HdsCardLevelValues);
const AVAILABLE_BACKGROUNDS = Object.values(HdsCardBackgroundValues);
const AVAILABLE_OVERFLOWS = Object.values(HdsCardOverflowValues);
class HdsCardContainerComponent extends Component {
  /**
   * Sets the "elevation" level for the component
   * Accepted values: base, mid, high
   *
   * @param level
   * @type {HdsCardLevel}
   * @default 'base'
   */
  get level() {
    const {
      level = DEFAULT_LEVEL
    } = this.args;
    assert(`@level for "Hds::Card::Container" must be one of the following: ${AVAILABLE_LEVELS.join(', ')}; received: ${level}`, AVAILABLE_LEVELS.includes(level));
    return level;
  }

  /**
   * Sets the "elevation" level for the component on ":hover" state
   * Accepted values: base, mid, high
   *
   * @param levelHover
   * @type {HdsCardLevel}
   */
  get levelHover() {
    const {
      levelHover
    } = this.args;
    if (levelHover) {
      assert(`@levelHover for "Hds::Card::Container" must be one of the following: ${AVAILABLE_LEVELS.join(', ')}; received: ${levelHover}`, AVAILABLE_LEVELS.includes(levelHover));
    }
    return levelHover;
  }

  /**
   * Sets the "elevation" level for the component on ":active" state
   * Accepted values: base, mid, high
   *
   * @param levelActive
   * @type {HdsCardLevel}
   */
  get levelActive() {
    const {
      levelActive
    } = this.args;
    if (levelActive) {
      assert(`@levelActive for "Hds::Card::Container" must be one of the following: ${AVAILABLE_LEVELS.join(', ')}; received: ${levelActive}`, AVAILABLE_LEVELS.includes(levelActive));
    }
    return levelActive;
  }

  /**
   * Sets the background for the component
   * Accepted values: neutral-primary, neutral-secondary
   *
   * @param background
   * @type {HdsCardBackground}
   * @default 'base'
   */
  get background() {
    const {
      background = DEFAULT_BACKGROUND
    } = this.args;
    assert(`@background for "Hds::Card::Container" must be one of the following: ${AVAILABLE_BACKGROUNDS.join(', ')}; received: ${background}`, AVAILABLE_BACKGROUNDS.includes(background));
    return background;
  }

  /**
   * Sets the level for the card
   * Accepted values: visible, hidden
   *
   * @param overflow
   * @type {HdsCardOverflow}
   * @default 'visible'
   */
  get overflow() {
    const {
      overflow = DEFAULT_OVERFLOW
    } = this.args;
    assert(`@overflow for "Hds::Card::Container" must be one of the following: ${AVAILABLE_OVERFLOWS.join(', ')}; received: ${overflow}`, AVAILABLE_OVERFLOWS.includes(overflow));
    return overflow;
  }

  /**
   * Get the class names to apply to the component.
   * @method Card#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-card__container'];

    // add "elevation" classes based on the @level and @hasBorder arguments
    classes.push(`hds-card__container--level-${this.args.hasBorder ? 'surface' : 'elevation'}-${this.level}`);
    if (this.levelHover) {
      classes.push(`hds-card__container--hover-level-${this.args.hasBorder ? 'surface' : 'elevation'}-${this.levelHover}`);
    }
    if (this.levelActive) {
      classes.push(`hds-card__container--active-level-${this.args.hasBorder ? 'surface' : 'elevation'}-${this.levelActive}`);
    }

    // add a class based on the @background argument
    classes.push(`hds-card__container--background-${this.background}`);

    // add a class based on the @overflow argument
    classes.push(`hds-card__container--overflow-${this.overflow}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsCardContainerComponent);

export { AVAILABLE_BACKGROUNDS, AVAILABLE_LEVELS, AVAILABLE_OVERFLOWS, DEFAULT_BACKGROUND, DEFAULT_LEVEL, DEFAULT_OVERFLOW, HdsCardContainerComponent as default };
//# sourceMappingURL=container.js.map
