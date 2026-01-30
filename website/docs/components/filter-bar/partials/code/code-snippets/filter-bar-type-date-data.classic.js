/* eslint-disable no-unused-vars */
// example of filter data
const demoDateTimeFilters = {
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