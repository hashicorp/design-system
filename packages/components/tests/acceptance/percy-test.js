import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';

module('Acceptance | Percy test', function (hooks) {
  setupApplicationTest(hooks);

  test('Take percy snapshots', async function (assert) {
    await visit('/foundations/elevation');
    await percySnapshot('Elevation');

    await visit('/foundations/typography');
    await percySnapshot('Typography');

    await visit('/components/badge');
    await percySnapshot('Badge');

    await visit('/components/button');
    await percySnapshot('Button');

    await visit('/components/card');
    await percySnapshot('Card');

    await visit('/components/icon-tile');
    await percySnapshot('IconTile');

    assert.ok(true);
  });
});
