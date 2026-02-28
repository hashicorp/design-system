/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { eq } from 'ember-truth-helpers';

import type { ModifierLike } from '@glint/template';

import {
  HdsRichTooltipToggleIconPositionValues,
  HdsRichTooltipToggleSizeValues,
} from './types.ts';
import HdsIcon from '../icon/index.gts';

import type {
  HdsRichTooltipToggleIconPositions,
  HdsRichTooltipToggleSizes,
} from './types.ts';
import type { HdsIconSignature } from '../icon/index.gts';
import type { SetupPrimitiveToggleModifier } from '../popover-primitive/index.gts';

export const ICON_POSITIONS: HdsRichTooltipToggleIconPositions[] =
  Object.values(HdsRichTooltipToggleIconPositionValues);
export const DEFAULT_ICON_POSITION =
  HdsRichTooltipToggleIconPositionValues.Trailing;
export const SIZES: HdsRichTooltipToggleSizes[] = Object.values(
  HdsRichTooltipToggleSizeValues
);

export interface HdsRichTooltipToggleSignature {
  Args: {
    text?: string;
    icon?: HdsIconSignature['Args']['name'];
    iconPosition?: HdsRichTooltipToggleIconPositions;
    size?: undefined | HdsRichTooltipToggleSizes;
    isInline?: boolean;
    isOpen?: boolean;
    popoverId: string;
    setupPrimitiveToggle: ModifierLike<SetupPrimitiveToggleModifier>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLButtonElement;
}

export default class HdsRichTooltipToggle extends Component<HdsRichTooltipToggleSignature> {
  get isInline(): boolean {
    const { isInline = false } = this.args;
    return isInline;
  }

  get iconPosition(): HdsRichTooltipToggleIconPositions {
    const { iconPosition = DEFAULT_ICON_POSITION } = this.args;

    assert(
      `@iconPosition for "Hds::RichTooltip::Toggle" must be one of the following: ${ICON_POSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICON_POSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  get size(): HdsRichTooltipToggleSizes | undefined {
    let size;

    // we assign a "size" only if `@text` is provided
    if (this.args.text) {
      size = this.args.size;

      assert(
        `@size for "Hds::RichTooltip::Toggle" must be one of the following: ${SIZES.join(
          ', '
        )}; received: ${size}`,
        size === undefined || SIZES.includes(size)
      );
    }

    return size;
  }

  get classNames(): string {
    const classes = ['hds-rich-tooltip__toggle'];

    // add a class based on the @isInline argument
    if (this.isInline) {
      classes.push('hds-rich-tooltip__toggle--is-inline');
    } else {
      classes.push('hds-rich-tooltip__toggle--is-block');
    }

    // add a class based on the @size argument (if provided)
    if (this.size) {
      classes.push(`hds-rich-tooltip__toggle--size-${this.size}`);
    }

    return classes.join(' ');
  }

  <template>
    {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember becomes visible in the underlined text (being an inline element) - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
    <button
      class={{this.classNames}}
      ...attributes
      type="button"
      aria-describedby={{@popoverId}}
      aria-expanded={{if @isOpen "true" "false"}}
      {{@setupPrimitiveToggle}}
    >
      {{~#if (has-block)~}}
        {{yield}}
      {{~else~}}
        {{~#if @icon~}}
          {{~#if (eq this.iconPosition "leading")~}}
            <HdsIcon
              class="hds-rich-tooltip__toggle-icon"
              @name={{@icon}}
              @isInline={{this.isInline}}
            />
          {{~/if~}}
        {{~/if~}}
        {{~#if @text~}}
          <span class="hds-rich-tooltip__toggle-text">{{~@text~}}</span>
        {{~/if~}}
        {{~#if @icon~}}
          {{~#if (eq this.iconPosition "trailing")~}}
            <HdsIcon
              class="hds-rich-tooltip__toggle-icon"
              @name={{@icon}}
              @isInline={{this.isInline}}
            />
          {{~/if~}}
        {{~/if~}}
      {{~/if~}}
    </button>
  </template>
}
