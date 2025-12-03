/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { get, fn } from '@ember/object';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier/modifiers/style';

import ShwPlaceholder from 'showcase/components/shw/placeholder';
import RUNS from 'showcase/mocks/run-data';

import {
  HdsBadge,
  HdsButton,
  HdsFilterBar,
  HdsTable,
  type HdsFilterBarNumericalFilter,
  type HdsFilterBarDateFilter,
  type HdsFilterBarSingleSelectFilter,
  type HdsFilterBarMultiSelectFilter,
  type HdsFilterBarSearchFilter,
  type HdsFilterBarFilter,
  type HdsFilterBarGenericFilter,
} from '@hashicorp/design-system-components/components';

import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

const RUNS_VALUES = {
  'run-status': Array.from(
    new Set(RUNS.map((item) => item['run-status'])),
  ).map((value) => ({ value, label: value })),
  'terraform-version': Array.from(
    new Set(RUNS.map((item) => item['terraform-version'])),
  ).map((value) => ({ value, label: value })),
};

const COLUMNS = [
  {
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Project name',
    key: 'project-name',
  },
  {
    label: 'Current run ID',
    key: 'current-run-id',
  },
  {
    label: 'Run status',
    key: 'run-status',
  },
  {
    label: 'Current run applied',
    key: 'current-run-applied',
  },
  {
    label: 'Creation time',
    key: 'creation-time',
  },
  {
    label: 'VCS repo',
    key: 'vcs-repo',
  },
  {
    label: 'Module count',
    key: 'module-count',
  },
  {
    label: 'Modules',
    key: 'modules',
  },
  {
    label: 'Provider count',
    key: 'provider-count',
  },
  {
    label: 'Providers',
    key: 'providers',
  },
  {
    label: 'Terraform version',
    key: 'terraform-version',
  },
  {
    label: 'State terraform version',
    key: 'state-terraform-version',
  },
  {
    label: 'Created',
    key: 'created',
  },
  {
    label: 'Updated',
    key: 'updated',
  },
];

const CUSTOM_FILTER = {
  type: 'generic',
  dismissTagText: 'equals example/a))!hzfpKcBl0',
  data: {
    value: 'example/a))!hzfpKcBl0',
  },
} as HdsFilterBarGenericFilter;

export interface CodeFragmentWithComplexTableSignature {
  Args: {
    isLiveFilter?: boolean;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithComplexTable extends Component<CodeFragmentWithComplexTableSignature> {
  @tracked filters: HdsFilterBarSignature['Args']['filters'] = {};

  onFilter = (filters: HdsFilterBarSignature['Args']['filters']) => {
    this.filters = filters;
  };

  get demoModelFilteredData() {
    const filterItem = (item: Record<string, unknown>): boolean => {
      if (Object.keys(this.filters).length === 0) return true;
      let match = true;
      Object.keys(this.filters).forEach((key) => {
        const filter = this.filters[key] as HdsFilterBarFilter;
        if (filter) {
          switch (filter.type) {
            case 'date':
            case 'datetime':
            case 'time':
              if (!this.isDateFilterMatch(item[key], filter)) {
                match = false;
              }
              break;
            case 'numerical':
              if (!this.isNumericalFilterMatch(item[key], filter)) {
                match = false;
              }
              break;
            case 'single-select':
              if (!this.isSingleSelectFilterMatch(item[key], filter)) {
                match = false;
              }
              break;
            case 'search':
              if (!this.isSearchFilterMatch(item, filter)) {
                match = false;
              }
              break;
            case 'generic':
              if (!this.isGenericFilterMatch(item[key], filter)) {
                match = false;
              }
              break;
            default:
              if (!this.isMultiSelectFilterMatch(item[key], filter)) {
                match = false;
              }
          }
        }
      });
      return match;
    };

    const filteredData = RUNS.slice(0, 5).filter(filterItem);
    return filteredData;
  }

  isNumericalFilterMatch(
    itemValue: unknown,
    filter: HdsFilterBarNumericalFilter,
  ): boolean {
    const filterData = filter.data;
    const selector = filterData.selector;
    const number = Number(itemValue);

    const value = filterData.value;
    const valueNumber = Number(value);

    if (isNaN(number)) {
      return false;
    } else if (!isNaN(valueNumber)) {
      switch (selector) {
        case 'less-than':
          return number < valueNumber;
        case 'less-than-or-equal-to':
          return number <= valueNumber;
        case 'equal-to':
          return number === valueNumber;
        case 'greater-than-or-equal-to':
          return number >= valueNumber;
        case 'greater-than':
          return number > valueNumber;
        default:
          return false;
      }
    } else if (selector === 'between' && typeof value === 'object') {
      if (!value.start || !value.end) {
        return false;
      }
      return number >= value.start && number <= value.end;
    }

    return false;
  }

  isDateFilterMatch(
    itemValue: unknown,
    filter: HdsFilterBarDateFilter,
  ): boolean {
    const filterData = filter.data;
    const selector = filterData.selector;
    const value = filterData.value;

    const date = this.dateFromFilter(String(itemValue), filter.type);

    if (selector === 'between' && typeof value === 'object') {
      if (!value.start || !value.end) {
        return false;
      }
      const startDate = this.dateFromFilter(value.start, filter.type);
      const endDate = this.dateFromFilter(value.end, filter.type);
      if (this.dateIsValid(startDate) && this.dateIsValid(endDate)) {
        return (
          date.getTime() >= startDate.getTime() &&
          date.getTime() <= endDate.getTime()
        );
      } else {
        return false;
      }
    } else if (typeof value === 'string') {
      const valueDate = this.dateFromFilter(value, filter.type);
      if (this.dateIsValid(valueDate)) {
        switch (selector) {
          case 'before':
            return date.getTime() < valueDate.getTime();
          case 'exactly':
            return date.getTime() === valueDate.getTime();
          case 'after':
            return date.getTime() > valueDate.getTime();
          default:
            return false;
        }
      }
    }

    return false;
  }

  isSingleSelectFilterMatch(
    itemValue: unknown,
    filter: HdsFilterBarSingleSelectFilter,
  ): boolean {
    return itemValue === filter.data.value;
  }

  isMultiSelectFilterMatch(
    itemValue: unknown,
    filter: HdsFilterBarMultiSelectFilter,
  ): boolean {
    const filterValues = filter.data.map((d) => d.value);
    return filterValues.includes(itemValue);
  }

  isSearchFilterMatch(
    item: Record<string, unknown>,
    filter: HdsFilterBarSearchFilter,
  ): boolean {
    let match = false;
    Object.keys(item).forEach((key) => {
      const itemValue = item[key];
      const filterValue = filter.data.value;
      if (
        typeof itemValue === 'string' &&
        typeof filterValue === 'string' &&
        itemValue.toLowerCase().includes(filterValue.toLowerCase())
      ) {
        match = true;
      }
    });
    return match;
  }

  isGenericFilterMatch(
    itemValue: unknown,
    filter: HdsFilterBarGenericFilter,
  ): boolean {
    if (Array.isArray(filter.data)) {
      const filterValues = filter.data.map((d) => d.value);
      return filterValues.includes(itemValue);
    } else {
      return itemValue === filter.data.value;
    }
  }

  dateFromFilter = (dateString: string, filterType: string): Date => {
    if (filterType === 'time') {
      return new Date(`1970-01-01T${dateString}`);
    }
    return new Date(dateString);
  };

  dateIsValid = (date?: Date | string): date is Date =>
    date instanceof Date && !isNaN(+date);

  <template>
    <HdsFilterBar @filters={{this.filters}} @isLiveFilter={{@isLiveFilter}} @hasSearch={{true}} @onFilter={{this.onFilter}} {{style marginBottom="24px"}} as |F|>
      <F.Dropdown as |D|>
        <D.FilterGroup
          @key="run-status"
          @text="Run status"
          @type="multi-select"
          as |F|
        >
          {{#each (get RUNS_VALUES "run-status") as |option|}}
            <F.Checkbox @value={{option.value}} @label={{option.label}} />
          {{/each}}
        </D.FilterGroup>
        <D.FilterGroup
          @key="terraform-version"
          @text="Terraform version"
          @type="single-select"
          as |F|
        >
          {{#each (get RUNS_VALUES "terraform-version") as |option|}}
            <F.Radio @value={{option.value}} @label={{option.label}} />
          {{/each}}
        </D.FilterGroup>
        <D.FilterGroup
          @key="current-run-applied"
          @text="Current run applied"
          @type="datetime"
        />
        <D.FilterGroup
          @key="creation-time"
          @text="Creation time"
          @type="time"
        />
        <D.FilterGroup
          @key="module-count"
          @text="Module count"
          @type="numerical"
        />
        <D.FilterGroup @key="created" @text="Created" @type="date" />
        <D.FilterGroup
          @key="vcs-repo"
          @text="VCS repo"
          @type="generic"
          as |F|
        >
          <F.Generic as |G|>
            <ShwPlaceholder @text="generic content" @height="100" />
            <HdsButton
              @text="Add custom filter"
              @color="secondary"
              @size="small"
              {{on "click" (fn G.updateFilter CUSTOM_FILTER)}}
            />
          </F.Generic>
        </D.FilterGroup>
      </F.Dropdown>
    </HdsFilterBar>
    <div class="shw-component-table-scrollable-wrapper">
      <HdsTable @model={{this.demoModelFilteredData}} @columns={{COLUMNS}}>
        <:body as |B|>
          <B.Tr>
            <B.Th>
              {{get B.data "name"}}
            </B.Th>
            <B.Td>
              {{get B.data "project-name"}}
            </B.Td>
            <B.Td>
              {{get B.data "current-run-id"}}
            </B.Td>
            <B.Td>
              <HdsBadge
                @type="outlined"
                {{! @glint-expect-error }}
                @text={{get B.data "run-status"}}
                {{! @glint-expect-error }}
                @color={{get B.data "run-status-color"}}
              />
            </B.Td>
            <B.Td>
              {{! @glint-expect-error }}
              {{get B.data "current-run-applied"}}
            </B.Td>
            <B.Td>
              {{! @glint-expect-error }}
              {{get B.data "creation-time"}}
            </B.Td>
            <B.Td>
              {{! @glint-expect-error }}
              {{get B.data "vcs-repo"}}
            </B.Td>
            <B.Td>
              {{! @glint-expect-error }}
              {{get B.data "module-count"}}
            </B.Td>
            <B.Td>
              {{! @glint-expect-error }}
              {{get B.data "modules"}}
            </B.Td>
            <B.Td>
              {{get B.data "provider-count"}}
            </B.Td>
            <B.Td>
              {{! @glint-expect-error }}
              {{get B.data "providers"}}
            </B.Td>
            <B.Td>
              {{! @glint-expect-error }}
              {{get B.data "terraform-version"}}
            </B.Td>
            <B.Td>
              {{get B.data "state-terraform-version"}}
            </B.Td>
            <B.Td>
              {{! @glint-expect-error }}
              {{get B.data "created"}}
            </B.Td>
            <B.Td>
              {{! @glint-expect-error }}
              {{get B.data "updated"}}
            </B.Td>
          </B.Tr>
        </:body>
      </HdsTable>
    </div>
  </template>
}
