/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import { HdsLayoutFlexDirectionValues } from './types.ts';

import type { HdsLayoutFlexDirections } from './types.ts';

export const DEFAULT_DIRECTION = HdsLayoutFlexDirectionValues.Row;
export const DIRECTIONS: string[] = Object.values(HdsLayoutFlexDirectionValues);
export interface HdsLayoutFlexSignature {
  Args: {
    direction?: HdsLayoutFlexDirections;
    wrap?: boolean;
    isInline?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsLayoutFlex extends Component<HdsLayoutFlexSignature> {
  get direction(): HdsLayoutFlexDirections {
    return this.args.direction ?? DEFAULT_DIRECTION;
  }

  get classNames() {
    const classes = ['hds-layout-flex'];

    // add a class based on the @direction argument
    classes.push(`hds-layout-flex--direction-${this.direction}`);

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
