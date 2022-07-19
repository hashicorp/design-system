const path = require('path');

module.exports = {
  remarkPlugins: [[]],
  sources: [
    {
      root: path.resolve(__dirname, './docs'),
      pattern: '**/*.md',
      urlPrefix: 'docs',
      // urlSchema: 'manual',
      urlSchema: 'auto',
    },
    {
      root: path.resolve(__dirname, '../components/addon/components/hds'),
      pattern: '**/docs/**/*.md',
      urlPrefix: 'components',
      // urlSchema: 'manual',
      urlSchema: 'auto',
    },
  ],
  labels: {
    docs: 'Documentation',
    components: 'Components',
  },
};
