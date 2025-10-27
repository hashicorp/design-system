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
    activeFilterableColumns?: string[];
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
  @tracked filters: HdsFilterBarFilters = {};
  @tracked hasActiveFilters: boolean = Object.keys(this.filters).length > 0;
  @tracked activeFilterableColumns: string[] = [];
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
  onFilter(key: string, keyFilter?: HdsFilterBarFilter): void {
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

    let filterKeyToOpen: string | undefined = undefined;
    activeFilterableColumns.forEach((k) => {
      if (!this.filters[k]) {
        filterKeyToOpen = k;
      }
    });

    if (filterKeyToOpen) {
      // eslint-disable-next-line ember/no-runloop
      schedule('afterRender', (): void => {
        this._triggerDropdownOpen(filterKeyToOpen as string);
      });
    }
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
    this._updateFilter(key, keyFilter);

    this.hasActiveFilters = Object.keys(this.filters).length > 0;

    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(this.filters);
    }
  }

  private _updateFilter(key: string, keyFilter?: HdsFilterBarFilter): void {
    const newFilters = {} as HdsFilterBarFilters;
    Object.keys(this.filters).forEach((k) => {
      newFilters[k] = JSON.parse(
        JSON.stringify(this.filters[k])
      ) as HdsFilterBarFilter;
    });
    if (
      keyFilter === undefined ||
      (Array.isArray(keyFilter) && keyFilter.length === 0)
    ) {
      delete newFilters[key];
      this.activeFilterableColumns = this.activeFilterableColumns.filter(
        (colKey) => colKey !== key
      );
      // Focus back on the filters dropdown toggle after removing a filter
      this._filtersDropdownToggleElement.focus();
    } else {
      Object.assign(newFilters, { [key]: keyFilter });
    }
    this.filters = { ...newFilters };
  }

  private _triggerDropdownOpen(key: string): void {
    const dropdownElement = this._element.querySelector(
      `.hds-dropdown[data-filter-key="${key}"]`
    ) as HTMLElement;

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
