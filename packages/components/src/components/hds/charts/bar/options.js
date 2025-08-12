import { ScaleTypes } from '@carbon/charts';

export default {
  title: '',
  toolbar: {
    enabled: false, // hide toolbar
  },
  axes: {
    left: {
      mapsTo: 'value',
    },
    bottom: {
      mapsTo: 'date',
      scaleType: ScaleTypes.LABELS,
    },
  },
  grid: {
    x: {
      numberOfTicks: 0,
    },
  },
  height: '400px',
  legend: {
    enabled: false, // hide legend (for single color bar chart)
  },
};
