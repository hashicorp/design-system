/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import {
  HdsLayoutFlexDirectionValues,
  HdsLayoutFlexJustifyValues,
  HdsLayoutFlexAlignValues,
} from './types.ts';

import type {
  HdsLayoutFlexDirections,
  HdsLayoutFlexJustifys,
  HdsLayoutFlexAligns,
} from './types.ts';

export const DEFAULT_DIRECTION = HdsLayoutFlexDirectionValues.Row;
export const DIRECTIONS: string[] = Object.values(HdsLayoutFlexDirectionValues);
export const JUSTIFYS: string[] = Object.values(HdsLayoutFlexJustifyValues);
export const ALIGNS: string[] = Object.values(HdsLayoutFlexAlignValues);

// A list of all existing tag names in the HTMLElementTagNameMap interface
type AvailableTagNames = keyof HTMLElementTagNameMap;
// A union of all types in the HTMLElementTagNameMap interface
type AvailableElements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

export interface HdsLayoutFlexSignature {
  Args: {
    tag?: AvailableTagNames;
    direction?: HdsLayoutFlexDirections;
    justify?: HdsLayoutFlexJustifys;
    align?: HdsLayoutFlexAligns;
    wrap?: boolean;
    isInline?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: AvailableElements;
}

export default class HdsLayoutFlex extends Component<HdsLayoutFlexSignature> {
  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
  }

  get direction(): HdsLayoutFlexDirections {
    return this.args.direction ?? DEFAULT_DIRECTION;
  }

  get justify(): HdsLayoutFlexJustifys | undefined {
    return this.args.justify ?? undefined;
  }

  get align(): HdsLayoutFlexAligns | undefined {
    return this.args.align ?? undefined;
  }

  get classNames() {
    const classes = ['hds-layout-flex'];

    // add a class based on the @direction argument
    classes.push(`hds-layout-flex--direction-${this.direction}`);

    // add a class based on the @justify argument
    if (this.justify) {
      classes.push(`hds-layout-flex--justify-content-${this.justify}`);
    }

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-layout-flex--align-items-${this.align}`);
    }

    // add a class based on the @wrap argument
    if (this.args.wrap) {
      classes.push('hds-layout-flex--has-wrapping');
    }

    // add a class based on the @isInline argument
    if (this.args.isInline) {
      classes.push('hds-layout-flex--is-inline');
    }

    return classes.join(' ');
  }
}
