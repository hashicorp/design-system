/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { get } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import MUSIC from 'showcase/mocks/folk-music-data';
import type { FolkMusic } from 'showcase/mocks/folk-music-data';

import {
  HdsAdvancedTable,
  HdsBadge,
  HdsIcon,
  HdsLinkInline,
  type HdsFilterBarSingleSelectFilter,
  type HdsFilterBarMultiSelectFilter,
  type HdsFilterBarSearchFilter,
  type HdsFilterBarFilter,
} from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

const MUSIC_VALUES = {
  artist: Array.from(new Set(MUSIC.map((item) => item['artist']))).map(
    (value) => ({ value, label: value }),
  ),
  album: Array.from(new Set(MUSIC.map((item) => item['album']))).map(
    (value) => ({ value, label: value }),
  ),
};

export interface CodeFragmentWithFilteringSignature {
  Args: {
    isLiveFilter?: boolean;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithFiltering extends Component<CodeFragmentWithFilteringSignature> {
  @tracked filters: HdsFilterBarSignature['Args']['filters'] = {};

  onFilter = (filters: HdsFilterBarSignature['Args']['filters']) => {
    this.filters = filters;
  };

  get filteredData() {
    const filterItem = (item: FolkMusic): boolean => {
      if (Object.keys(this.filters).length === 0) return true;
      let match = true;
      Object.keys(this.filters).forEach((key) => {
        const filter = this.filters[key] as HdsFilterBarFilter;
        if (filter) {
          switch (filter.type) {
            case 'single-select':
              if (
                !this.isSingleSelectFilterMatch(
                  item[key as keyof FolkMusic],
                  filter,
                )
              ) {
                match = false;
              }
              break;
            case 'search':
              if (!this.isSearchFilterMatch(item, filter)) {
                match = false;
              }
              break;
            case 'multi-select':
              if (
                !this.isMultiSelectFilterMatch(
                  item[key as keyof FolkMusic],
                  filter,
                )
              ) {
                match = false;
              }
          }
        }
      });
      return match;
    };

    const filteredData = MUSIC.filter(filterItem);
    return filteredData as unknown as Record<string, unknown>[];
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
    item: FolkMusic,
    filter: HdsFilterBarSearchFilter,
  ): boolean {
    let match = false;
    Object.keys(item).forEach((key) => {
      const itemValue = item[key as keyof FolkMusic];
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

  <template>
    <HdsAdvancedTable
      @model={{this.filteredData}}
      @columns={{array
        (hash key="artist" label="Artist")
        (hash key="album" label="Album")
        (hash key="year" label="Release Year")
      }}
    >
      <:actions as |A|>
        <A.FilterBar
          @filters={{this.filters}}
          @isLiveFilter={{@isLiveFilter}}
          @hasSearch={{true}}
          @onFilter={{this.onFilter}}
          as |F|
        >
          <F.Dropdown as |D|>
            <D.FilterGroup
              @key="artist"
              @text="Artist"
              @type="multi-select"
              @searchEnabled={{true}}
              as |F|
            >
              {{#each (get MUSIC_VALUES "artist") as |option|}}
                <F.Checkbox @value={{option.value}} @label={{option.label}} />
              {{/each}}
            </D.FilterGroup>
            <D.FilterGroup
              @key="album"
              @text="Album"
              @type="single-select"
              @searchEnabled={{true}}
              as |F|
            >
              {{#each (get MUSIC_VALUES "album") as |option|}}
                <F.Radio @value={{option.value}} @label={{option.label}} />
              {{/each}}
            </D.FilterGroup>
          </F.Dropdown>
        </A.FilterBar>
      </:actions>
      <:body as |B|>
        <B.Tr>
          <B.Th @scope="row"><HdsLinkInline @href="#showcase">
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.artist}}
            </HdsLinkInline></B.Th>
          <B.Td>
            <div class="shw-component-advanced-table-cell-content-div">
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              <HdsIcon @name={{B.data.icon}} @isInline={{true}} />
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              {{B.data.album}}
            </div>
          </B.Td>
          <B.Td>
            <HdsBadge
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @text={{B.data.year}}
              @type="outlined"
              {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              @color={{B.data.badge-color}}
            />
          </B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
