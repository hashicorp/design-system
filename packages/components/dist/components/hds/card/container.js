import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsCardLevelValues, HdsCardBackgroundValues, HdsCardOverflowValues, HdsCardTagValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{!\n  Dynamically generating an HTML tag in Ember creates a dynamic component class (with the corresponding tagName), while rendering\n  a plain HTML element requires less computing cycles for Ember (you will notice it doesn\'t add the `ember-view` class to it).\n}}\n{{#if (eq this.componentTag \"div\")}}\n  <div class={{this.classNames}} ...attributes>{{yield}}</div>\n{{else}}\n  {{#let (element this.componentTag) as |Tag|}}\n    <Tag class={{this.classNames}} role={{if (eq this.componentTag \"li\") \"listitem\"}} ...attributes>{{yield}}</Tag>\n  {{/let}}\n{{/if}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_LEVEL = HdsCardLevelValues.Base;
const DEFAULT_BACKGROUND = HdsCardBackgroundValues.NeutralPrimary;
const DEFAULT_OVERFLOW = HdsCardOverflowValues.Visible;
const DEFAULT_TAG = HdsCardTagValues.Div;
const AVAILABLE_LEVELS = Object.values(HdsCardLevelValues);
const AVAILABLE_BACKGROUNDS = Object.values(HdsCardBackgroundValues);
const AVAILABLE_OVERFLOWS = Object.values(HdsCardOverflowValues);
const AVAILABLE_TAGS = Object.values(HdsCardTagValues);
class HdsCardContainer extends Component {
  // Sets the "elevation" level for the component
  get level() {
    const {
      level = DEFAULT_LEVEL
    } = this.args;
    assert(`@level for "Hds::Card::Container" must be one of the following: ${AVAILABLE_LEVELS.join(', ')}; received: ${level}`, AVAILABLE_LEVELS.includes(level));
    return level;
  }

  // Sets the "elevation" level for the component on ":hover" state
  get levelHover() {
    const {
      levelHover
    } = this.args;
    if (levelHover) {
      assert(`@levelHover for "Hds::Card::Container" must be one of the following: ${AVAILABLE_LEVELS.join(', ')}; received: ${levelHover}`, AVAILABLE_LEVELS.includes(levelHover));
    }
    return levelHover;
  }

  // Sets the "elevation" level for the component on ":active" state
  get levelActive() {
    const {
      levelActive
    } = this.args;
    if (levelActive) {
      assert(`@levelActive for "Hds::Card::Container" must be one of the following: ${AVAILABLE_LEVELS.join(', ')}; received: ${levelActive}`, AVAILABLE_LEVELS.includes(levelActive));
    }
    return levelActive;
  }

  // Sets the background for the component
  get background() {
    const {
      background = DEFAULT_BACKGROUND
    } = this.args;
    assert(`@background for "Hds::Card::Container" must be one of the following: ${AVAILABLE_BACKGROUNDS.join(', ')}; received: ${background}`, AVAILABLE_BACKGROUNDS.includes(background));
    return background;
  }

  // Sets the level for the card
  get overflow() {
    const {
      overflow = DEFAULT_OVERFLOW
    } = this.args;
    assert(`@overflow for "Hds::Card::Container" must be one of the following: ${AVAILABLE_OVERFLOWS.join(', ')}; received: ${overflow}`, AVAILABLE_OVERFLOWS.includes(overflow));
    return overflow;
  }
  get componentTag() {
    const {
      tag = DEFAULT_TAG
    } = this.args;
    assert(`@tag for "Hds::Card::Container" must be one of the following: ${AVAILABLE_TAGS.join(', ')}; received: ${tag}`, AVAILABLE_TAGS.includes(tag));
    return tag;
  }

  // Get the class names to apply to the component.
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
setComponentTemplate(TEMPLATE, HdsCardContainer);

export { AVAILABLE_BACKGROUNDS, AVAILABLE_LEVELS, AVAILABLE_OVERFLOWS, AVAILABLE_TAGS, DEFAULT_BACKGROUND, DEFAULT_LEVEL, DEFAULT_OVERFLOW, DEFAULT_TAG, HdsCardContainer as default };
//# sourceMappingURL=container.js.map
