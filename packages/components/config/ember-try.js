/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    command: 'ember test --filter="integration" --reporter xunit',
    useYarn: true,
    // override this to avoid ember-try trying to use `--no-lockfile` which
    // doesn't exist in yarn3
    // see https://github.com/ember-cli/ember-try/issues/741
    buildManagerOptions() {
      return [''];
    },
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            '@ember/test-helpers': '^2.0.0',
            'ember-a11y-testing': '^5.2.1',
            'ember-cli': '~3.28.0',
            'ember-qunit': '^6.0.0',
            'ember-resolver': '^8.1.0',
            'ember-source': '~3.28.11',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.3',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false,
          }),
        },
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
          },
          ember: {
            edition: 'classic',
          },
        },
      },
      embroiderSafe({ allowedToFail: true }),
      embroiderOptimized({ allowedToFail: true }),
    ],
  };
};
