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
  include: ['#ember-testing-container'],
  exclude: ['.flight-sprite-container', '.shw-page-main'],
});

// This might not be needed since using the ENABLE_A11Y_AUDIT environment variable is used in the script that runs the audit 🤔
// Also if `enableA11yAudit` is specified in the query param it will also force the audit already
// So, think about whether or not there are valid use cases for this conditional.
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
