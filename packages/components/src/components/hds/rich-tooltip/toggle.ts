/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import {
  HdsRichTooltipToggleIconPositionValues,
  HdsRichTooltipToggleSizeValues,
} from './types.ts';
import type {
  HdsRichTooltipToggleIconPositions,
  HdsRichTooltipToggleSizes,
} from './types.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
import type { ModifierLike } from '@glint/template';
import type { SetupPrimitiveToggleModifier } from '../popover-primitive';

export const ICONPOSITIONS: string[] = Object.values(
  HdsRichTooltipToggleIconPositionValues
);
export const DEFAULT_ICONPOSITION =
  HdsRichTooltipToggleIconPositionValues.Trailing;
export const SIZES: string[] = Object.values(HdsRichTooltipToggleSizeValues);

export interface HdsRichTooltipToggleSignature {
  Args: {
    text?: string;
    icon?: FlightIconSignature['Args']['name'];
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

export default class HdsRichTooltipToggleComponent extends Component<HdsRichTooltipToggleSignature> {
  /**
   * @param isInline
   * @type {boolean}
   * @default true
   * @description sets display inline for the element
   */
  get isInline(): boolean {
    const { isInline = false } = this.args;
    return isInline;
  }

  /**
   * @param iconPosition
   * @type {string}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPosition(): HdsRichTooltipToggleIconPositions {
    const { iconPosition = DEFAULT_ICONPOSITION } = this.args;

    assert(
      `@iconPosition for "Hds::RichTooltip::Toggle" must be one of the following: ${ICONPOSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICONPOSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the "info" text; acceptable values are `small`, `medium`, `large`
   */
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

  /**
   * Get the class names to apply to the component.
   * @return {string} The "class" attribute to apply to the component.
   */
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
}
