/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import {
  HdsBadgeColorValues,
  HdsBadgeSizeValues,
  HdsBadgeTypeValues,
} from './types.ts';

import HdsIcon from '../icon/index.gts';

import type { HdsBadgeColors, HdsBadgeSizes, HdsBadgeTypes } from './types.ts';
import type { HdsIconSignature } from '../icon';

export const SIZES: HdsBadgeSizes[] = Object.values(HdsBadgeSizeValues);
export const TYPES: HdsBadgeTypes[] = Object.values(HdsBadgeTypeValues);
export const COLORS: HdsBadgeColors[] = Object.values(HdsBadgeColorValues);
export const DEFAULT_SIZE = HdsBadgeSizeValues.Medium;
export const DEFAULT_TYPE = HdsBadgeTypeValues.Filled;
export const DEFAULT_COLOR = HdsBadgeColorValues.Neutral;

export interface HdsBadgeSignature {
  Args: {
    size?: HdsBadgeSizes;
    type?: HdsBadgeTypes;
    color?: HdsBadgeColors;
    text: string | number;
    icon?: HdsIconSignature['Args']['name'];
    isIconOnly?: boolean;
  };
  Element: HTMLDivElement;
}

export default class HdsBadge extends Component<HdsBadgeSignature> {
  get size() {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Badge" must be one of the following: ${SIZES.join(
        ', ',
      )}; received: ${size}`,
      SIZES.includes(size),
    );

    return size;
  }

  get type() {
    const { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Badge" must be one of the following: ${TYPES.join(
        ', ',
      )}; received: ${type}`,
      TYPES.includes(type),
    );

    return type;
  }

  get color() {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Badge" must be one of the following: ${COLORS.join(
        ', ',
      )}; received: ${color}`,
      COLORS.includes(color),
    );

    return color;
  }

  get text() {
    const { text } = this.args;

    assert(
      '@text for "Hds::Badge" must have a valid value',
      text !== undefined,
    );

    return text;
  }

  get isIconOnly() {
    if (this.args.icon) {
      return this.args.isIconOnly ?? false;
    }

    return false;
  }

  get classNames() {
    const classes = ['hds-badge'];

    // add a class based on the @size argument
    classes.push(`hds-badge--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-badge--type-${this.type}`);

    // add a class based on the @color argument
    classes.push(`hds-badge--color-${this.color}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{#if @icon}}
        <div class="hds-badge__icon">
          <HdsIcon @name={{@icon}} @size="16" @stretched={{true}} />
        </div>
      {{/if}}
      {{#if this.isIconOnly}}
        <span class="sr-only">{{this.text}}</span>
      {{else}}
        <div class="hds-badge__text">
          {{this.text}}
        </div>
      {{/if}}
    </div>
  </template>
}
