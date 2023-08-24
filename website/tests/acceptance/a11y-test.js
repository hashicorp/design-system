/* eslint-disable qunit/no-only */
/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  visit,
  setupContext,
  setupApplicationContext,
  teardownContext,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { getOwner } from '@ember/application';

module.only('Acceptance | a11y tests', function (hooks) {
  setupApplicationTest(hooks);

  let list = [];

  // the idea here is to boot the app and pull out the list of routes to visit
  // this does work, however the .forEach() runs first so this doesn't actually work work
  hooks.before(async function () {
    await setupContext(this);
    await setupApplicationContext(this);
    await visit('/');
    // debugger;
    const owner = getOwner(this);
    const app = owner.lookup('controller:application');
    list = app.get('model.toc.flat').map((page) => page.pageURL);
    await teardownContext(this);
  });

  // a hard coded list does work...
  list = ['components/badge', 'components/button'];
  list.forEach(async function (f) {
    // debugger;
    test.only(`${f} page passes a11y automated checks`, async function (assert) {
      // debugger;
      await visit(f);
      await a11yAudit();

      assert.ok(true, `a11y automation for ${f} audit passed`);
    });
  });
});
