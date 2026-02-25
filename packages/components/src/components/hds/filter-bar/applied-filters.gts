/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { isArray } from '@ember/array';
import { fn } from '@ember/helper';

import { NUMERICAL_SELECTORS_TEXT } from './filter-group/numerical.gts';
import { DATE_SELECTORS_TEXT } from './filter-group/date.gts';
import hdsT from '../../../helpers/hds-t.ts';
import HdsTag from '../tag/index.gts';

import type HdsIntlService from '../../../services/hds-intl.ts';
import type {
  HdsFilterBarFilters,
  HdsFilterBarFilter,
  HdsFilterBarFilterType,
  HdsFilterBarData,
  HdsFilterBarGenericFilterData,
} from './types.ts';

export interface HdsFilterBarAppliedFiltersSignature {
  Args: {
    filters: HdsFilterBarFilters;
    onFilterDismiss?: (key: string, filterValue?: unknown) => void;
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarAppliedFilters extends Component<HdsFilterBarAppliedFiltersSignature> {
  @service hdsIntl!: HdsIntlService;

  private _isArrayFilter = (filter: HdsFilterBarFilter): boolean => {
    return (
      filter.type === 'multi-select' ||
      (filter.type === 'generic' && isArray(filter.data))
    );
  };

  private _onFilterDismiss = (key: string, filterValue?: unknown): void => {
    const { onFilterDismiss } = this.args;

    if (onFilterDismiss && typeof onFilterDismiss === 'function') {
      onFilterDismiss(key, filterValue);
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
    if ('dismissTagText' in data) {
      result.dismissTagText = data.dismissTagText;
    }
    return result;
  };

  private _filterText = (key: string, filter: HdsFilterBarFilter): string => {
    const valueText = this._filterValueText(filter);
    const keyText = this._filterKeyText(key, filter);
    const separatorText = this._filterSeparatorText(filter);
    return `${keyText}${separatorText} ${valueText}`;
  };

  private _arrayFilterText = (
    key: string,
    filter: HdsFilterBarFilter,
    item: HdsFilterBarGenericFilterData
  ): string => {
    const keyText = this._filterKeyText(key, filter);
    if (
      filter.type === 'generic' &&
      'dismissTagText' in item &&
      item.dismissTagText
    ) {
      return `${keyText} ${item.dismissTagText}`;
    } else {
      const valueText = item.label ?? String(item.value);
      return `${keyText}: ${valueText}`;
    }
  };

  private _filterValueText = (filter: HdsFilterBarFilter): string => {
    if (filter.type === 'numerical') {
      return this._numericalFilterValueText(filter);
    } else if (
      filter.type === 'date' ||
      filter.type === 'datetime' ||
      filter.type === 'time'
    ) {
      return this._dateFilterValueText(filter);
    } else if (filter.type === 'generic') {
      return this._genericFilterValueText(filter);
    } else {
      const result = this._filterData(filter.data);
      const resultLabel = result?.label as string;
      const resultValue = result?.value as string;
      return resultLabel ?? resultValue;
    }
  };

  private _filterKeyText = (key: string, data: HdsFilterBarFilter): string => {
    if (data.text) {
      return data.text;
    } else {
      return key;
    }
  };

  private _numericalFilterValueText = (filter: HdsFilterBarFilter): string => {
    const data = filter.data;

    if (filter.type === 'numerical' && 'selector' in data && 'value' in data) {
      const selector = data.selector as keyof typeof NUMERICAL_SELECTORS_TEXT;
      if (
        selector === 'between' &&
        typeof data.value === 'object' &&
        data.value !== null
      ) {
        const separatorText = this.hdsIntl.t(
          'hds.components.filter-bar.tag.numerical-filter.separator',
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

  private _dateFilterValueText = (filter: HdsFilterBarFilter): string => {
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
          'hds.components.filter-bar.tag.date-filter.separator',
          {
            default: 'and',
          }
        );
        const startDateText = this._formatDateFilterText(
          data.value.start as string,
          filter.type
        );
        const endDateText = this._formatDateFilterText(
          data.value.end as string,
          filter.type
        );
        return `${DATE_SELECTORS_TEXT[selector]} ${startDateText} ${separatorText} ${endDateText}`;
      } else if (data.value !== null && typeof data.value !== 'object') {
        const dateText = this._formatDateFilterText(
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

  private _formatDateFilterText = (
    dateString: string,
    filterType: HdsFilterBarFilterType
  ): string => {
    let date;
    if (filterType === 'time') {
      date = new Date(`1970-01-01T${dateString}`);
    } else if (filterType === 'date') {
      // Parse YYYY-MM-DD as a local date to avoid timezone shifts
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
      if (m) {
        const year = Number(m[1]);
        const month = Number(m[2]) - 1;
        const day = Number(m[3]);
        date = new Date(year, month, day);
      } else {
        date = new Date(dateString);
      }
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

    // Use the intl service if available for consistent localization, and fall back to the native Intl API
    if (this.hdsIntl.intl) {
      return this.hdsIntl.intl.formatDate(date, options);
    } else {
      const newDate = new Intl.DateTimeFormat(undefined, options);
      return newDate.format(date);
    }
  };

  private _genericFilterValueText = (filter: HdsFilterBarFilter): string => {
    if ('dismissTagText' in filter) {
      return filter.dismissTagText ?? '';
    } else {
      const result = this._filterData(filter.data);
      const resultLabel = result?.label as string;
      const resultValue = result?.value as string;
      return resultLabel ?? resultValue;
    }
  };

  private _arrayFilterData = (
    data: HdsFilterBarData
  ): { value: unknown; label?: string; dismissTagText?: string }[] => {
    if (isArray(data)) {
      return data.map((item) => this._filterData(item));
    }
    return [];
  };

  private _filterSeparatorText = (filter: HdsFilterBarFilter): string => {
    return filter.type === 'single-select' ||
      filter.type === 'multi-select' ||
      filter.type === 'search' ||
      (filter.type === 'generic' && !filter.dismissTagText)
      ? ':'
      : '';
  };

  <template>
    <div class="hds-filter-bar__applied-filters" ...attributes>
      {{#each-in @filters as |key filter|}}
        {{#if filter.data}}
          {{#if (this._isArrayFilter filter)}}
            {{#each (this._arrayFilterData filter.data) as |item|}}
              <HdsTag
                @text="{{this._arrayFilterText key filter item}}"
                @ariaLabel={{hdsT
                  "hds.components.filter-bar.applied-filters.tag.aria-label"
                  default="Clear filter"
                }}
                @onDismiss={{fn this._onFilterDismiss key item.value}}
              />
            {{/each}}
          {{else}}
            <HdsTag
              @text={{this._filterText key filter}}
              @ariaLabel={{hdsT
                "hds.components.filter-bar.applied-filters.tag.aria-label"
                default="Clear filter"
              }}
              @onDismiss={{fn this._onFilterDismiss key}}
            />
          {{/if}}
        {{/if}}
      {{/each-in}}
    </div>
  </template>
}
