/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type Owner from '@ember/owner';

import type {
  HdsAdvancedTableFilter,
  HdsAdvancedTableFilters,
} from '../types.ts';
import HdsDropdown from '../../dropdown/index.ts';
import HdsAdvancedTableFilterBarDropdown from './dropdown.ts';
import HdsAdvancedTableFilterBarFiltersDropdown from './filters-dropdown.ts';

export interface HdsAdvancedTableFilterBarSignature {
  Args: {
    filters: HdsAdvancedTableFilters;
    activeFilterableColumns?: string[];
    isLiveFilter?: boolean;
    hasSearch?: boolean;
    showFilters?: boolean;
    onFilter?: (filters: HdsAdvancedTableFilters) => void;
    onSearch?: (event: Event) => void;
  };
  Blocks: {
    default?: [
      {
        ActionsDropdown?: ComponentLike<typeof HdsDropdown>;
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
  @tracked showFilters: boolean = true;

  constructor(owner: Owner, args: HdsAdvancedTableFilterBarSignature['Args']) {
    super(owner, args);

    const { filters, activeFilterableColumns, showFilters } = args;

    if (filters) {
      this.filters = { ...filters };
    }

    if (activeFilterableColumns) {
      this.activeFilterableColumns = [...activeFilterableColumns];
    }

    if (showFilters != null) {
      this.showFilters = showFilters;
    }
  }

  @action
  onFilter(key: string, keyFilter?: HdsAdvancedTableFilter[]): void {
    this._triggerFilter(key, keyFilter);
  }

  @action
  onFiltersChange(activeFilterableColumns: string[]): void {
    this.activeFilterableColumns = activeFilterableColumns;

    Object.keys(this.filters).forEach((k) => {
      if (!this.activeFilterableColumns.includes(k)) {
        this._triggerFilter(k);
      }
    });
  }

  @action
  clearFilters(): void {
    this.filters = {};
    this.activeFilterableColumns = [];
    this.hasActiveFilters = false;
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(this.filters);
    }
  }

  @action
  onSearch(event: Event): void {
    console.log('Search event:', event);

    const { onSearch } = this.args;
    if (onSearch && typeof onSearch === 'function') {
      onSearch(event);
    }
  }

  @action
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  private _triggerFilter(
    key: string,
    keyFilter?: HdsAdvancedTableFilter[]
  ): void {
    this._updateFilter(key, keyFilter);

    this.hasActiveFilters = Object.keys(this.filters).length > 0;

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
      this.activeFilterableColumns = this.activeFilterableColumns.filter(
        (colKey) => colKey !== key
      );
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
