/**
 * Copyright IBM Corp. 2021, 2026
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
  HdsFilterBarData,
  HdsFilterBarGenericFilterData,
} from './types.ts';

export interface HdsFilterBarSignature {
  Args: {
    filters: HdsFilterBarFilters;
    isLiveFilter?: boolean;
    hasSearch?: boolean;
    searchPlaceholder?: string;
    searchAriaLabel?: string;
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
  @service declare readonly hdsIntl: HdsIntlService;

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

  get searchAriaLabel(): string {
    return (
      this.args.searchAriaLabel ||
      this.hdsIntl.t('hds.components.filter-bar.search.aria-label', {
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
        text: this.hdsIntl.t(
          'hds.components.filter-bar.applied-filters.tag.search-label',
          {
            default: 'Search',
          }
        ),
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

  <template>
    <div class="hds-filter-bar" ...attributes {{this._setUpFilterBar}}>
      {{#if @isLiveFilter}}
        <span class="sr-only">{{hdsT
            "hds.components.filter-bar.live-filtering"
            default="Filters will be applied automatically as selections are made"
          }}</span>
      {{/if}}
      <HdsLayoutFlex
        @align="center"
        @wrap={{true}}
        @gap="8"
        class="hds-filter-bar__actions"
      >
        <div class="hds-filter-bar__actions__left">
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
              aria-label={{this.searchAriaLabel}}
              name="search"
              {{on "change" this.onSearch}}
            />
          {{/if}}
        </div>
        {{yield (hash ActionsGeneric=HdsYield)}}
        {{yield (hash ActionsDropdown=HdsFilterBarActionsDropdown)}}
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
