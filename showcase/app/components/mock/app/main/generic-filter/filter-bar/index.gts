/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { eq, notEq, and } from 'ember-truth-helpers';

// HDS components
import {
  HdsButton,
  HdsTag,
  HdsTextBody,
  HdsFormTextInputBase,
} from '@hashicorp/design-system-components/components';

import type { WithBoundArgs } from '@glint/template';
import MockAppMainGenericFilterBarDropdown from './dropdown';
import MockAppMainGenericFilterBarSegmentedGroup from './segmented-group';
import MockAppMainGenericFilterBarSuperSelect from './super-select';

export interface Filter {
  text: string;
  value: unknown;
}

export interface Filters {
  [name: string]: Filter | Filter[] | undefined;
}

export interface MockAppMainGenericFilterBarSignature {
  Args: {
    filters: Filters;
    type?: 'super-select' | 'dropdown';
    isLiveFilter?: boolean;
    onFilter?: (filters: Filters) => void;
  };
  Blocks: {
    default?: [
      {
        SuperSelect?: WithBoundArgs<
          typeof MockAppMainGenericFilterBarSuperSelect,
          'onChange' | 'filters' | 'isLiveFilter'
        >;
        Dropdown?: WithBoundArgs<
          typeof MockAppMainGenericFilterBarDropdown,
          'onChange' | 'filters'
        >;
        SegmentedGroup?: WithBoundArgs<
          typeof MockAppMainGenericFilterBarSegmentedGroup,
          'onChange' | 'filters'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}
export default class MockAppMainGenericFilterBar extends Component<MockAppMainGenericFilterBarSignature> {
  @deepTracked filters: Filters = this.args.filters;
  @tracked hasActiveFilters: boolean = Object.keys(this.filters).length > 0;

  @action
  onFilter(key: string, keyFilter?: Filter[]): void {
    this._updateFilter(key, keyFilter);

    this.hasActiveFilters = Object.keys(this.filters).length > 0;

    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(this.filters);
    }
  }

  @action
  clearFilters(): void {
    this.filters = {};
    this.hasActiveFilters = false;
    const { onFilter } = this.args;
    if (onFilter && typeof onFilter === 'function') {
      onFilter(this.filters);
    }
  }

  private _updateFilter(key: string, keyFilter?: Filter[]): void {
    const newFilters = { ...this.filters };
    if (
      !keyFilter ||
      (keyFilter && Array.isArray(keyFilter) && keyFilter.length === 0)
    ) {
      delete newFilters[key];
    } else {
      newFilters[key] = keyFilter;
    }
    this.filters = newFilters;
  }

  private onFilterDismiss = (key: string, filterValue: string): void => {
    const oldFilter = this.filters[key];
    let newFilter: Filter[] = [];
    if (Array.isArray(oldFilter)) {
      newFilter = oldFilter.filter((filter) => filter.value !== filterValue);
    }
    this.onFilter(key, newFilter);
  };

  <template>
    <div class="mock-app-main-generic-filter-bar">
      <div class="filters">
        {{#if (eq @type "super-select")}}
          <HdsFormTextInputBase
            class="filter__search"
            @type="search"
            name="filter-search"
            placeholder="Search"
          />
        {{/if}}
        {{yield
          (hash
            SuperSelect=(component
              MockAppMainGenericFilterBarSuperSelect
              onChange=this.onFilter
              filters=this.filters
              isLiveFilter=@isLiveFilter
            )
            SegmentedGroup=(component
              MockAppMainGenericFilterBarSegmentedGroup
              onChange=this.onFilter
              filters=this.filters
              isLiveFilter=@isLiveFilter
            )
            Dropdown=(component
              MockAppMainGenericFilterBarDropdown
              onChange=this.onFilter
              filters=this.filters
            )
          )
        }}
      </div>
      {{#if (and (notEq @type "super-select") this.hasActiveFilters)}}
        <div class="filter-actions">
          <HdsTextBody @size="100" @color="faint">Active Filters:</HdsTextBody>
          {{#each-in this.filters as |key filter|}}
            {{#if filter}}
              {{#each filter as |f|}}
                <HdsTag
                  @text="{{key}}: {{f.text}}"
                  @onDismiss={{fn this.onFilterDismiss key f.value}}
                />
              {{/each}}
            {{/if}}
          {{/each-in}}
          <HdsButton
            @text="Clear all filters"
            @color="tertiary"
            @icon="x"
            @size="small"
            {{on "click" this.clearFilters}}
          />
        </div>
      {{/if}}
    </div>
  </template>
}
