/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import {
  DEFAULT_A11Y_TEST_HELPER_NAMES,
  setRunOptions,
  setupGlobalA11yHooks,
} from 'ember-a11y-testing/test-support';

setApplication(Application.create(config.APP));

setupGlobalA11yHooks(() => true, {
  helpers: [
    ...DEFAULT_A11Y_TEST_HELPER_NAMES,
    'render',
    'tab',
    'focus',
    'select',
  ],
});

setRunOptions({
  runOnly: {
    type: 'tag',
    values: [
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'wcag22aa',
      'best-practice',
    ],
  },
  rules: {
    'duplicate-id': { enabled: false },
  },
  include: [['#ember-testing-container']],
  exclude: [['.flight-sprite-container']],
});

setup(QUnit.assert);

start();
