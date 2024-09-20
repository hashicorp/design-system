/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import Label from '../label';

import type { ComponentLike } from '@glint/template';
import type { ShwLabelSignature } from '../label';

export interface ShwFlexItemSignature {
  Args: {
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

export default class ShwFlexItemComponent extends Component<ShwFlexItemSignature> {
  get classNames(): string {
    const classes = ['shw-flex__item'];

    // add a class based on the @grow argument
    if (this.args.grow === true) {
      classes.push('shw-flex__item--grow');
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{#if @label}}
        <Label>{{@label}}</Label>
      {{/if}}
      {{yield (hash Label=Label)}}
    </div>
  </template>
}
