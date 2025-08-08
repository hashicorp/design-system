export default {
  title: ' ', // Set title using @title on the component
  resizable: true,
  legend: {
    // alignment: 'left', // = alignment w/i container, options: 'left', 'right', 'center'
    position: 'left', // = position relative to chart, options: 'top', 'bottom', 'left', 'right'
    truncation: {
      type: 'none',
    },
  },
  toolbar: {
    enabled: false, // hide toolbar
  },
  donut: {
    alignment: 'center', // = alignment w/i container, options: 'center', 'left', 'right'
  },
  pie: {
    labels: {
      enabled: true,
      formatter: (data) => data.value,
    },
  },
  height: '175px',
};

/*
export default {
  title: 'Donut (centered)',
  resizable: true,
  legend: {
    position: 'right',
    truncation: {
      type: 'none',
    },
  },
  donut: {
    center: {
      label: 'Browsers',
    },
    alignment: 'center',
  },
  height: '400px',
};
*/
