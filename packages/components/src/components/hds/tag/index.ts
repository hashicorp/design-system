/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { modifier } from 'ember-modifier';

import { HdsTagColorValues } from './types.ts';
import type { HdsTagColors } from './types.ts';
import { HdsTagTooltipPlacementValues } from './types.ts';
import type { HdsTagTooltipPlacements } from './types.ts';
import type { HdsInteractiveSignature } from '../interactive/';

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

export default class HdsTag extends Component<HdsTagSignature> {
  @tracked private _isTextOverflow!: boolean;
  private _observer!: ResizeObserver;

  private _setUpObserver = modifier((element: HTMLElement) => {
    // Used to detect when text is clipped to one line, and tooltip should be added
    this._observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        this._isTextOverflow = this._isOverflow(
          entry.target.querySelector('.hds-tag__text-container')!
        );
      });
    });
    this._observer.observe(element);

    return () => {
      this._observer.disconnect();
    };
  });

  /**
   * @param tooltioPlacement
   * @type {string}
   * @default top
   * @description The placement property of the tooltip attached to the tag text.
   */
  get tooltipPlacement(): HdsTagTooltipPlacements {
    const { tooltipPlacement = DEFAULT_TOOLTIP_PLACEMENT } = this.args;

    assert(
      '@tooltipPlacement for "Hds::Tag" must have a valid value',
      tooltipPlacement == undefined ||
        TOOLTIP_PLACEMENTS.includes(tooltipPlacement)
    );

    return tooltipPlacement;
  }

  /**
   * @param onDismiss
   * @type {function}
   * @default () => {}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss(): ((event: MouseEvent, ...args: any[]) => void) | false {
    const { onDismiss } = this.args;

    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return false;
    }
  }

  /**
   * @param text
   * @type {string}
   * @description The text of the tag. If no text value is defined, an error will be thrown.
   */
  get text(): string {
    const { text } = this.args;

    assert('@text for "Hds::Tag" must have a valid value', text !== undefined);

    return text;
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Dismiss'
   */
  get ariaLabel(): string {
    const tagAriaLabel = this.args.ariaLabel ?? 'Dismiss';
    return tagAriaLabel + ' ' + this.args.text;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
   */
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

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-tag'];

    // add a class based on the @color argument
    if (this.color) {
      classes.push(`hds-tag--color-${this.color}`);
    }

    return classes.join(' ');
  }

  private _isOverflow(el: Element): boolean {
    return el.scrollHeight > el.clientHeight;
  }
}
