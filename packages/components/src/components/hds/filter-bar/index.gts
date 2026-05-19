/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { isArray } from '@ember/array';
import { modifier } from 'ember-modifier';
import { guidFor } from '@ember/object/internals';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';

import type { WithBoundArgs } from '@glint/template';

import { NUMERICAL_SELECTORS_TEXT } from './filter-group/numerical.gts';
import { DATE_SELECTORS_TEXT } from './filter-group/date.gts';
import hdsT from '../../../helpers/hds-t.ts';
import HdsYield from '../yield/index.gts';
import HdsFilterBarActionsDropdown from './actions-dropdown.gts';
import HdsFilterBarFiltersDropdown from './filters-dropdown.gts';
import HdsLayoutFlex from '../layout/flex/index.gts';
import HdsFormTextInputBase from '../form/text-input/base.gts';
import HdsButton from '../button/index.gts';
import HdsSeparator from '../separator/index.gts';
import HdsTextBody from '../text/body.gts';
import HdsFilterBarAppliedFilters from './applied-filters.gts';

import type HdsIntlService from '../../../services/hds-intl.ts';
import type {
  HdsFilterBarFilters,
  HdsFilterBarFilter,
  HdsFilterBarFilterType,
  HdsFilterBarData,
  HdsFilterBarGenericFilterData,
} from './types.ts';

export interface HdsFilterBarSignature {
  Args: {
    filters: HdsFilterBarFilters;
    isLiveFilter?: boolean;
    hasSearch?: boolean;
    searchPlaceholder?: string;
    onFilter?: (filters: HdsFilterBarFilters) => void;
  };
  Blocks: {
    default?: [
      {
        FiltersDropdown?: WithBoundArgs<
          typeof HdsFilterBarFiltersDropdown,
          'filters' | 'isLiveFilter' | 'onFilter'
        >;
        ActionsDropdown?: WithBoundArgs<
          typeof HdsFilterBarActionsDropdown,
          never
        >;
        ActionsGeneric?: typeof HdsYield;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBar extends Component<HdsFilterBarSignature> {
  @service hdsIntl!: HdsIntlService;

  @tracked _isExpanded: boolean = this.hasActiveFilters;

  private _dropdownToggleElement!: HTMLDivElement;
  private _appliedFiltersButtonId = 'applied-filters-button-' + guidFor(this);
  private _appliedFiltersContentId = 'applied-filters-content-' + guidFor(this);

  private _setUpFilterBar = modifier((element: HTMLDivElement) => {
    this._dropdownToggleElement = element.querySelector(
      '.hds-filter-bar__filters-dropdown .hds-dropdown-toggle-button'
    ) as HTMLDivElement;

    // Align the expanded state with the presence of active filters
    this._isExpanded = this.hasActiveFilters;
  });

  get searchValue(): string {
    const { filters } = this.args;
    if (filters['search']) {
      return this._getFilterValueText(filters['search']);
    }
    return '';
  }

  get searchPlaceholder(): string {
    return (
      this.args.searchPlaceholder ||
      this.hdsIntl.t('hds.components.filter-bar.search.placeholder', {
        default: 'Search',
      })
    );
  }

  get hasActiveFilters(): boolean {
    return Object.keys(this.args.filters).length > 0;
  }

  onFilter = (filters: HdsFilterBarFilters): void => {
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(filters);

      if (Object.keys(filters).length > 0) {
        this._isExpanded = true;
      } else {
        this._isExpanded = false;
      }
    }
  };

  clearFilters = (): void => {
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter({});
      this._isExpanded = false;
    }
    this._dropdownToggleElement?.focus();
  };

  onSearch = (event: Event): void => {
    const { filters } = this.args;
    const input = event.target as HTMLInputElement;
    const value = input?.value;

    const newFilters = this._copyFilters(filters);

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
  };

  toggleExpand = (): void => {
    this._isExpanded = !this._isExpanded;
  };

  private _copyFilters = (
    filters: HdsFilterBarFilters
  ): HdsFilterBarFilters => {
    const newFilters = {} as HdsFilterBarFilters;

    // Note: Due to the filters being an Ember object, structuredClone cannot be used here.
    // Further investigation will be done in a follow-up task: https://hashicorp.atlassian.net/browse/HDS-5907
    Object.keys(filters).forEach((k) => {
      newFilters[k] = JSON.parse(
        JSON.stringify(filters[k])
      ) as HdsFilterBarFilter;
    });

    return newFilters;
  };

  private _onFilterDismiss = (key: string, filterValue?: unknown): void => {
    const { filters } = this.args;
    if (filters && filters[key]) {
      const keyFilter: HdsFilterBarFilter = filters[key];
      const newFilters = this._copyFilters(filters);

      if (
        (keyFilter.type === 'multi-select' && isArray(keyFilter.data)) ||
        (keyFilter.type === 'generic' && isArray(keyFilter.data))
      ) {
        const newKeyfilter = keyFilter.data?.filter(
          (item) => item.value !== filterValue
        );
        if (newKeyfilter.length === 0) {
          delete newFilters[key];
        } else {
          newFilters[key] = {
            type: keyFilter.type,
            text: keyFilter.text,
            data: newKeyfilter,
          };
        }
      } else {
        delete newFilters[key];
      }

      this.onFilter({ ...newFilters });
    }
    this._dropdownToggleElement?.focus();
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

  private _getFilterValueText = (filter: HdsFilterBarFilter): string => {
    const result = this._filterData(filter.data);
    const resultLabel = result?.label as string;
    const resultValue = result?.value as string;
    return resultLabel ?? resultValue;
  };

  private _getFilterKeyText = (
    key: string,
    data: HdsFilterBarFilter
  ): string => {
    if (data.text) {
      return data.text;
    } else {
      return key;
    }
  };

  private _getNumericalFilterValueText = (
    filter: HdsFilterBarFilter
  ): string => {
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

  private _getDateFilterValueText = (filter: HdsFilterBarFilter): string => {
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

  private _getGenericFilterValueText = (filter: HdsFilterBarFilter): string => {
    if ('dismissTagText' in filter) {
      return filter.dismissTagText ?? '';
    } else {
      return '';
    }
  };

  private _getMultiSelectFilterData = (
    data: HdsFilterBarData
  ): { value: unknown; label?: string }[] => {
    if (isArray(data)) {
      return data.map((item) => this._filterData(item));
    }
    return [];
  };

  <template>
    <div class="hds-filter-bar" ...attributes {{this._setUpFilterBar}}>
      {{#if @isLiveFilter}}
        <span class="sr-only">{{hdsT
            "hds.components.filter-bar.live-filtering"
            default="Filters will be applied automatically as selections are made"
          }}</span>
      {{/if}}
      <HdsLayoutFlex @align="center" @gap="8" class="hds-filter-bar__actions">
        <HdsButton
          @text={{hdsT
            "hds.components.filter-bar.applied-filters.toggle-button"
            default="View applied filters"
          }}
          @color="secondary"
          @size="small"
          @icon={{if this._isExpanded "unfold-close" "unfold-open"}}
          @isIconOnly={{true}}
          id={{this._appliedFiltersButtonId}}
          aria-controls={{this._appliedFiltersContentId}}
          aria-expanded={{if this._isExpanded "true" "false"}}
          class="hds-filter-bar__applied-filters-toggle-button"
          {{on "click" this.toggleExpand}}
        />
        {{yield
          (hash
            FiltersDropdown=(component
              HdsFilterBarFiltersDropdown
              filters=@filters
              isLiveFilter=@isLiveFilter
              onFilter=this.onFilter
            )
          )
        }}
        {{#if @hasSearch}}
          <HdsFormTextInputBase
            @type="search"
            @value={{this.searchValue}}
            class="hds-filter-bar__search"
            placeholder={{this.searchPlaceholder}}
            aria-label={{hdsT
              "hds.components.filter-bar.search.aria-label"
              default="Search"
            }}
            name="search"
            {{on "change" this.onSearch}}
          />
        {{/if}}
        <HdsLayoutFlex
          @gap="8"
          @align="center"
          class="hds-filter-bar__actions__right"
        >
          {{yield (hash ActionsGeneric=HdsYield)}}
          {{yield (hash ActionsDropdown=HdsFilterBarActionsDropdown)}}
        </HdsLayoutFlex>
      </HdsLayoutFlex>
      <div
        class="hds-filter-bar__applied-filters-list"
        id={{this._appliedFiltersContentId}}
      >
        {{#if this._isExpanded}}
          <HdsSeparator @spacing="0" />
          <div class="hds-filter-bar__applied-filters-list__content">
            {{#if this.hasActiveFilters}}
              <HdsFilterBarAppliedFilters
                @filters={{@filters}}
                @onFilterDismiss={{this._onFilterDismiss}}
              />
              <HdsButton
                class="hds-filter-bar__clear-button"
                @text={{hdsT
                  "hds.components.filter-bar.applied-filters.clear-filters"
                  default="Clear all filters"
                }}
                @color="tertiary"
                @icon="x"
                @size="small"
                {{on "click" this.clearFilters}}
              />
            {{else}}
              <HdsTextBody @size={{100}} @color="faint">
                {{hdsT
                  "hds.components.filter-bar.applied-filters.no-filters-applied"
                  default="No filters applied"
                }}
              </HdsTextBody>
            {{/if}}
          </div>
        {{/if}}
      </div>
    </div>
  </template>
}
