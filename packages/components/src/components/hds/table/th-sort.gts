/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import style from 'ember-style-modifier';

import {
  HdsTableHorizontalAlignmentValues,
  HdsTableThSortOrderValues,
  HdsTableThSortOrderLabelValues,
} from './types.ts';
import HdsTableThButtonTooltip from './th-button-tooltip.gts';
import HdsTableThButtonSort from './th-button-sort.gts';

import type {
  HdsTableHorizontalAlignment,
  HdsTableThSortOrder,
  HdsTableThSortOrderLabels,
} from './types.ts';
import type { HdsTableThButtonSortSignature } from './th-button-sort.gts';

export const ALIGNMENTS: HdsTableHorizontalAlignment[] = Object.values(
  HdsTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;

export interface HdsTableThSortSignature {
  Args: {
    align?: HdsTableHorizontalAlignment;
    onClickSort?: HdsTableThButtonSortSignature['Args']['onClick'];
    sortOrder?: HdsTableThSortOrder;
    tooltip?: string;
    width?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsTableThSort extends Component<HdsTableThSortSignature> {
  private _labelId = guidFor(this);

  get ariaSort(): HdsTableThSortOrderLabels {
    switch (this.args.sortOrder) {
      case HdsTableThSortOrderValues.Asc:
        return HdsTableThSortOrderLabelValues.Asc;
      case HdsTableThSortOrderValues.Desc:
        return HdsTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsTableThSortOrderLabelValues.None;
    }
  }

  get align(): HdsTableHorizontalAlignment {
    const { align = DEFAULT_ALIGN } = this.args;

    assert(
      `@align for "Hds::Table" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );
    return align;
  }

  get classNames(): string {
    const classes = ['hds-table__th', 'hds-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__th--align-${this.align}`);
    }

    return classes.join(' ');
  }

  <template>
    <th
      class={{this.classNames}}
      aria-sort={{this.ariaSort}}
      {{style width=@width minWidth=@width}}
      ...attributes
      scope="col"
    >
      <div class="hds-table__th-content">
        <span
          id={{this._labelId}}
          class="hds-typography-body-200 hds-font-weight-semibold"
        >{{yield}}</span>
        {{#if @tooltip}}
          <HdsTableThButtonTooltip
            @tooltip={{@tooltip}}
            @labelId={{this._labelId}}
          />
        {{/if}}
        <HdsTableThButtonSort
          @sortOrder={{@sortOrder}}
          @onClick={{@onClickSort}}
          @labelId={{this._labelId}}
        />
      </div>
    </th>
  </template>
}
