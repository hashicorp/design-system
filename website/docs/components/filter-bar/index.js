/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const CUSTOM_FILTER = {
  type: 'generic',
  dismissTagText: 'equals lorem ipsum',
  data: {
    value: 'lorem ipsum',
  },
}

export default class Index extends Component {
  @tracked demoFilters = {
    project: {
      type: 'multi-select',
      text: 'Project',
      data: [
        { value: 'project-1', label: 'Project 1' },
        { value: 'project-2', label: 'Project 2' },
      ],
    },
    version: {
      type: 'single-select',
      text: 'Version',
      data: {
        value: '1.0',
        label: '1.0',
      },
    }
  };

  @tracked demoSelectionFilters = {
    'demo-single-select': {
      type: 'single-select',
      text: 'Single-select',
      data: {
        value: 'option-1',
        label: 'Option 1',
      },
    },
    'demo-multi-select': {
      type: 'multi-select',
      text: 'Multi-select',
      data: [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
      ],
    }
  };

  @tracked demoNumericalFilters = {
    'demo-numerical-a': {
      type: 'numerical',
      text: 'Numerical A',
      data: {
        selector: 'less-than',
        value: 10,
      },
    },
    'demo-numerical-b': {
      type: 'numerical',
      text: 'Numerical B',
      data: {
        selector: 'between',
        value: {
          start: 10,
          end: 20,
        }
      },
    }
  }

  @tracked demoDateTimeFilters = {
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
        }
      },
    }
  };

  @tracked demoGenericFilters = {
    'demo-generic': {
      type: 'generic',
      text: 'Generic',
      dismissTagText: 'equals lorem ipsum',
      data: {
        value: 'lorem ipsum',
      },
    }
  }

  @tracked demoSearchFilters = {
    'search': {
      type: 'search',
      text: 'Search',
      data: {
        value: 'Lorem ipsum',
      },
    }
  };

  @tracked demoLiveFilters = {};

  demoEmptyFilters = {};

  customFilter = CUSTOM_FILTER;

  @action demoNOOP() {
    // NOOP
  }

  @action demoUpdateFilters(newFilters) {
    this.demoFilters = newFilters;
  }

  @action demoUpdateLiveFilters(newFilters) {
    this.demoLiveFilters = newFilters;
  }

  @action demoUpdateSelectionFilters(newFilters) {
    this.demoSelectionFilters = newFilters;
  }

  @action demoUpdateNumericalFilters(newFilters) {
    this.demoNumericalFilters = newFilters;
  }

  @action demoUpdateDateTimeFilters(newFilters) {
    this.demoDateTimeFilters = newFilters;
  }

  @action demoUpdateGenericFilters(newFilters) {
    this.demoGenericFilters = newFilters;
  }

  @action onGenericFilterUpdate(updateFilter) {
    updateFilter(CUSTOM_FILTER);
  }

  @action demoUpdateSearchFilters(newFilters) {
    this.demoSearchFilters = newFilters;
  }
}
