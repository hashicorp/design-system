import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';

module('Acceptance | Percy test', function (hooks) {
  setupApplicationTest(hooks);

  test('Take percy snapshots', async function (assert) {
    await visit('/components/badge');
    await percySnapshot('Badge - Showcase', '[data-test-vrt="badge-showcase"]');
    await percySnapshot(
      'BadgeCount - Showcase',
      '[data-test-vrt="badge-count-showcase"]'
    );

    await visit('/components/card');
    await percySnapshot(
      'Card Container - Showcase',
      '[data-test-vrt="card-container-showcase"]'
    );

    assert.ok(true);
  });
});
