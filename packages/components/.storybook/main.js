let flightSprite = require('@hashicorp/flight-icons/svg-sprite/svg-sprite-module');

module.exports = {
  staticDirs: ['../dist'],
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../addon/components/hds/**/*.stories.mdx',
    '../addon/components/hds/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  features: {
    postcss: false,
  },
  framework: '@storybook/ember',
  core: {
    builder: '@storybook/builder-webpack4',
  },
  previewHead: (head) => `
    ${head}
    ${flightSprite}
  `,
};
