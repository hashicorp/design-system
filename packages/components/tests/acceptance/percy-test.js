import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';

module('Acceptance | Percy test', function (hooks) {
  setupApplicationTest(hooks);

  test('Take percy snapshots', async function (assert) {
    await visit('/foundations/elevation');
    await percySnapshot('Elevation');

    await visit('/foundations/colors');
    await percySnapshot('Colors');

    await visit('/foundations/typography');
    await percySnapshot('Typography');

    await visit('/foundations/focus-ring');
    await percySnapshot('FocusRing');

    await visit('/components/badge');
    await percySnapshot('Badge');

    await visit('/components/button');
    await percySnapshot('Button');

    await visit('/components/breadcrumb');
    await percySnapshot('Breadcrumb');

    await visit('/components/card');
    await percySnapshot('Card');

    // await visit('/components/cta');
    // await percySnapshot('CTA');

    await visit('/components/icon-tile');
    await percySnapshot('IconTile');

    await visit('/components/link');
    await percySnapshot('Link Standalone');

    await visit('/components/link-to');
    await percySnapshot('LinkTo Standalone');

    assert.ok(true);
  });
});
