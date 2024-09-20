/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { hash } from '@ember/helper';
import ShwFlexItem from './item';
import ShwFlexLabel from '../label';

import type { ComponentLike } from '@glint/template';
import type { SafeString } from '@ember/template';
import type { ShwLabelSignature } from '../label';
import type { ShwFlexItemSignature } from './item';

interface ShwFlexSignature {
  Args: {
    gap?: string;
    direction?: 'row' | 'column';
    label?: string;
  };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<ShwLabelSignature>;
        Item?: ComponentLike<ShwFlexItemSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class ShwFlexComponent extends Component<ShwFlexSignature> {
  direction = this.args.direction ?? 'row';

  get itemsStyle(): SafeString | undefined {
    const styles = [];
    styles.push(`gap: ${this.args.gap ? this.args.gap : '1rem'}`);
    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }

  get classNames(): string {
    const classes = ['shw-flex'];

    // add a class based on the @direction argument
    classes.push(`shw-flex--direction-${this.direction}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}}>
      {{#if @label}}
        <ShwFlexLabel>{{@label}}</ShwFlexLabel>
      {{/if}}
      {{yield (hash Label=ShwFlexLabel)}}
      <div class="shw-flex__items" style={{this.itemsStyle}} ...attributes>
        {{yield (hash Item=ShwFlexItem)}}
      </div>
    </div>
  </template>
}
