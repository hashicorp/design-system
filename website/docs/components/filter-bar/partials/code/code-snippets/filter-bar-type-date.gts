import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { HdsFilterBar } from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

export default class LocalComponent extends Component {
  @tracked demoDateTimeFilters: HdsFilterBarSignature['Args']['filters'] = {
    'demo-date': {
      type: 'date',
      text: 'Date',
      data: {
        selector: 'before',
        value: '2025-01-01',
      },
    },
    'demo-time': {
      type: 'time',
      text: 'Time',
      data: {
        selector: 'before',
        value: '20:00',
      },
    },
    'demo-datetime': {
      type: 'datetime',
      text: 'Datetime',
      data: {
        selector: 'before',
        value: '2025-01-01T12:00',
      },
    },
    'demo-date-range': {
      type: 'date',
      text: 'Date range',
      data: {
        selector: 'between',
        value: {
          start: '2024-01-01',
          end: '2025-01-01',
        },
      },
    },
  };

  demoUpdateDateTimeFilters = (
    newFilters: HdsFilterBarSignature['Args']['filters'],
  ) => {
    this.demoDateTimeFilters = newFilters;
  };

  <template>
    <HdsFilterBar
      @filters={{this.demoDateTimeFilters}}
      @onFilter={{this.demoUpdateDateTimeFilters}}
      as |F|
    >
      <F.FiltersDropdown as |D|>
        <D.FilterGroup @key="demo-date" @text="Date" @type="date" />
        <D.FilterGroup @key="demo-time" @text="Time" @type="time" />
        <D.FilterGroup @key="demo-datetime" @text="Datetime" @type="datetime" />
        <D.FilterGroup @key="demo-date-range" @text="Date range" @type="date" />
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
