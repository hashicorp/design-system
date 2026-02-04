/* eslint-disable no-unused-vars */
// example of filter data
const demoNumericalFilters = {
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
};