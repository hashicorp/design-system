import NoBareStringsInAttributes from './rules/no-bare-strings-in-attributes.mjs';

export default {
  name: 'ember-template-lint-plugin-local',
  rules: {
    'no-bare-strings-in-attributes': NoBareStringsInAttributes,
  },
};
