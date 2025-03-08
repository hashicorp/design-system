import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsIconTileColorNeutral, HdsIconTileProductValues, HdsIconTileSizeValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} aria-hidden=\"true\" ...attributes>\n  {{#if this.icon}}\n    <div class={{this.iconWrapperClass}}>\n      <Hds::Icon @name={{this.icon}} @size={{this.iconSize}} @stretched={{true}} />\n    </div>\n  {{/if}}\n\n  {{#if this.iconSecondary}}\n    <div class=\"hds-icon-tile__extra\">\n      <div class=\"hds-icon-tile__extra-icon\">\n        <Hds::Icon @name={{this.iconSecondary}} @size=\"16\" @stretched={{true}} />\n      </div>\n    </div>\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_SIZE = 'medium';
const DEFAULT_COLOR = 'neutral';
const SIZES = Object.values(HdsIconTileSizeValues);
const COLORS = Object.values({
  ...HdsIconTileColorNeutral,
  ...HdsIconTileProductValues
});
const PRODUCTS = Object.values(HdsIconTileProductValues);
class HdsIconTile extends Component {
  get size() {
    const {
      size = DEFAULT_SIZE
    } = this.args;
    assert(`@size for "Hds::IconTile" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
  }
  get color() {
    let {
      color = DEFAULT_COLOR
    } = this.args;

    // if it's a "logo" then we overwrite any @color parameter passed
    // and just use the product "brand" color
    if (this.logo) {
      color = this.logo;
    }
    assert(`@color for "Hds::IconTile" must be one of the following: ${COLORS.join(', ')}; received: ${color}`, COLORS.includes(color));
    return color;
  }
  get icon() {
    if (this.args.logo) {
      // for the logo version we use the colored versions directly
      return `${this.args.logo}-color`;
    } else if (this.args.icon) {
      return this.args.icon;
    } else {
      return undefined;
    }
  }
  get iconSize() {
    if (this.args.size === 'small') {
      return '16';
    } else {
      return '24';
    }
  }
  get iconWrapperClass() {
    if (this.args.logo !== undefined) {
      return 'hds-icon-tile__logo';
    }
    if (this.args.icon !== undefined) {
      return 'hds-icon-tile__icon';
    }
  }
  get logo() {
    const {
      logo
    } = this.args;
    if (logo) {
      assert(`@logo for "Hds::IconTile" must be one of the following: ${PRODUCTS.join(', ')}; received: ${logo}`, PRODUCTS.includes(logo));
    }
    return logo ?? null;
  }
  get entity() {
    let entity;
    assert(`you can't pass both @logo and @icon properties to the "Hds::IconTile" component`, !(this.args.logo && this.args.icon));
    assert(`you need to pass @logo or @icon to the "Hds::IconTile" component`, !(this.args.logo === undefined && this.args.icon === undefined));
    if (this.args.logo) {
      entity = 'logo';
    }
    if (this.args.icon) {
      entity = 'icon';
    }
    return entity;
  }
  get iconSecondary() {
    return this.args.iconSecondary;
  }

  // hds-icon-tile {{this.entityClass}} {{this.sizeClass}} {{this.colorClass}}"
  get classNames() {
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
setComponentTemplate(TEMPLATE, HdsIconTile);

export { COLORS, DEFAULT_COLOR, DEFAULT_SIZE, PRODUCTS, SIZES, HdsIconTile as default };
//# sourceMappingURL=index.js.map
