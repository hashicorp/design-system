import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';

module('Acceptance | Percy test', function (hooks) {
  setupApplicationTest(hooks);

  // Percy (percySnapshot) doesn't allow to target specific DOM elements, so we have to "blacklist" the elements
  // that we want to exclude from the snapshots using their own "Percy-specific CSS".
  // see: https://docs.percy.io/docs/percy-specific-css#section-hiding-regions-with-percy-specific-css
  const percyCSSExclude = `header, footer, main section:not([data-test-percy]) { display: none; }`;

  test('Take percy snapshots', async function (assert) {
    await visit('/components/badge');
    await percySnapshot('Badge', { percyCSSExclude });

    await visit('/components/card');
    await percySnapshot('Card', { percyCSSExclude });

    assert.ok(true);
  });
});
