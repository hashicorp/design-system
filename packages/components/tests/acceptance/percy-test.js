import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';

module('Acceptance | Percy test', function (hooks) {
  setupApplicationTest(hooks);

  test('Take percy snapshots', async function (assert) {
    await visit('/components/badge');
    await percySnapshot('Badge');

    await visit('/components/card');
    await percySnapshot('Card');

    await visit('/components/button');
    await percySnapshot('Buttom');

    assert.ok(true);
  });
});
