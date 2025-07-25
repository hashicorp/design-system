/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import {
  HdsLinkIconPositionValues,
  HdsLinkColorValues,
  HdsLinkStandaloneSizeValues,
} from './types.ts';

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

  /**
   * @param text
   * @type {string}
   * @description The text of the link. If no text value is defined an error will be thrown.
   */
  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Link::Standalone" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
   */
  get color(): HdsLinkColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Link::Standalone" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param icon
   * @type {string|null}
   * @default null
   * @description The name of the icon to be used. An icon name must be defined.
   */
  get icon(): HdsIconSignature['Args']['name'] {
    const { icon } = this.args;

    assert(
      '@icon for "Hds::Link::Standalone" must have a valid value',
      icon !== undefined
    );

    return icon;
  }

  /**
   * @param iconPosition
   * @type {HdsLinkIconPositions}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPosition(): HdsLinkIconPositions {
    const { iconPosition = DEFAULT_ICON_POSITION } = this.args;

    assert(
      `@iconPosition for "Hds::Link::Standalone" must be one of the following: ${ICON_POSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICON_POSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  /**
   * @param size
   * @type {HdsLinkStandaloneSizes}
   * @default medium
   * @description The size of the standalone link; acceptable values are `small`, `medium`, and `large`
   */
  get size(): HdsLinkStandaloneSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Link::Standalone" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * @param iconSize
   * @type {string}
   * @default 16
   * @description ensures that the correct icon size is used. Automatically calculated.
   */
  get iconSize(): HdsIconSignature['Args']['size'] {
    if (this.args.size === 'large') {
      return '24';
    } else {
      return '16';
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method LinkStandalone#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-link-standalone'];

    // add a class based on the @size argument
    classes.push(`hds-link-standalone--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-link-standalone--color-${this.color}`);

    // add a class based on the @iconPosition argument
    classes.push(`hds-link-standalone--icon-position-${this.iconPosition}`);

    return classes.join(' ');
  }
}
