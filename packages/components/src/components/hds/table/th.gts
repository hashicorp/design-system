/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { or } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import { HdsTableHorizontalAlignmentValues } from './types.ts';
import HdsTableThButtonTooltip from './th-button-tooltip.gts';

import type { HdsTableHorizontalAlignment, HdsTableScope } from './types.ts';

export const ALIGNMENTS: HdsTableHorizontalAlignment[] = Object.values(
  HdsTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;

export interface HdsTableThSignature {
  Args: {
    align?: HdsTableHorizontalAlignment;
    isVisuallyHidden?: boolean;
    scope?: HdsTableScope;
    tooltip?: string;
    width?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableCellElement;
}

export default class HdsTableTh extends Component<HdsTableThSignature> {
  private _labelId = guidFor(this);

  get align(): HdsTableHorizontalAlignment {
    const { align = DEFAULT_ALIGN } = this.args;

    assert(
      `@align for "Hds::Table::Th" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );
    return align;
  }

  get classNames(): string {
    const classes = ['hds-table__th'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__th--align-${this.align}`);
    }

    return classes.join(' ');
  }

  <template>
    <th
      class={{this.classNames}}
      {{style width=@width minWidth=@width}}
      ...attributes
      scope={{(or @scope "col")}}
    >
      {{#if @isVisuallyHidden}}
        <span class="sr-only">{{yield}}</span>
      {{else}}
        {{#if @tooltip}}
          <div class="hds-table__th-content">
            <span
              id={{this._labelId}}
              class="hds-typography-body-200 hds-font-weight-semibold"
            >{{yield}}</span>
            <HdsTableThButtonTooltip
              @tooltip={{@tooltip}}
              @labelId={{this._labelId}}
            />
          </div>
        {{else}}
          <span
            class="hds-typography-body-200 hds-font-weight-semibold"
          >{{yield}}</span>
        {{/if}}
      {{/if}}
    </th>
  </template>
}
