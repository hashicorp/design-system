import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'website/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Acceptance | components/copy/button', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /components/copy/button', async function (assert) {
    await visit('/components/copy/button');

    assert.strictEqual(currentURL(), '/components/copy/button');
  });
  test('Components/copy/button page passes a11y automated checks', async function (assert) {
    await visit('/components/copy/button');

    await a11yAudit();

    assert.ok(true, 'a11y automation audit passed');
  });
});
