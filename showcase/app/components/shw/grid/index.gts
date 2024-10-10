/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';

import ShwGridItem from './item';
import ShwLabel from '../label';

import type { ComponentLike } from '@glint/template';
import type { SafeString } from '@ember/template';
import type { ShwLabelSignature } from 'showcase/components/shw/label';
import type { ShwGridItemSignature } from 'showcase/components/shw/grid/item';

interface ShwGridSignature {
  Args: {
    columns: 2 | 3 | 4 | 5 | 6 | 7;
    forceMinWidth?: boolean;
    gap: string;
    grow?: boolean;
    label?: string;
  };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<ShwLabelSignature>;
        Item?: ComponentLike<ShwGridItemSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class ShwGrid extends Component<ShwGridSignature> {
  get columns(): number {
    const { columns } = this.args;

    assert('@columns for "Shw::Grid" must be defined', columns !== undefined);

    return columns;
  }

  get itemsStyle(): SafeString | undefined {
    const styles = [];
    styles.push(`gap: ${this.args.gap ? this.args.gap : '1rem'}`);
    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }

  get classNames(): string {
    const classes = ['shw-grid'];

    // add a class based on the @columns argument
    classes.push(`shw-grid--cols-${this.columns}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}}>
      {{#if @label}}
        <ShwLabel>{{@label}}</ShwLabel>
      {{/if}}
      {{yield (hash Label=ShwLabel)}}
      <div class="shw-grid__items" style={{this.itemsStyle}} ...attributes>
        {{yield (hash Item=ShwGridItem)}}
      </div>
    </div>
  </template>
}
