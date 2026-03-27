import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';
import type {
  HdsFilterBarSingleSelectFilter,
  HdsFilterBarMultiSelectFilter,
  HdsFilterBarSearchFilter,
} from '@hashicorp/design-system-components/components/hds/filter-bar/types';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';
import type { FolkMusic } from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  @tracked demoFilters: HdsFilterBarSignature['Args']['filters'] = {
    artist: {
      type: 'multi-select',
      text: 'Artist',
      data: [
        { value: 'Nick Drake', label: 'Nick Drake' },
        { value: 'The Beatles', label: 'The Beatles' },
      ],
    },
  };

  get demoFilteredData() {
    const filterItem = (item: FolkMusic) => {
      if (Object.keys(this.demoFilters).length === 0) return true;
      let match = true;
      Object.keys(this.demoFilters).forEach((key) => {
        const filter = this.demoFilters[key];
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

    const filteredData = FOLK_MUSIC_DATA.filter(filterItem);
    return filteredData;
  }

  isSingleSelectFilterMatch = (
    itemValue: unknown,
    filter: HdsFilterBarSingleSelectFilter,
  ) => {
    return `${itemValue as number}` === filter.data.value;
  };

  isMultiSelectFilterMatch = (
    itemValue: unknown,
    filter: HdsFilterBarMultiSelectFilter,
  ) => {
    const filterValues = filter.data.map((d) => d.value);
    return filterValues.includes(itemValue);
  };

  isSearchFilterMatch = (item: FolkMusic, filter: HdsFilterBarSearchFilter) => {
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
  };

  demoUpdateFilters = (
    newFilters: HdsFilterBarSignature['Args']['filters'],
  ) => {
    this.demoFilters = newFilters;
  };

  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.demoFilteredData}}
      @columns={{array
        (hash key="artist" label="Artist")
        (hash key="album" label="Album")
        (hash key="year" label="Release Year")
      }}
    >
      <:actions as |A|>
        <A.FilterBar
          @filters={{this.demoFilters}}
          @hasSearch={{true}}
          @onFilter={{this.demoUpdateFilters}}
          as |F|
        >
          <F.FiltersDropdown as |D|>
            <D.FilterGroup
              @key="artist"
              @text="Artist"
              @type="multi-select"
              as |F|
            >
              <F.Checkbox @value="Nick Drake" @label="Nick Drake" />
              <F.Checkbox @value="The Beatles" @label="The Beatles" />
              <F.Checkbox @value="Melanie" @label="Melanie" />
              <F.Checkbox @value="Bob Dylan" @label="Bob Dylan" />
              <F.Checkbox @value="James Taylor" @label="James Taylor" />
              <F.Checkbox
                @value="Simon and Garfunkel"
                @label="Simon and Garfunkel"
              />
            </D.FilterGroup>
            <D.FilterGroup
              @key="year"
              @text="Release year"
              @type="single-select"
              as |F|
            >
              <F.Radio @value="1965" @label="1965" />
              <F.Radio @value="1969" @label="1969" />
              <F.Radio @value="1970" @label="1970" />
              <F.Radio @value="1971" @label="1971" />
              <F.Radio @value="1972" @label="1972" />
            </D.FilterGroup>
          </F.FiltersDropdown>
        </A.FilterBar>
      </:actions>
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.artist}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.album}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.year}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
