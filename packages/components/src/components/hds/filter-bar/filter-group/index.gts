/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { on } from '@ember/modifier';
import { eq, or } from 'ember-truth-helpers';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import hdsT from '../../../../helpers/hds-t.ts';
import HdsFilterBarTabsTab from '../tabs/tab.gts';
import HdsFilterBarTabsPanel from '../tabs/panel.gts';
import HdsFilterBarFilterGroupGeneric from './generic.gts';
import HdsFilterBarFilterGroupCheckbox from './checkbox.gts';
import HdsFilterBarFilterGroupRadio from './radio.gts';
import HdsFilterBarFilterGroupClearButton from './clear-button.gts';
import HdsFilterBarFilterGroupDate from './date.gts';
import HdsFilterBarFilterGroupNumerical from './numerical.gts';
import HdsFormTextInputBase from '../../form/text-input/base.gts';

import type {
  HdsFilterBarFilter,
  HdsFilterBarFilters,
  HdsFilterBarFilterType,
  HdsFilterBarData,
  HdsFilterBarGenericFilterData,
} from '../types.ts';

export interface HdsFilterBarFilterGroupSignature {
  Args: {
    tab?: WithBoundArgs<typeof HdsFilterBarTabsTab, never>;
    panel?: WithBoundArgs<typeof HdsFilterBarTabsPanel, never>;
    key: string;
    text: string;
    type: HdsFilterBarFilterType;
    filters: HdsFilterBarFilters;
    searchEnabled?: boolean;
    onChange: (key: string, keyFilter?: HdsFilterBarFilter) => void;
    onClear?: (key: string) => void;
  };
  Blocks: {
    default: [
      {
        Generic?: WithBoundArgs<
          typeof HdsFilterBarFilterGroupGeneric,
          'onChange'
        >;
        Checkbox?: WithBoundArgs<
          typeof HdsFilterBarFilterGroupCheckbox,
          'keyFilter' | 'name' | 'searchValue' | 'onChange'
        >;
        Radio?: WithBoundArgs<
          typeof HdsFilterBarFilterGroupRadio,
          'keyFilter' | 'name' | 'searchValue' | 'onChange'
        >;
      },
    ];
  };
}

export default class HdsFilterBarFilterGroup extends Component<HdsFilterBarFilterGroupSignature> {
  @tracked internalFilters: HdsFilterBarData | undefined = undefined;
  @tracked searchValue: string | undefined = undefined;

  private _setUpFilterPanel = modifier(() => {
    // Note: Due to the filters being an Ember object, structuredClone cannot be used here.
    // Further investigation will be done in a follow-up task: https://hashicorp.atlassian.net/browse/HDS-5907
    if (this.keyFilter) {
      this.internalFilters = JSON.parse(
        JSON.stringify(this.keyFilter.data)
      ) as HdsFilterBarData;
    }
  });

  get keyFilter(): HdsFilterBarFilter | undefined {
    const { filters, key } = this.args;

    if (!filters) {
      return undefined;
    }
    return filters[key];
  }

  get numFilters(): number {
    const { filters, key } = this.args;
    if (filters && key in filters) {
      const keyFilters = filters[key]?.data;
      if (Array.isArray(keyFilters)) {
        return keyFilters.length;
      } else if (keyFilters) {
        return 1;
      }
    }
    return 0;
  }

  get formattedFilters(): HdsFilterBarFilter | undefined {
    const { type, text } = this.args;
    if (
      this.internalFilters === undefined ||
      (Array.isArray(this.internalFilters) && this.internalFilters.length === 0)
    ) {
      return undefined;
    }
    return {
      type: type,
      text: text,
      data: this.internalFilters,
    } as HdsFilterBarFilter;
  }

  onSelectionChange = (event: Event, label?: string): void => {
    const { type } = this.args;

    const addFilter = (value: unknown): void => {
      const newFilter = {
        value: value,
        label: label,
      } as HdsFilterBarGenericFilterData;
      if (type === 'multi-select') {
        if (Array.isArray(this.internalFilters)) {
          this.internalFilters = [...this.internalFilters, newFilter];
        } else {
          this.internalFilters = [newFilter];
        }
      } else {
        this.internalFilters = newFilter;
      }
    };

    const removeFilter = (value: string): void => {
      if (type === 'multi-select' && Array.isArray(this.internalFilters)) {
        const newFilter = [] as HdsFilterBarGenericFilterData[];
        this.internalFilters.forEach((filter) => {
          if (filter.value != value) {
            newFilter.push(filter);
          }
        });
        this.internalFilters = newFilter;
      } else {
        this.internalFilters = undefined;
      }
    };

    const input = event.target as HTMLInputElement;

    if (input.checked) {
      addFilter(input.value);
    } else {
      removeFilter(input.value);
    }

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, this.formattedFilters);
    }
  };

  onGenericChange = (filter: HdsFilterBarFilter): void => {
    this.internalFilters = filter.data;
    filter.text = this.args.text;

    const { onChange } = this.args;
    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key, filter);
    }
  };

  onClear = (): void => {
    this.internalFilters = undefined;
    const { onChange, onClear } = this.args;

    if (onClear && typeof onClear === 'function') {
      onClear(this.args.key);
    }

    if (onChange && typeof onChange === 'function') {
      onChange(this.args.key);
    }
  };

  private _onSearch = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.searchValue = input.value;
  };

  <template>
    {{#let @tab as |Tab|}}
      <Tab @numFilters={{this.numFilters}}>
        {{@text}}
      </Tab>
    {{/let}}
    {{#let @panel as |Panel|}}
      <Panel {{this._setUpFilterPanel}}>
        {{#if @searchEnabled}}
          <div class="hds-filter-bar__filter-group__search">
            <HdsFormTextInputBase
              @type="search"
              aria-label={{hdsT
                "components.filter-bar.filter-group.search-input.aria-label"
                default="Search filter options"
              }}
              aria-description={{hdsT
                "hds.components.filter-bar.filter-group.search-input.aria-description"
                default="Search will be performed automatically as you type"
              }}
              placeholder={{hdsT
                "hds.components.filter-bar.filter-group.search-input.placeholder"
                default="Search"
              }}
              {{on "input" this._onSearch}}
            />
          </div>
        {{/if}}
        {{#if
          (or
            (eq @type "numerical")
            (eq @type "date")
            (eq @type "datetime")
            (eq @type "time")
            (eq @type "generic")
          )
        }}
          {{#if (eq @type "numerical")}}
            <HdsFilterBarFilterGroupNumerical
              @key={{@key}}
              @keyFilter={{this.keyFilter}}
              @text={{@text}}
              @onChange={{this.onGenericChange}}
            />
          {{else if (eq @type "date")}}
            <HdsFilterBarFilterGroupDate
              @key={{@key}}
              @keyFilter={{this.keyFilter}}
              @text={{@text}}
              @onChange={{this.onGenericChange}}
              @type="date"
            />
          {{else if (eq @type "datetime")}}
            <HdsFilterBarFilterGroupDate
              @key={{@key}}
              @keyFilter={{this.keyFilter}}
              @text={{@text}}
              @onChange={{this.onGenericChange}}
              @type="datetime"
            />
          {{else if (eq @type "time")}}
            <HdsFilterBarFilterGroupDate
              @key={{@key}}
              @keyFilter={{this.keyFilter}}
              @text={{@text}}
              @onChange={{this.onGenericChange}}
              @type="time"
            />
          {{else if (eq @type "generic")}}
            {{yield
              (hash
                Generic=(component
                  HdsFilterBarFilterGroupGeneric onChange=this.onGenericChange
                )
              )
            }}
          {{/if}}
          <HdsFilterBarFilterGroupClearButton
            @text={{hdsT
              "hds.components.filter-bar.filter-group.values-list.clear-filter"
              default="Clear filter"
            }}
            {{on "click" this.onClear}}
          />
        {{else if (or (eq @type "single-select") (eq @type "multi-select"))}}
          <div class="hds-filter-bar__filter-group__values-list">
            <HdsFilterBarFilterGroupClearButton
              @text={{hdsT
                "hds.components.filter-bar.filter-group.values-list.clear-selection"
                default="Clear selection"
              }}
              {{on "click" this.onClear}}
            />
            <fieldset class="hds-filter-bar__filter-group__list">
              <legend class="sr-only">
                {{hdsT
                  "hds.components.filter-bar.filter-group.values-list.legend"
                  text=@text
                  default="Filter by options"
                }}
              </legend>
              {{#if (eq @type "single-select")}}
                {{yield
                  (hash
                    Radio=(component
                      HdsFilterBarFilterGroupRadio
                      keyFilter=this.keyFilter
                      name=@key
                      searchValue=this.searchValue
                      onChange=this.onSelectionChange
                    )
                  )
                }}
              {{else if (eq @type "multi-select")}}
                {{yield
                  (hash
                    Checkbox=(component
                      HdsFilterBarFilterGroupCheckbox
                      keyFilter=this.keyFilter
                      name=@key
                      searchValue=this.searchValue
                      onChange=this.onSelectionChange
                    )
                  )
                }}
              {{/if}}
            </fieldset>
          </div>
        {{/if}}
      </Panel>
    {{/let}}
  </template>
}
