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
  shouldForceAudit,
  setEnableA11yAudit,
  useMiddlewareReporter,
  setupMiddlewareReporter,
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
  include: [['#ember-testing-container']],
  exclude: [['.flight-sprite-container'], ['.shw-page-main']],
});

// This will be used by developers to run the tests locally
// Either with the `enableA11yAudit` as a query param in the URL
// or `yarn test:a11y` in the CLI
// Note: if you want to filter what test is run from the start, use the --filter flag: `yarn test:a11y --filter="alert"`
// Docs: https://guides.emberjs.com/release/testing/#toc_how-to-filter-tests
if (shouldForceAudit()) {
  setEnableA11yAudit(true);
}
// Note, as a convenience, useMiddlewareReporter automatically forces audits, thus explicitly specifying the enableA11yAudit query param or the ENABLE_A11Y_AUDIT environment variable is unnecessary.
if (useMiddlewareReporter()) {
  // Only runs if `enableA11yMiddlewareReporter` is set in URL
  setupMiddlewareReporter();
}

setup(QUnit.assert);

start();
