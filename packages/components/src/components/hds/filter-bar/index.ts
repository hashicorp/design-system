/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { schedule } from '@ember/runloop';
import { modifier } from 'ember-modifier';

import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type Owner from '@ember/owner';

import type { HdsFilterBarFilter, HdsFilterBarFilters } from './types.ts';
import HdsDropdown from '../dropdown/index.ts';
import HdsFilterBarDropdown from './dropdown.ts';
import HdsFilterBarFiltersDropdown from './filters-dropdown.ts';

export interface HdsFilterBarSignature {
  Args: {
    filters: HdsFilterBarFilters;
    visibleFilterableColumns?: string[];
    isLiveFilter?: boolean;
    hasSearch?: boolean;
    showFilters?: boolean;
    onFilter?: (filters: HdsFilterBarFilters) => void;
    onSearch?: (event: Event) => void;
  };
  Blocks: {
    default?: [
      {
        ActionsDropdown?: ComponentLike<typeof HdsDropdown>;
        FiltersDropdown?: WithBoundArgs<
          typeof HdsFilterBarFiltersDropdown,
          'onChange'
        >;
        Dropdown?: WithBoundArgs<
          typeof HdsFilterBarDropdown,
          'onChange' | 'filters' | 'isLiveFilter'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBar extends Component<HdsFilterBarSignature> {
  @tracked visibleFilterableColumns: string[] = [];
  @tracked showFilters: boolean = true;

  private _element!: HTMLDivElement;
  private _filtersDropdownToggleElement!: HTMLDivElement;

  private _setUpFilterBar = modifier((element: HTMLDivElement) => {
    this._element = element;

    this._filtersDropdownToggleElement = element.querySelector(
      '.hds-filter-bar__filters-dropdown .hds-dropdown-toggle-button'
    ) as HTMLDivElement;

    return () => {};
  });

  constructor(owner: Owner, args: HdsFilterBarSignature['Args']) {
    super(owner, args);

    const { filters, visibleFilterableColumns, showFilters } = args;

    console.log('Initializing FilterBar with filters:', filters);

    if (showFilters != null) {
      this.showFilters = showFilters;
    }

    if (visibleFilterableColumns) {
      this.visibleFilterableColumns = [...visibleFilterableColumns];
    }

    Object.keys(filters).forEach((k) => {
      if (!this.activeFilterableColumns.includes(k)) {
        this.activeFilterableColumns.push(k);
      }
    });
  }

  get hasActiveFilters(): boolean {
    return Object.keys(this.args.filters).length > 0;
  }

  get activeFilterableColumns(): string[] {
    const { filters } = this.args;
    const columns: string[] = [];

    Object.keys(filters).forEach((k) => {
      columns.push(k);
    });

    return columns.concat(this.visibleFilterableColumns);
  }

  @action
  onFilter(key: string, keyFilter?: HdsFilterBarFilter): void {
    this._triggerFilter(key, keyFilter);
  }

  @action
  onFiltersChange(visibleFilterableColumns: string[]): void {
    const { filters } = this.args;

    this.visibleFilterableColumns = visibleFilterableColumns;

    Object.keys(filters).forEach((k) => {
      if (!this.activeFilterableColumns.includes(k)) {
        this._triggerFilter(k);
      }
    });

    let filterKeyToOpen: string | undefined = undefined;
    this.activeFilterableColumns.forEach((k) => {
      if (!filters[k]) {
        filterKeyToOpen = k;
      }
    });

    console.log('Filter key to open:', filterKeyToOpen);
    if (filterKeyToOpen) {
      // eslint-disable-next-line ember/no-runloop
      schedule('afterRender', (): void => {
        this._triggerDropdownOpen(filterKeyToOpen as string);
      });
    }
  }

  @action
  clearFilters(): void {
    this.visibleFilterableColumns = [];
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter({});
    }

    this._filtersDropdownToggleElement.focus();
  }

  @action
  onSearch(event: Event): void {
    const { onSearch } = this.args;
    if (onSearch && typeof onSearch === 'function') {
      onSearch(event);
    }
  }

  @action
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  private _triggerFilter(key: string, keyFilter?: HdsFilterBarFilter): void {
    const newFilters = this._updateFilter(key, keyFilter);

    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(newFilters);
    }
  }

  private _updateFilter(
    key: string,
    keyFilter?: HdsFilterBarFilter
  ): HdsFilterBarFilters {
    const { filters } = this.args;
    const newFilters = {} as HdsFilterBarFilters;

    Object.keys(filters).forEach((k) => {
      newFilters[k] = JSON.parse(
        JSON.stringify(filters[k])
      ) as HdsFilterBarFilter;
    });
    if (
      keyFilter === undefined ||
      (Array.isArray(keyFilter) && keyFilter.length === 0)
    ) {
      delete newFilters[key];
      this.visibleFilterableColumns = this.visibleFilterableColumns.filter(
        (colKey) => colKey !== key
      );
      // Focus back on the filters dropdown toggle after removing a filter
      this._filtersDropdownToggleElement.focus();
    } else {
      Object.assign(newFilters, { [key]: keyFilter });
    }

    return { ...newFilters };
  }

  private _triggerDropdownOpen(key: string): void {
    const dropdownElement = this._element.querySelector(
      `.hds-filter-bar__dropdown[data-filter-key="${key}"]`
    ) as HTMLElement;
    console.log('Triggering dropdown open for key:', key, dropdownElement);

    if (dropdownElement) {
      const toggleButton = dropdownElement.querySelector(
        '.hds-dropdown-toggle-button'
      ) as HTMLElement;

      if (toggleButton) {
        toggleButton.focus();
        toggleButton.click();
      }
    }
  }
}
