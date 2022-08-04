import requireButtonText from './require-button-text.mjs';

export default {
  // Name of plugin
  name: 'custom-rules',

  // Define rules for this plugin. Each path should map to a plugin rule
  rules: {
    'require-button-text': requireButtonText,
  },
  ignore: ['../blueprints/**'],

  // Define configurations for this plugin that can be extended by the base configuration
  configurations: {
    recommended: {
      rules: {
        'require-button-text': true,
      },
    },
    ignore: ['./blueprints/**'],
  },
};
