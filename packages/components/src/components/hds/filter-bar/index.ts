/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { ComponentLike, WithBoundArgs } from '@glint/template';

import type {
  HdsFilterBarFilters,
  HdsFilterBarFilter,
  HdsFilterBarData,
  HdsFilterBarSelectionFilterData,
} from './types.ts';
import HdsDropdown from '../dropdown/index.ts';
import HdsFilterBarFiltersDropdown from './filters-dropdown.ts';
import { isArray } from '@ember/array';

export interface HdsFilterBarSignature {
  Args: {
    filters: HdsFilterBarFilters;
    hasSearch?: boolean;
    onFilter?: (filters: HdsFilterBarFilters) => void;
    onSearch?: (event: Event) => void;
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
    const { onSearch } = this.args;
    if (onSearch && typeof onSearch === 'function') {
      onSearch(event);
    }
  }

  get hasActiveFilters(): boolean {
    return Object.keys(this.args.filters).length > 0;
  }

  private onFilterDismiss = (key: string, filterValue: unknown): void => {
    const { filters } = this.args;
    if (filters && filters[key]) {
      const keyFilter: HdsFilterBarFilter = filters[key];
      const newFilters = {} as HdsFilterBarFilters;

      Object.keys(filters).forEach((k) => {
        newFilters[k] = JSON.parse(
          JSON.stringify(filters[k])
        ) as HdsFilterBarFilter;
      });

      if (keyFilter.type === 'single-select' || keyFilter.type === 'range') {
        delete newFilters[key];
      } else if (isArray(keyFilter.data)) {
        const newKeyfilter = keyFilter.data?.filter(
          (item) => item.value !== filterValue
        );
        if (newKeyfilter.length === 0) {
          delete newFilters[key];
        } else {
          newFilters[key] = {
            type: 'multi-select',
            data: newKeyfilter,
          };
        }
      }

      this.onFilter({ ...newFilters });
    }
  };

  private _filterData = (
    data: HdsFilterBarData
  ): HdsFilterBarSelectionFilterData => {
    if ('text' in data && 'value' in data) {
      return { text: data.text, value: data.value };
    }
    return { text: '', value: '' };
  };

  private _filterText = (data: HdsFilterBarData): string => {
    const result = this._filterData(data);
    return result?.text ?? '';
  };

  private _filterValue = (data: HdsFilterBarData): unknown => {
    const result = this._filterData(data);
    return result?.value;
  };

  private _filterArrayData = (
    data: HdsFilterBarData
  ): { text: string; value: unknown }[] => {
    if (isArray(data)) {
      return data.map((item) => this._filterData(item));
    }
    return [];
  };
}
