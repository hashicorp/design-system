/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { eq } from 'ember-truth-helpers';
import { array } from '@ember/helper';

import {
  HdsLinkIconPositionValues,
  HdsLinkColorValues,
  HdsLinkStandaloneSizeValues,
} from './types.ts';
import HdsIcon from '../icon/index.gts';
import HdsInteractive from '../interactive/index.gts';
import { hdsLinkToModels } from '../../../helpers/hds-link-to-models.ts';
import { hdsLinkToQuery } from '../../../helpers/hds-link-to-query.ts';

import type { HdsInteractiveSignature } from '../interactive/';
import type {
  HdsLinkColors,
  HdsLinkIconPositions,
  HdsLinkStandaloneSizes,
} from './types.ts';
import type { HdsIconSignature } from '../icon';
import type Owner from '@ember/owner';

export interface HdsLinkStandaloneSignature {
  Args: HdsInteractiveSignature['Args'] & {
    size?: HdsLinkStandaloneSizes;
    color?: HdsLinkColors;
    text: string;
    icon: HdsIconSignature['Args']['name'];
    iconPosition?: HdsLinkIconPositions;
  };
  Element: HdsInteractiveSignature['Element'];
}

export const DEFAULT_ICON_POSITION = HdsLinkIconPositionValues.Leading;
export const DEFAULT_COLOR = HdsLinkColorValues.Primary;
export const DEFAULT_SIZE = HdsLinkStandaloneSizeValues.Medium;
export const ICON_POSITIONS: HdsLinkIconPositions[] = Object.values(
  HdsLinkIconPositionValues
);
export const COLORS: HdsLinkColors[] = Object.values(HdsLinkColorValues);
export const SIZES: HdsLinkStandaloneSizes[] = Object.values(
  HdsLinkStandaloneSizeValues
);

export default class HdsLinkStandalone extends Component<HdsLinkStandaloneSignature> {
  constructor(owner: Owner, args: HdsLinkStandaloneSignature['Args']) {
    super(owner, args);
    if (!(this.args.href || this.args.route)) {
      assert('@href or @route must be defined for <Hds::Link::Standalone>');
    }
  }

  get text() {
    const { text } = this.args;

    assert(
      '@text for "Hds::Link::Standalone" must have a valid value',
      text !== undefined
    );

    return text;
  }

  get color() {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Link::Standalone" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  get icon(): HdsIconSignature['Args']['name'] {
    const { icon } = this.args;

    assert(
      '@icon for "Hds::Link::Standalone" must have a valid value',
      icon !== undefined
    );

    return icon;
  }

  get iconPosition() {
    const { iconPosition = DEFAULT_ICON_POSITION } = this.args;

    assert(
      `@iconPosition for "Hds::Link::Standalone" must be one of the following: ${ICON_POSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICON_POSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  get size() {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Link::Standalone" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  get iconSize(): HdsIconSignature['Args']['size'] {
    if (this.args.size === 'large') {
      return '24';
    } else {
      return '16';
    }
  }

  get classNames() {
    const classes = ['hds-link-standalone'];

    // add a class based on the @size argument
    classes.push(`hds-link-standalone--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-link-standalone--color-${this.color}`);

    // add a class based on the @iconPosition argument
    classes.push(`hds-link-standalone--icon-position-${this.iconPosition}`);

    return classes.join(' ');
  }

  <template>
    <HdsInteractive
      class={{this.classNames}}
      @current-when={{@current-when}}
      @models={{hdsLinkToModels (array @model @models)}}
      @query={{hdsLinkToQuery (array @query)}}
      @replace={{@replace}}
      @route={{@route}}
      @isRouteExternal={{@isRouteExternal}}
      @href={{@href}}
      @isHrefExternal={{@isHrefExternal}}
      ...attributes
    >
      {{#if (eq this.iconPosition "leading")}}
        <span class="hds-link-standalone__icon">
          <HdsIcon
            @name={{this.icon}}
            @size={{this.iconSize}}
            @stretched={{true}}
          />
        </span>
        <span class="hds-link-standalone__text">
          {{this.text}}
        </span>
      {{else}}
        <span class="hds-link-standalone__text">
          {{this.text}}
        </span>
        <span class="hds-link-standalone__icon">
          <HdsIcon
            @name={{this.icon}}
            @size={{this.iconSize}}
            @stretched={{true}}
          />
        </span>
      {{/if}}
    </HdsInteractive>
  </template>
}
