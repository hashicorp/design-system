/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import {
  HdsIconTileColorNeutral,
  HdsIconTileProductValues,
  HdsIconTileSizeValues,
} from './types.ts';

import type {
  HdsIconTileColors,
  HdsIconTileProducts,
  HdsIconTileSizes,
} from './types.ts';

import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_COLOR = 'neutral';
export const SIZES: string[] = Object.values(HdsIconTileSizeValues);
export const COLORS: string[] = Object.values({
  ...HdsIconTileColorNeutral,
  ...HdsIconTileProductValues,
});
export const PRODUCTS: string[] = Object.values(HdsIconTileProductValues);

export interface HdsIconTileSignature {
  Args: {
    size?: HdsIconTileSizes;
    color?: HdsIconTileColors;
    logo?: HdsIconTileProducts;
    icon?: FlightIconSignature['Args']['name'];
    iconSecondary?: FlightIconSignature['Args']['name'];
  };
  Element: HTMLDivElement;
}

export default class HdsIconTileComponent extends Component<HdsIconTileSignature> {
  /**
   * Sets the size for the component
   * Accepted values: small, medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size(): HdsIconTileSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::IconTile" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * Sets the color scheme for the component
   * Accepted values: see THE COLORS LIST
   *
   * @param color
   * @type {string}
   * @default 'neutral'
   */
  get color(): string {
    let { color = DEFAULT_COLOR } = this.args;

    // if it's a "logo" then we overwrite any @color parameter passed
    // and just use the product "brand" color
    if (this.logo) {
      color = this.logo;
    }

    assert(
      `@color for "Hds::IconTile" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * Sets the icon name (one of the FlightIcons)
   *
   * @param icon
   * @type {string|null}
   * @default null
   */
  get icon(): FlightIconSignature['Args']['name'] | undefined {
    if (this.args.logo) {
      // for the logo version we use the colored versions directly
      return `${this.args.logo}-color`;
    } else if (this.args.icon) {
      return this.args.icon;
    } else {
      return undefined;
    }
  }

  /**
   * @param iconSize
   * @type {string}
   * @default 16
   * @description ensures that the correct icon size is used. Automatically calculated.
   */
  get iconSize(): '16' | '24' {
    if (this.args.size === 'small') {
      return '16';
    } else {
      return '24';
    }
  }

  /**
   * Sets the logo name if there is one
   *
   * @param logo
   * @type {string|null}
   * @default null
   */
  get logo(): HdsIconTileProducts | null {
    const { logo } = this.args;

    if (logo) {
      assert(
        `@logo for "Hds::IconTile" must be one of the following: ${PRODUCTS.join(
          ', '
        )}; received: ${logo}`,
        PRODUCTS.includes(logo)
      );
    }

    return logo ?? null;
  }

  /**
   * We need to differentiate between a logo and an icon
   * @method IconTile#entity
   * @return {string} The kind of entity we're dealing with ("logo" or "icon")
   */
  get entity(): string | undefined {
    let entity;

    assert(
      `you can't pass both @logo and @icon properties to the "Hds::IconTile" component`,
      !(this.args.logo && this.args.icon)
    );

    assert(
      `you need to pass @logo or @icon to the "Hds::IconTile" component`,
      !(this.args.logo === undefined && this.args.icon === undefined)
    );

    if (this.args.logo) {
      entity = 'logo';
    }
    if (this.args.icon) {
      entity = 'icon';
    }

    return entity;
  }

  /**
   * Sets the "secondary" icon name (one of the FlightIcons)
   *
   * @param iconSecondary
   * @type {string|null}
   * @default null
   */
  get iconSecondary(): FlightIconSignature['Args']['name'] | null {
    return this.args.iconSecondary ?? null;
  }

  /**
   * Get the class names to apply to the component.
   * @method IconTile#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  // hds-icon-tile {{this.entityClass}} {{this.sizeClass}} {{this.colorClass}}"
  get classNames(): string {
    const classes = ['hds-icon-tile'];

    // add a class based on its entity argument
    classes.push(`hds-icon-tile--${this.entity}`);

    // add a class based on the @size argument
    classes.push(`hds-icon-tile--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-icon-tile--color-${this.color}`);

    return classes.join(' ');
  }
}
