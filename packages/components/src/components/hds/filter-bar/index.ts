/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { ComponentLike, WithBoundArgs } from '@glint/template';

import type {
  HdsFilterBarFilters,
  HdsFilterBarFilter,
  HdsFilterBarData,
  HdsFilterBarGenericFilterData,
} from './types.ts';
import HdsDropdown from '../dropdown/index.ts';
import HdsFilterBarFiltersDropdown from './filters-dropdown.ts';
import { isArray } from '@ember/array';

import { SELECTORS_DISPLAY_SYMBOL } from './range.ts';

export interface HdsFilterBarSignature {
  Args: {
    filters: HdsFilterBarFilters;
    hasSearch?: boolean;
    onFilter?: (filters: HdsFilterBarFilters) => void;
  };
  Blocks: {
    default?: [
      {
        ActionsDropdown?: ComponentLike<typeof HdsDropdown>;
        FiltersDropdown?: WithBoundArgs<
          typeof HdsFilterBarFiltersDropdown,
          'filters' | 'onFilter'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBar extends Component<HdsFilterBarSignature> {
  @tracked _isExpanded: boolean = true;

  get searchValue(): string {
    const { filters } = this.args;
    if (filters['search']) {
      return this._filterText(filters['search'].data);
    }
    return '';
  }

  @action
  onFilter(filters: HdsFilterBarFilters): void {
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(filters);
    }
  }

  @action
  clearFilters(): void {
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter({});
    }
  }

  @action
  onSearch(event: Event): void {
    const { filters } = this.args;
    const input = event.target as HTMLInputElement;
    const value = input?.value;

    const newFilters = {} as HdsFilterBarFilters;

    Object.keys(filters).forEach((k) => {
      newFilters[k] = JSON.parse(
        JSON.stringify(filters[k])
      ) as HdsFilterBarFilter;
    });

    if (value.length > 0) {
      newFilters['search'] = {
        type: 'search',
        text: 'Search',
        data: { value },
      };
    } else {
      delete newFilters['search'];
    }

    this.onFilter({ ...newFilters });
  }

  @action
  toggleExpand(): void {
    this._isExpanded = !this._isExpanded;
  }

  get hasActiveFilters(): boolean {
    return Object.keys(this.args.filters).length > 0;
  }

  private onFilterDismiss = (key: string, filterValue?: unknown): void => {
    const { filters } = this.args;
    if (filters && filters[key]) {
      const keyFilter: HdsFilterBarFilter = filters[key];
      const newFilters = {} as HdsFilterBarFilters;

      Object.keys(filters).forEach((k) => {
        newFilters[k] = JSON.parse(
          JSON.stringify(filters[k])
        ) as HdsFilterBarFilter;
      });

      if (keyFilter.type === 'multi-select' && isArray(keyFilter.data)) {
        const newKeyfilter = keyFilter.data?.filter(
          (item) => item.value !== filterValue
        );
        if (newKeyfilter.length === 0) {
          delete newFilters[key];
        } else {
          newFilters[key] = {
            type: 'multi-select',
            text: keyFilter.text,
            data: newKeyfilter,
          };
        }
      } else {
        delete newFilters[key];
      }

      this.onFilter({ ...newFilters });
    }
  };

  private _filterData = (
    data: HdsFilterBarData
  ): HdsFilterBarGenericFilterData => {
    if ('value' in data) {
      return { value: data.value };
    }
    return { value: '' };
  };

  private _filterText = (data: HdsFilterBarData): string => {
    const result = this._filterData(data);
    const resultText = result?.value as string;
    return resultText ?? '';
  };

  private _filterArrayData = (data: HdsFilterBarData): { value: unknown }[] => {
    if (isArray(data)) {
      return data.map((item) => this._filterData(item));
    }
    return [];
  };

  private _filterKeyText = (key: string, data: HdsFilterBarFilter): string => {
    if (data.text) {
      return data.text;
    } else {
      return key;
    }
  };

  private _rangeFilterText = (data: HdsFilterBarData): string => {
    if ('selector' in data && 'value' in data) {
      return `${SELECTORS_DISPLAY_SYMBOL[data.selector]} ${data.value}`;
    } else {
      return '';
    }
  };
}
