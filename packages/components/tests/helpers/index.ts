/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
  type SetupTestOptions,
} from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

function setupApplicationTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupApplicationTest(hooks, options);

  setupIntl(hooks, 'en-us', translationsForEnUs);
}

function setupRenderingTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupRenderingTest(hooks, options);

  setupIntl(hooks, 'en-us', translationsForEnUs);
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupTest(hooks, options);

  setupIntl(hooks, 'en-us', translationsForEnUs);
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
