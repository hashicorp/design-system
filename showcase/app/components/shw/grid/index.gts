/**
 * Copyright IBM Corp. 2021, 2025
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
import type { ShwLabelSignature } from '../label';
import type { ShwGridItemSignature } from './item';

interface ShwGridSignature {
  Args: {
    columns: number;
    forceMinWidth?: boolean;
    gap?: string;
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
    assert(
      '@columns for "Shw::Grid" must be a positive integer greater than zero',
      columns > 0,
    );

    return columns;
  }

  get itemsStyle(): SafeString | undefined {
    const styles = [];
    styles.push(`gap: ${this.args.gap ? this.args.gap : '1rem'}`);
    styles.push(`--shw-grid-columns: ${this.columns}`);
    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }

  <template>
    <div class="shw-grid">
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
