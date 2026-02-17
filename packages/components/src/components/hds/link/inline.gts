/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { eq } from 'ember-truth-helpers';

import type Owner from '@ember/owner';

import { HdsLinkColorValues, HdsLinkIconPositionValues } from './types.ts';
import HdsInteractive from '../interactive/index.gts';
import HdsIcon from '../icon/index.gts';

import type { HdsInteractiveSignature } from '../interactive/index.gts';
import type { HdsIconSignature } from '../icon/index.gts';
import type { HdsLinkColors, HdsLinkIconPositions } from './types.ts';

export const DEFAULT_ICON_POSITION = HdsLinkIconPositionValues.Trailing;
export const DEFAULT_COLOR = HdsLinkColorValues.Primary;
export const ICON_POSITIONS: HdsLinkIconPositions[] = Object.values(
  HdsLinkIconPositionValues
);
export const COLORS: HdsLinkColors[] = Object.values(HdsLinkColorValues);

export interface HdsLinkInlineSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color?: HdsLinkColors;
    icon?: HdsIconSignature['Args']['name'];
    iconPosition?: HdsLinkIconPositions;
  };
  Blocks: {
    default: [];
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsLinkInline extends Component<HdsLinkInlineSignature> {
  constructor(owner: Owner, args: HdsLinkInlineSignature['Args']) {
    super(owner, args);
    if (!(this.args.href || this.args.route)) {
      assert('@href or @route must be defined for <Hds::Link::Inline>');
    }
  }

  get color(): HdsLinkColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Link::Inline" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  get iconPosition(): HdsLinkIconPositions {
    const { iconPosition = DEFAULT_ICON_POSITION } = this.args;

    assert(
      `@iconPosition for "Hds::Link::Inline" must be one of the following: ${ICON_POSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICON_POSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  get classNames(): string {
    const classes = ['hds-link-inline'];

    // add a class based on the @color argument
    classes.push(`hds-link-inline--color-${this.color}`);

    // add a class based on the @iconPosition argument
    classes.push(`hds-link-inline--icon-${this.iconPosition}`);

    return classes.join(' ');
  }

  <template>
    {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember becomes visible in the link (being an inline element) - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
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
    >
      {{~#if (eq this.iconPosition "leading")~}}
        {{~#if @icon~}}
          <span class="hds-link-inline__icon hds-link-inline__icon--leading">
            <HdsIcon @name={{@icon}} @size="16" @stretched={{true}} />
          </span>
        {{~/if~}}
      {{~/if~}}
      {{yield}}
      {{~#if (eq this.iconPosition "trailing")~}}
        {{~#if @icon~}}
          <span class="hds-link-inline__icon hds-link-inline__icon--trailing">
            <HdsIcon @name={{@icon}} @size="16" @stretched={{true}} />
          </span>
        {{~/if~}}
      {{~/if~}}
    </HdsInteractive>
  </template>
}
