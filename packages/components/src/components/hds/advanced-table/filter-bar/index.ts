/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { WithBoundArgs } from '@glint/template';
import type Owner from '@ember/owner';

import type {
  HdsAdvancedTableFilter,
  HdsAdvancedTableFilters,
} from '../types.ts';
import HdsAdvancedTableFilterBarDropdown from './dropdown.ts';
import HdsAdvancedTableFilterBarFiltersDropdown from './filters-dropdown.ts';

export interface HdsAdvancedTableFilterBarSignature {
  Args: {
    filters: HdsAdvancedTableFilters;
    activeFilterableColumns?: string[];
    isLiveFilter?: boolean;
    onFilter?: (filters: HdsAdvancedTableFilters) => void;
  };
  Blocks: {
    default?: [
      {
        FiltersDropdown?: WithBoundArgs<
          typeof HdsAdvancedTableFilterBarFiltersDropdown,
          'onChange'
        >;
        Dropdown?: WithBoundArgs<
          typeof HdsAdvancedTableFilterBarDropdown,
          'onChange' | 'filters' | 'isLiveFilter'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}
export default class HdsAdvancedTableFilterBar extends Component<HdsAdvancedTableFilterBarSignature> {
  @tracked filters: HdsAdvancedTableFilters = {};
  @tracked hasActiveFilters: boolean = Object.keys(this.filters).length > 0;
  @tracked activeFilterableColumns: string[] = [];

  constructor(owner: Owner, args: HdsAdvancedTableFilterBarSignature['Args']) {
    super(owner, args);

    const { filters, activeFilterableColumns } = args;

    if (filters) {
      this.filters = { ...filters };
    }

    if (activeFilterableColumns) {
      this.activeFilterableColumns = [...activeFilterableColumns];
    }
  }

  @action
  onFilter(key: string, keyFilter?: HdsAdvancedTableFilter[]): void {
    this._updateFilter(key, keyFilter);

    this.hasActiveFilters = Object.keys(this.filters).length > 0;

    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(this.filters);
    }
  }

  @action
  onFiltersChange(activeFilterableColumns: string[]): void {
    this.activeFilterableColumns = activeFilterableColumns;
  }

  @action
  clearFilters(): void {
    this.filters = {};
    this.hasActiveFilters = false;
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(this.filters);
    }
  }

  private _updateFilter(
    key: string,
    keyFilter?: HdsAdvancedTableFilter[]
  ): void {
    const newFilters = {} as HdsAdvancedTableFilters;
    Object.keys(this.filters).forEach((k) => {
      newFilters[k] = JSON.parse(
        JSON.stringify(this.filters[k])
      ) as HdsAdvancedTableFilter[];
    });
    if (
      keyFilter === undefined ||
      (Array.isArray(keyFilter) && keyFilter.length === 0)
    ) {
      delete newFilters[key];
    } else {
      Object.assign(newFilters, { [key]: keyFilter });
    }
    this.filters = { ...newFilters };
  }

  private onFilterDismiss = (key: string, filterValue: unknown): void => {
    const oldFilter = this.filters[key];
    let newFilter: HdsAdvancedTableFilter[] = [];
    if (Array.isArray(oldFilter)) {
      newFilter = oldFilter.filter((filter) => filter.value !== filterValue);
    }
    this.onFilter(key, newFilter);
  };
}
