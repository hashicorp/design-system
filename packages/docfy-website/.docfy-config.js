const path = require('path');

module.exports = {
  remarkPlugins: [[]],
  rehypePlugins: [[]],
  sources: [
    {
      root: path.resolve(__dirname, './docs'),
      pattern: '**/*.md',
      urlPrefix: '',
      // urlSchema: 'manual',
      urlSchema: 'auto',
    },
    // {
    //   root: path.resolve(__dirname, './app/components/hds'),
    //   pattern: '**/docs/**/*.md',
    //   urlPrefix: 'components-symlink',
    //   // urlSchema: 'manual',
    //   urlSchema: 'auto',
    // },
    // {
    //   root: path.resolve(__dirname, '../components/addon/components/hds'),
    //   pattern: '**/docs/**/*.md',
    //   urlPrefix: 'components',
    //   // urlSchema: 'manual',
    //   urlSchema: 'auto',
    // },
  ],
  labels: {
    docs: 'Documentation',
    components: 'Components',
  },
};
