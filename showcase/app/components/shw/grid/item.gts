/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import ShwLabel from 'showcase/components/shw/label';

import type { ComponentLike } from '@glint/template';
import type { ShwLabelSignature } from 'showcase/components/shw/label';

export interface ShwGridItemSignature {
  Args: {
    forceMinWidth?: boolean;
    grow?: boolean;
    label?: string;
  };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<ShwLabelSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class ShwGridItem extends Component<ShwGridItemSignature> {
  get classNames(): string {
    const classes = ['shw-grid__item'];

    // add a class based on the @grow argument
    if (this.args.grow === true) {
      classes.push('shw-grid__item--grow');
    }

    // add a class based on the @forceMinWidth argument
    if (this.args.forceMinWidth === true) {
      classes.push('shw-grid__item--force-min-width');
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{#if @label}}
        <ShwLabel>{{@label}}</ShwLabel>
      {{/if}}
      {{yield (hash Label=ShwLabel)}}
    </div>
  </template>
}
