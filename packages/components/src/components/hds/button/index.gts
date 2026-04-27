/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import '@carbon/web-components/es/components/button/index.js';
import {
  BUTTON_KIND,
  BUTTON_SIZE,
} from '@carbon/web-components/es/components/button/button.js';

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

export interface HdsButtonSignature {
  Args: HdsInteractiveSignature['Args'] & {
    size?: HdsButtonSizes;
    color?: HdsButtonColors;
    text: string;
    icon?: HdsIconSignature['Args']['name'];
    /**
     * @deprecated Carbon doesnt allow leading icons in buttons
     */
    iconPosition?: HdsButtonIconPositions;
    isIconOnly?: boolean;
    /**
     * @deprecated Carbon doesnt have full width button
     */
    isFullWidth?: boolean;
    isInline?: boolean;
  };
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

  get shouldRenderCarbon() {
    const { models, model, query, replace, route, isRouteExternal } = this.args;

    if (
      models ||
      model ||
      query ||
      replace ||
      route ||
      isRouteExternal ||
      this.args['current-when']
    ) {
      return false;
    }

    return true;
  }

  get mappedCarbonKind() {
    switch (this.color) {
      case 'primary':
        return BUTTON_KIND.PRIMARY;
      case 'secondary':
        return BUTTON_KIND.SECONDARY;
      case 'critical':
        return BUTTON_KIND.DANGER;
      case 'tertiary':
        return BUTTON_KIND.GHOST;
    }
  }

  get mappedCarbonSize() {
    switch (this.size) {
      case 'small':
        return BUTTON_SIZE.SMALL;
      case 'medium':
        return BUTTON_SIZE.MEDIUM;
      case 'large':
        return BUTTON_SIZE.LARGE;
    }
  }

  <template>
    {{#if this.shouldRenderCarbon}}
      <cds-button
        href={{@href}}
        kind={{this.mappedCarbonKind}}
        size={{this.mappedCarbonSize}}
        ...attributes
      >
        {{#if this.icon}}
          <span class="hds-button__icon" slot="icon">
            <HdsIcon
              @name={{this.icon}}
              @size={{this.iconSize}}
              @stretched={{true}}
            />
          </span>
        {{/if}}
        {{this.text}}
      </cds-button>
    {{else}}
      <HdsInteractive
        class={{this.classNames}}
        @current-when={{@current-when}}
        @models={{@models}}
        @model={{@model}}
        @query={{@query}}
        @replace={{@replace}}
        @route={{@route}}
        @isRouteExternal={{@isRouteExternal}}
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
    {{/if}}
  </template>
}
