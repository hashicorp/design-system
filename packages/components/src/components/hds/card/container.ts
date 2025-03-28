/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import {
  HdsCardBackgroundValues,
  HdsCardLevelValues,
  HdsCardOverflowValues,
  HdsCardTagValues,
} from './types.ts';

import type {
  HdsCardBackground,
  HdsCardLevel,
  HdsCardOverflow,
  HdsCardTag,
} from './types.ts';

export const DEFAULT_LEVEL = HdsCardLevelValues.Base;
export const DEFAULT_BACKGROUND = HdsCardBackgroundValues.NeutralPrimary;
export const DEFAULT_OVERFLOW = HdsCardOverflowValues.Visible;
export const DEFAULT_TAG = HdsCardTagValues.Div;
export const AVAILABLE_LEVELS: string[] = Object.values(HdsCardLevelValues);
export const AVAILABLE_BACKGROUNDS: string[] = Object.values(
  HdsCardBackgroundValues
);
export const AVAILABLE_OVERFLOWS: string[] = Object.values(
  HdsCardOverflowValues
);
export const AVAILABLE_TAGS: string[] = Object.values(HdsCardTagValues);

export interface HdsCardContainerSignature {
  Args: {
    level?: HdsCardLevel;
    levelActive?: HdsCardLevel;
    levelHover?: HdsCardLevel;
    background?: HdsCardBackground;
    hasBorder?: boolean;
    overflow?: HdsCardOverflow;
    tag?: HdsCardTag;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsCardContainer extends Component<HdsCardContainerSignature> {
  // Sets the "elevation" level for the component
  get level(): HdsCardLevel {
    const { level = DEFAULT_LEVEL } = this.args;

    assert(
      `@level for "Hds::Card::Container" must be one of the following: ${AVAILABLE_LEVELS.join(
        ', '
      )}; received: ${level}`,
      AVAILABLE_LEVELS.includes(level)
    );

    return level;
  }

  // Sets the "elevation" level for the component on ":hover" state
  get levelHover(): HdsCardLevel | undefined {
    const { levelHover } = this.args;

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

  // Sets the "elevation" level for the component on ":active" state
  get levelActive(): HdsCardLevel | undefined {
    const { levelActive } = this.args;

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

  // Sets the background for the component
  get background(): HdsCardBackground {
    const { background = DEFAULT_BACKGROUND } = this.args;

    assert(
      `@background for "Hds::Card::Container" must be one of the following: ${AVAILABLE_BACKGROUNDS.join(
        ', '
      )}; received: ${background}`,
      AVAILABLE_BACKGROUNDS.includes(background)
    );

    return background;
  }

  // Sets the level for the card
  get overflow(): HdsCardOverflow {
    const { overflow = DEFAULT_OVERFLOW } = this.args;

    assert(
      `@overflow for "Hds::Card::Container" must be one of the following: ${AVAILABLE_OVERFLOWS.join(
        ', '
      )}; received: ${overflow}`,
      AVAILABLE_OVERFLOWS.includes(overflow)
    );

    return overflow;
  }

  get componentTag(): HdsCardTag {
    const { tag = DEFAULT_TAG } = this.args;

    assert(
      `@tag for "Hds::Card::Container" must be one of the following: ${AVAILABLE_TAGS.join(', ')}; received: ${tag}`,
      AVAILABLE_TAGS.includes(tag)
    );

    return tag;
  }

  // Get the class names to apply to the component.
  get classNames(): string {
    const classes = ['hds-card__container'];

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
