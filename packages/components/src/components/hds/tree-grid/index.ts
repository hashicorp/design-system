/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import type { ComponentLike } from '@glint/template';

import {
  HdsTreeGridDensityValues,
  HdsTreeGridThSortOrderValues,
  HdsTreeGridVerticalAlignmentValues,
} from './types.ts';
import type {
  HdsTreeGridColumn,
  HdsTreeGridDensities,
  HdsTreeGridHorizontalAlignment,
  HdsTreeGridSelectableRow,
  HdsTreeGridSortingFunction,
  HdsTreeGridThSortOrder,
  HdsTreeGridVerticalAlignment,
  HdsTreeGridModel,
} from './types';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsTreeGridTdSignature } from './td.ts';
import type { HdsTreeGridThSignature } from './th.ts';
import type { HdsTreeGridThSortSignature } from './th-sort.ts';
import type { HdsTreeGridTrSignature } from './tr.ts';

export const DENSITIES: HdsTreeGridDensities[] = Object.values(
  HdsTreeGridDensityValues
);
export const DEFAULT_DENSITY = HdsTreeGridDensityValues.Medium;

export const VALIGNMENTS: HdsTreeGridVerticalAlignment[] = Object.values(
  HdsTreeGridVerticalAlignmentValues
);
export const DEFAULT_VALIGN = HdsTreeGridVerticalAlignmentValues.Top;

export interface HdsTreeGridSignature {
  Args: {
    align?: HdsTreeGridHorizontalAlignment;
    caption?: string;
    columns?: HdsTreeGridColumn[];
    density?: HdsTreeGridDensities;
    identityKey?: string;
    isFixedLayout?: boolean;
    isStriped?: boolean;
    model: HdsTreeGridModel;
    onSort?: (sortBy: string, sortOrder: HdsTreeGridThSortOrder) => void;
    sortBy?: string;
    sortedMessageText?: string;
    sortOrder?: HdsTreeGridThSortOrder;
    valign?: HdsTreeGridVerticalAlignment;
    childrenKey?: string;
  };
  Blocks: {
    head?: [
      {
        Tr?: ComponentLike<HdsTreeGridTrSignature>;
        Th?: ComponentLike<HdsTreeGridThSignature>;
        ThSort?: ComponentLike<HdsTreeGridThSortSignature>;
        sortBy?: string;
        sortOrder?: HdsTreeGridThSortOrder;
        setSortBy?: (column: string) => void;
      },
    ];
    body?: [
      {
        Td?: ComponentLike<HdsTreeGridTdSignature>;
        Tr?: ComponentLike<HdsTreeGridTrSignature>;
        Th?: ComponentLike<HdsTreeGridThSignature>;
        data?: Record<string, unknown>;
        sortBy?: string;
        sortOrder?: HdsTreeGridThSortOrder;
      },
    ];
  };
  Element: HTMLTableElement;
}

export default class HdsTreeGrid extends Component<HdsTreeGridSignature> {
  @tracked sortBy = this.args.sortBy ?? undefined;
  @tracked sortOrder = this.args.sortOrder || HdsTreeGridThSortOrderValues.Asc;
  @tracked selectAllCheckbox?: HdsFormCheckboxBaseSignature['Element'] =
    undefined;
  selectableRows: HdsTreeGridSelectableRow[] = [];
  @tracked isSelectAllCheckboxSelected?: boolean = undefined;

  get getSortCriteria(): string | HdsTreeGridSortingFunction<unknown> {
    // get the current column
    const currentColumn = this.args?.columns?.find(
      (column) => column.key === this.sortBy
    );
    if (
      // check if there is a custom sorting function associated with the current `sortBy` column (we assume the column has `isSortable`)
      currentColumn?.sortingFunction &&
      typeof currentColumn.sortingFunction === 'function'
    ) {
      return currentColumn.sortingFunction;
    } else {
      // otherwise fallback to the default format "sortBy:sortOrder"
      return `${this.sortBy}:${this.sortOrder}`;
    }
  }

  get identityKey(): string | undefined {
    // we have to provide a way for the consumer to pass undefined because Ember tries to interpret undefined as missing an arg and therefore falls back to the default
    if (this.args.identityKey === 'none') {
      return undefined;
    } else {
      return this.args.identityKey ?? '@identity';
    }
  }

  get sortedMessageText(): string {
    if (this.args.sortedMessageText) {
      return this.args.sortedMessageText;
    } else if (this.sortBy && this.sortOrder) {
      // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
      return `Sorted by ${this.sortBy} ${this.sortOrder}ending`;
    } else {
      return '';
    }
  }

  get isStriped(): boolean {
    return this.args.isStriped ?? false;
  }

  get isFixedLayout(): boolean {
    return this.args.isFixedLayout ?? false;
  }

  get density(): HdsTreeGridDensities {
    const { density = DEFAULT_DENSITY } = this.args;

    assert(
      `@density for "Hds::Table" must be one of the following: ${DENSITIES.join(
        ', '
      )}; received: ${density}`,
      DENSITIES.includes(density)
    );

    return density;
  }

  get valign(): HdsTreeGridVerticalAlignment {
    const { valign = DEFAULT_VALIGN } = this.args;

    assert(
      `@valign for "Hds::Table" must be one of the following: ${VALIGNMENTS.join(
        ', '
      )}; received: ${valign}`,
      VALIGNMENTS.includes(valign)
    );

    return valign;
  }

  get classNames(): string {
    const classes = ['hds-table'];

    // add a class based on the @isStriped argument
    if (this.isStriped) {
      classes.push('hds-table--striped');
    }

    // add a class based on the @isFixedLayout argument
    if (this.isFixedLayout) {
      classes.push('hds-table--layout-fixed');
    }

    // add a class based on the @density argument
    if (this.density) {
      classes.push(`hds-table--density-${this.density}`);
    }

    // add a class based on the @valign argument
    if (this.valign) {
      classes.push(`hds-table--valign-${this.valign}`);
    }

    return classes.join(' ');
  }

  @action
  setSortBy(column: string): void {
    if (this.sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this.sortOrder =
        this.sortOrder === HdsTreeGridThSortOrderValues.Asc
          ? HdsTreeGridThSortOrderValues.Desc
          : HdsTreeGridThSortOrderValues.Asc;
    } else {
      // otherwise, set the sort order to ascending
      this.sortBy = column;
      this.sortOrder = HdsTreeGridThSortOrderValues.Asc;
    }

    const { onSort } = this.args;

    if (typeof onSort === 'function') {
      onSort(this.sortBy, this.sortOrder);
    }
  }
}
