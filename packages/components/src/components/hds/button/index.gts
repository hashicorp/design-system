/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { eq } from 'ember-truth-helpers';
// TEST

import {
  HdsButtonSizeValues,
  HdsButtonColorValues,
  HdsButtonIconPositionValues,
} from './types.ts';
import HdsInteractive from '../interactive/index.gts';
import HdsIcon from '../icon/index.gts';

import type {
  HdsButtonSizes,
  HdsButtonColors,
  HdsButtonIconPositions,
} from './types.ts';
import type { HdsInteractiveSignature } from '../interactive/index.gts';
import type { HdsIconSignature } from '../icon/index.gts';

export const SIZES: HdsButtonSizes[] = Object.values(HdsButtonSizeValues);
export const COLORS: HdsButtonColors[] = Object.values(HdsButtonColorValues);
export const ICON_POSITIONS: HdsButtonIconPositions[] = Object.values(
  HdsButtonIconPositionValues
);
export const DEFAULT_SIZE = HdsButtonSizeValues.Medium;
export const DEFAULT_COLOR = HdsButtonColorValues.Primary;
export const DEFAULT_ICON_POSITION = HdsButtonIconPositionValues.Leading;

/**
 * @componentDescription Buttons allow users to initiate actions or navigation across the product experience.
 */
export interface HdsButtonSignature {
  Args: HdsInteractiveSignature['Args'] & {
    /**
     * @default "medium"
     */
    size?: HdsButtonSizes;

    /**
     * @default "primary"
     */
    color?: HdsButtonColors;

    /**
     * Text of the button or value of `aria-label` if `isIconOnly` is set to
     * `true`. If no text value is defined an error will be thrown.
     */
    text: string;

    /**
     * Used to show an icon. Any icon name is accepted.
     *
     * Tertiary buttons have transparent backgrounds, and interactive elements
     * must communicate interactivity with more than just color. Therefore, a
     * leading or trailing icon is required when using the `tertiary` color.
     */
    icon?: HdsIconSignature['Args']['name'];

    /**
     * Positions the icon before or after the text.
     * @default "leading"
     */
    iconPosition?: HdsButtonIconPositions;

    /**
     * Indicates if the button will only contain an icon. An internal check is
     * in place to ensure that accessible text is still applied to the component.
     * @default "false"
     */
    isIconOnly?: boolean;

    /**
     * Indicates that a button should take up the full width of the parent
     * container.
     * @default "false"
     */
    isFullWidth?: boolean;

    /**
     * If `true`, the element is displayed as `inline-block`. Otherwise, it uses
     * block layout.
     * @default "false"
     */
    isInline?: boolean;
  };

  /**
   * Supports all standard HTML attributes for the rendered interactive element,
   * including `...attributes`.
   */
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsButton extends Component<HdsButtonSignature> {
  get text(): string {
    // TEST2
    const { text } = this.args;

    assert(
      '@text for "Hds::Button" must have a valid value',
      text !== undefined
    );

    return text;
  }

  get size(): HdsButtonSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Button" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  get color(): HdsButtonColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Button" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  get icon(): HdsIconSignature['Args']['name'] | undefined {
    assert(
      `when the "Hds::Button" @color is "tertiary" an @icon is required`,
      !(this.color === 'tertiary' && !this.args.icon)
    );

    return this.args.icon ?? undefined;
  }

  get isIconOnly(): boolean {
    if (this.icon) {
      return this.args.isIconOnly ?? false;
    }
    return false;
  }

  get iconPosition(): HdsButtonIconPositions {
    const { iconPosition = DEFAULT_ICON_POSITION } = this.args;

    assert(
      `@iconPosition for "Hds::Button" must be one of the following: ${ICON_POSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICON_POSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  get iconSize(): HdsIconSignature['Args']['size'] {
    if (this.args.size === 'large') {
      return '24';
    } else {
      return '16';
    }
  }

  get isFullWidth(): boolean {
    return this.args.isFullWidth ?? false;
  }

  get classNames(): string {
    const classes = ['hds-button'];

    // add a class based on the @color argument
    classes.push(`hds-button--color-${this.color}`);

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-button--width-full');
    }

    // add a class based on isIconOnly argument
    if (this.isIconOnly) {
      classes.push('hds-button--is-icon-only');
    }

    // add a class based on the @isInline argument
    if (this.args.isInline) {
      classes.push('hds-button--is-inline');
    }

    // add a class based on the @size argument
    classes.push(`hds-button--size-${this.size}`);

    return classes.join(' ');
  }

  <template>
    <HdsInteractive
      class={{this.classNames}}
      @current-when={{@current-when}}
      @models={{@models}}
      @model={{@model}}
      @query={{@query}}
      @replace={{@replace}}
      @route={{@route}}
      @isRouteExternal={{@isRouteExternal}}
      @href={{@href}}
      @isHrefExternal={{@isHrefExternal}}
      ...attributes
      aria-label={{if this.isIconOnly this.text null}}
    >
      {{#if this.isIconOnly}}
        {{#if this.icon}}
          <span class="hds-button__icon">
            <HdsIcon
              @name={{this.icon}}
              @size={{this.iconSize}}
              @stretched={{true}}
            />
          </span>
        {{/if}}
      {{else}}
        {{#if this.icon}}
          {{#if (eq this.iconPosition "leading")}}
            <span class="hds-button__icon">
              <HdsIcon
                @name={{this.icon}}
                @size={{this.iconSize}}
                @stretched={{true}}
              />
            </span>
            <span class="hds-button__text">
              {{this.text}}
            </span>
          {{else}}
            <span class="hds-button__text">
              {{this.text}}
            </span>
            <span class="hds-button__icon">
              <HdsIcon
                @name={{this.icon}}
                @size={{this.iconSize}}
                @stretched={{true}}
              />
            </span>
          {{/if}}
        {{else}}
          <span class="hds-button__text">
            {{this.text}}
          </span>
        {{/if}}
      {{/if}}
    </HdsInteractive>
  </template>
}
