import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  @tracked demoFilters = {
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
    const filterItem = (item) => {
      if (Object.keys(this.demoFilters).length === 0) return true;
      let match = true;
      Object.keys(this.demoFilters).forEach((key) => {
        const filter = this.demoFilters[key];
        if (filter) {
          switch (filter.type) {
            case 'single-select':
              if (
                !this.isSingleSelectFilterMatch(
                  item[key],
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
                  item[key],
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

  isSingleSelectFilterMatch(
    itemValue,
    filter,
  ) {
    return `${itemValue}` === `${filter.data.value}`;
  }

  isMultiSelectFilterMatch(
    itemValue,
    filter,
  ) {
    const filterValues = filter.data.map((d) => d.value);
    return filterValues.includes(itemValue);
  }

  isSearchFilterMatch(
    item,
    filter,
  ) {
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

  @action demoUpdateFilters(newFilters) {
    this.demoFilters = newFilters;
  }
}
