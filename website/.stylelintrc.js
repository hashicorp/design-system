'use strict';

module.exports = {
  extends: ['../packages/components/.stylelintrc'],
  rules: {
    'selector-class-pattern': [
      // found this pattern here: https://github.com/humanmade/coding-standards/pull/199
      // '^(?<block>(?:[a-z][a-z0-9]*)(?:-[a-z0-9]+)*)(?<element>(?:__[a-z][a-z0-9]*(?:-[a-z0-9]+)*))?(?<modifier>(?:--[a-z][a-z0-9]*)(?:-[a-z0-9]+)*)?$',
      '^(hds|doc)-(?<block>(?:[a-z][a-z0-9]*)(?:-[a-z0-9]+)*)(?<element>(?:__[a-z][a-z0-9]*(?:-[a-z0-9]+)*))?(?<modifier>(?:--[a-z][a-z0-9]*)(?:-[a-z0-9]+)*)?$|^mock-(?:[a-z][a-z0-9]*)$||^doc-(?:[a-z][a-z0-9]*)$',
      { resolveNestedSelectors: true },
    ],
  },
};
