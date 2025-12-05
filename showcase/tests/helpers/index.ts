/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
  type SetupTestOptions,
} from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';

// This file exists to provide wrappers around ember-qunit's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

function setupApplicationTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupApplicationTest(hooks, options);

  // Additional setup for application tests can be done here.
  //
  // For example, if you need an authenticated session for each
  // application test, you could do:
  //
  // hooks.beforeEach(async function () {
  //   await authenticateSession(); // ember-simple-auth
  // });
  //
  // This is also a good place to call test setup functions coming
  // from other addons:
  //
  setupIntl(hooks, 'en-us'); // ember-intl
  // setupMirage(hooks); // ember-cli-mirage
}

function setupRenderingTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupRenderingTest(hooks, options);

  setupIntl(hooks, 'en-us');

  // Additional setup for rendering tests can be done here.
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupTest(hooks, options);

  setupIntl(hooks, 'en-us');
  // Additional setup for unit tests can be done here.
}

// Helper to delay execution
function wait(timeout = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

// Helper to clean up body overflow style to prevent test interference
function cleanupBodyOverflow() {
  document.body?.style.removeProperty('overflow');
  if (document.body?.getAttribute('style') === '') {
    document.body.removeAttribute('style');
  }
}

export {
  setupApplicationTest,
  setupRenderingTest,
  setupTest,
  wait,
  cleanupBodyOverflow,
};
