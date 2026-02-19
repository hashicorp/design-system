/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TrackedWeakSet } from 'tracked-built-ins';
import { assert } from '@ember/debug';
import { modifier } from 'ember-modifier';
import { on } from '@ember/modifier';
import { or } from 'ember-truth-helpers';
import { hash } from '@ember/helper';

import { HdsTagColorValues } from './types.ts';
import { HdsTagTooltipPlacementValues } from './types.ts';
import HdsInteractive from '../interactive/index.gts';
import HdsTooltipButton from '../tooltip-button/index.gts';
import HdsTextBody from '../text/body.gts';
import HdsIcon from '../icon/index.gts';
import hdsTooltip from '../../../modifiers/hds-tooltip.ts';

import type { HdsTagColors } from './types.ts';
import type { HdsTagTooltipPlacements } from './types.ts';
import type { HdsInteractiveSignature } from '../interactive/index.gts';

export const COLORS: HdsTagColors[] = Object.values(HdsTagColorValues);
export const DEFAULT_COLOR = HdsTagColorValues.Primary;
export const TOOLTIP_PLACEMENTS: HdsTagTooltipPlacements[] = Object.values(
  HdsTagTooltipPlacementValues
);
export const DEFAULT_TOOLTIP_PLACEMENT = HdsTagTooltipPlacementValues.Top;

export interface HdsTagSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color?: HdsTagColors;
    text: string;
    ariaLabel?: string;
    tooltipPlacement?: HdsTagTooltipPlacements;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss?: (event: MouseEvent, ...args: any[]) => void;
  };
  Element: HTMLSpanElement;
}

const overflowed = new TrackedWeakSet<Element>();

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const textContainer = entry.target.querySelector(
      '.hds-tag__text-container'
    );
    if (
      textContainer &&
      textContainer.scrollHeight > textContainer.clientHeight
    ) {
      overflowed.add(entry.target);
    } else {
      overflowed.delete(entry.target);
    }
  });
});

export default class HdsTag extends Component<HdsTagSignature> {
  @tracked private _element?: HTMLElement;
  private get _isTextOverflow(): boolean {
    if (!this._element) {
      return false;
    }
    return overflowed.has(this._element);
  }

  private _setUpObserver = modifier((element: HTMLElement) => {
    this._element = element;
    observer.observe(element);

    return () => {
      if (this._element) {
        observer.unobserve(this._element);
      }
      delete this._element;
    };
  });

  get tooltipPlacement(): HdsTagTooltipPlacements {
    const { tooltipPlacement = DEFAULT_TOOLTIP_PLACEMENT } = this.args;

    assert(
      '@tooltipPlacement for "Hds::Tag" must have a valid value',
      tooltipPlacement == undefined ||
        TOOLTIP_PLACEMENTS.includes(tooltipPlacement)
    );

    return tooltipPlacement;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss(): ((event: MouseEvent, ...args: any[]) => void) | false {
    const { onDismiss } = this.args;

    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return false;
    }
  }

  get text(): string {
    const { text } = this.args;

    assert('@text for "Hds::Tag" must have a valid value', text !== undefined);

    return text;
  }

  get ariaLabel(): string {
    const tagAriaLabel = this.args.ariaLabel ?? 'Dismiss';
    return tagAriaLabel + ' ' + this.args.text;
  }

  get color(): HdsTagColors | false {
    if (this.args.href || this.args.route) {
      const { color = DEFAULT_COLOR } = this.args;
      assert(
        `@color for "Hds::Tag" must be one of the following: ${COLORS.join(
          ', '
        )}; received: ${color}`,
        COLORS.includes(color)
      );
      return color;
    } else if (this.args.color) {
      assert(
        '@color can only be applied to "Hds::Tag" along with either @href or @route',
        this.args.href || this.args.route
      );
    }
    return false;
  }

  get classNames(): string {
    const classes = ['hds-tag'];

    // add a class based on the @color argument
    if (this.color) {
      classes.push(`hds-tag--color-${this.color}`);
    }

    return classes.join(' ');
  }

  <template>
    <span class={{this.classNames}} {{this._setUpObserver}} ...attributes>
      {{#if this.onDismiss}}
        <button
          class="hds-tag__dismiss"
          type="button"
          aria-label={{this.ariaLabel}}
          {{on "click" this.onDismiss}}
        >
          <HdsIcon class="hds-tag__dismiss-icon" @name="x" @size="16" />
        </button>
      {{/if}}
      {{#if (or @href @route)}}
        {{#if this._isTextOverflow}}
          <HdsInteractive
            class="hds-tag__link"
            @current-when={{@current-when}}
            @models={{@models}}
            @model={{@model}}
            @query={{@query}}
            @replace={{@replace}}
            @route={{@route}}
            @isRouteExternal={{@isRouteExternal}}
            @href={{@href}}
            @isHrefExternal={{@isHrefExternal}}
            {{hdsTooltip
              this.text
              options=(hash placement=this.tooltipPlacement)
            }}
          >
            <HdsTextBody
              @tag="span"
              @size="100"
              @weight="medium"
              class="hds-tag__text-container"
            >
              {{this.text}}
            </HdsTextBody>
          </HdsInteractive>
        {{else}}
          <HdsInteractive
            class="hds-tag__link"
            @current-when={{@current-when}}
            @models={{@models}}
            @model={{@model}}
            @query={{@query}}
            @replace={{@replace}}
            @route={{@route}}
            @isRouteExternal={{@isRouteExternal}}
            @href={{@href}}
            @isHrefExternal={{@isHrefExternal}}
          >
            <HdsTextBody
              @tag="span"
              @size="100"
              @weight="medium"
              class="hds-tag__text-container"
            >
              {{this.text}}
            </HdsTextBody>
          </HdsInteractive>
        {{/if}}
      {{else}}
        {{#if this._isTextOverflow}}
          <HdsTooltipButton
            class="hds-tag__text"
            @text={{this.text}}
            @placement={{this.tooltipPlacement}}
          >
            <HdsTextBody
              @tag="span"
              @size="100"
              @weight="medium"
              class="hds-tag__text-container"
            >
              {{this.text}}
            </HdsTextBody>
          </HdsTooltipButton>
        {{else}}
          <span class="hds-tag__text">
            <HdsTextBody
              @tag="span"
              @size="100"
              @weight="medium"
              class="hds-tag__text-container"
            >
              {{this.text}}
            </HdsTextBody>
          </span>
        {{/if}}
      {{/if}}
    </span>
  </template>
}
