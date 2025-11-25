/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

import type { WithBoundArgs } from '@glint/template';

import type HdsIntlService from '../../../services/hds-intl';
import type {
  HdsFilterBarFilters,
  HdsFilterBarFilter,
  HdsFilterBarFilterType,
  HdsFilterBarData,
  HdsFilterBarGenericFilterData,
} from './types.ts';
import HdsDropdown from '../dropdown/index.ts';
import HdsYield from '../yield/index.ts';
import HdsFilterBarDropdown from './dropdown.ts';
import { isArray } from '@ember/array';

import { NUMERICAL_SELECTORS_TEXT } from './filter-group/numerical.ts';
import { DATE_SELECTORS_TEXT } from './filter-group/date.ts';

export interface HdsFilterBarSignature {
  Args: {
    filters: HdsFilterBarFilters;
    isLiveFilter?: boolean;
    hasSearch?: boolean;
    onFilter?: (filters: HdsFilterBarFilters) => void;
  };
  Blocks: {
    default?: [
      {
        ActionsDropdown?: WithBoundArgs<typeof HdsDropdown, never>;
        ActionsGeneric?: WithBoundArgs<typeof HdsYield, never>;
        Dropdown?: WithBoundArgs<
          typeof HdsFilterBarDropdown,
          'filters' | 'isLiveFilter' | 'onFilter'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBar extends Component<HdsFilterBarSignature> {
  @service hdsIntl!: HdsIntlService;

  @tracked _isExpanded: boolean = this.hasActiveFilters;

  get searchValue(): string {
    const { filters } = this.args;
    if (filters['search']) {
      return this._filterText(filters['search']);
    }
    return '';
  }

  @action
  onFilter(filters: HdsFilterBarFilters): void {
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(filters);

      if (Object.keys(filters).length > 0) {
        this._isExpanded = true;
      } else {
        this._isExpanded = false;
      }
    }
  }

  @action
  clearFilters(): void {
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter({});
      this._isExpanded = false;
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
    const result = {
      value: '',
    } as HdsFilterBarGenericFilterData;
    if ('value' in data) {
      result.value = data.value;
    }
    if ('label' in data) {
      result.label = data.label;
    }
    return result;
  };

  private _filterText = (filter: HdsFilterBarFilter): string => {
    const result = this._filterData(filter.data);
    const resultLabel = result?.label as string;
    const resultValue = result?.value as string;
    return resultLabel ?? resultValue;
  };

  private _filterArrayData = (
    data: HdsFilterBarData
  ): { value: unknown; label?: string }[] => {
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

  private _numericalFilterText = (filter: HdsFilterBarFilter): string => {
    const data = filter.data;

    if (filter.type === 'numerical' && 'selector' in data && 'value' in data) {
      const selector = data.selector as keyof typeof NUMERICAL_SELECTORS_TEXT;
      if (
        selector === 'between' &&
        typeof data.value === 'object' &&
        data.value !== null
      ) {
        const separatorText = this.hdsIntl.t(
          'hds.components.filter-bar.filter-text.numerical-filter.separator',
          {
            default: 'and',
          }
        );
        return `${NUMERICAL_SELECTORS_TEXT[selector]} ${data.value.start} ${separatorText} ${data.value.end}`;
      } else if (typeof data.value !== 'object') {
        return `${NUMERICAL_SELECTORS_TEXT[selector]} ${data.value}`;
      }
      return '';
    } else {
      return '';
    }
  };

  private _dateFilterText = (filter: HdsFilterBarFilter): string => {
    const data = filter.data;

    if (
      (filter.type === 'date' ||
        filter.type === 'datetime' ||
        filter.type === 'time') &&
      'selector' in data &&
      'value' in data
    ) {
      const selector = data.selector as keyof typeof DATE_SELECTORS_TEXT;
      if (
        selector === 'between' &&
        typeof data.value === 'object' &&
        data.value !== null
      ) {
        const separatorText = this.hdsIntl.t(
          'hds.components.filter-bar.filter-text.date-filter.separator',
          {
            default: 'and',
          }
        );
        const startDateText = this._dateDisplayText(
          data.value.start as string,
          filter.type
        );
        const endDateText = this._dateDisplayText(
          data.value.end as string,
          filter.type
        );
        return `${DATE_SELECTORS_TEXT[selector]} ${startDateText} ${separatorText} ${endDateText}`;
      } else if (data.value !== null && typeof data.value !== 'object') {
        const dateText = this._dateDisplayText(
          data.value as string,
          filter.type
        );
        return `${DATE_SELECTORS_TEXT[selector]} ${dateText}`;
      }
      return '';
    } else {
      return '';
    }
  };

  private _dateDisplayText = (
    dateString: string,
    filterType: HdsFilterBarFilterType
  ): string => {
    let date;
    if (filterType === 'time') {
      date = new Date(`1970-01-01T${dateString}`);
    } else {
      date = new Date(dateString);
    }

    let options = {};
    if (filterType === 'date') {
      options = { dateStyle: 'short' };
    } else if (filterType === 'time') {
      options = { timeStyle: 'short' };
    } else {
      options = { dateStyle: 'short', timeStyle: 'short' };
    }

    const newDate = new Intl.DateTimeFormat(undefined, options);
    return newDate.format(date);
  };

  private _genericFilterText = (filter: HdsFilterBarFilter): string => {
    if ('dismissTagText' in filter) {
      return filter.dismissTagText ?? '';
    } else {
      return '';
    }
  };
}
