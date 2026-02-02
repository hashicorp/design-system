/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { get } from '@ember/object';

import {
  HdsFilterBarAppliedFilters,
  type HdsFilterBarFilters,
} from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

const FILTERS = {
  'single-select': {
    'single-select-1': {
      type: 'single-select',
      text: 'Single-select',
      data: {
        value: '1',
        label: 'Option 1',
      },
    },
    'single-select-2': {
      type: 'single-select',
      text: 'Single-select',
      data: {
        value: 'value-without-label',
      },
    },
  },
  'multi-select': {
    'multi-select-1': {
      type: 'multi-select',
      text: 'Multi-select',
      data: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ],
    },
    'multi-select-2': {
      type: 'multi-select',
      text: 'Multi-select',
      data: [
        { value: 'value-without-label-1' },
        { value: 'value-without-label-2' },
      ],
    },
  },
  numerical: {
    numerical: {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'less-than',
        value: 10,
      },
    },
    'numerical-2': {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'less-than-or-equal-to',
        value: 10,
      },
    },
    'numerical-3': {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'equal-to',
        value: 10,
      },
    },
    'numerical-4': {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'greater-than',
        value: 10,
      },
    },
    'numerical-5': {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'greater-than-or-equal-to',
        value: 10,
      },
    },
    'numerical-6': {
      type: 'numerical',
      text: 'Numerical',
      data: {
        selector: 'between',
        value: {
          start: 10,
          end: 20,
        },
      },
    },
  },
  date: {
    date: {
      type: 'date',
      text: 'Date',
      data: {
        selector: 'before',
        value: '2025-01-01',
      },
    },
    'date-2': {
      type: 'date',
      text: 'Date',
      data: {
        selector: 'exactly',
        value: '2025-01-01',
      },
    },
    'date-3': {
      type: 'date',
      text: 'Date',
      data: {
        selector: 'after',
        value: '2025-01-01',
      },
    },
    'date-4': {
      type: 'date',
      text: 'Date',
      data: {
        selector: 'between',
        value: {
          start: '2024-01-01',
          end: '2025-01-01',
        },
      },
    },
  },
  time: {
    time: {
      type: 'time',
      text: 'Time',
      data: {
        selector: 'before',
        value: '12:00',
      },
    },
    'time-2': {
      type: 'time',
      text: 'Time',
      data: {
        selector: 'exactly',
        value: '12:00',
      },
    },
    'time-3': {
      type: 'time',
      text: 'Time',
      data: {
        selector: 'after',
        value: '12:00',
      },
    },
    'time-4': {
      type: 'time',
      text: 'Time',
      data: {
        selector: 'between',
        value: {
          start: '10:00',
          end: '12:00',
        },
      },
    },
  },
  datetime: {
    datetime: {
      type: 'datetime',
      text: 'Datetime',
      data: {
        selector: 'before',
        value: '2025-01-01T12:00',
      },
    },
    'datetime-2': {
      type: 'datetime',
      text: 'Datetime',
      data: {
        selector: 'exactly',
        value: '2025-01-01T12:00',
      },
    },
    'datetime-3': {
      type: 'datetime',
      text: 'Datetime',
      data: {
        selector: 'after',
        value: '2025-01-01T12:00',
      },
    },
    'datetime-4': {
      type: 'datetime',
      text: 'Datetime',
      data: {
        selector: 'between',
        value: {
          start: '2024-01-01T10:00',
          end: '2025-01-01T12:00',
        },
      },
    },
  },
  generic: {
    'generic-1': {
      type: 'generic',
      text: 'Generic',
      dismissTagText: 'lorem ipsum',
      data: {
        value: 'with dismissTagText',
      },
    },
    'generic-2': {
      type: 'generic',
      text: 'Generic',
      data: {
        value: 'value-without-dismissTagText',
        label: 'no dismissTagText',
      },
    },
    'generic-3': {
      type: 'generic',
      text: 'Generic',
      data: {
        value: 'value-without-dismissTagText-and-label',
      },
    },
  },
  search: {
    search: {
      type: 'search',
      text: 'Search',
      data: {
        value: 'lorem ipsum',
      },
    },
  },
} as Record<string, HdsFilterBarFilters>;

export interface CodeFragmentWithAppliedFiltersSignature {
  Args: {
    appliedFiltersType?: string;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithAppliedFilters extends Component<CodeFragmentWithAppliedFiltersSignature> {
  get filters(): HdsFilterBarSignature['Args']['filters'] {
    let filters = {};
    if (this.args.appliedFiltersType) {
      filters = get(FILTERS, this.args.appliedFiltersType) ?? {};
    }
    return filters as HdsFilterBarSignature['Args']['filters'];
  }

  <template><HdsFilterBarAppliedFilters @filters={{this.filters}} /></template>
}
